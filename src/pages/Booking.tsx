
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServicesData } from '@/hooks/useServicesData';
import { useTherapistsData } from '@/hooks/useTherapistsData';
import { Service, Therapist, Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { createBooking } from '@/api/api-client';

const BookingPage = () => {
  const navigate = useNavigate();
  const { data: services, isLoading: isServicesLoading } = useServicesData();
  const { data: therapists, isLoading: isTherapistsLoading } = useTherapistsData();
  
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };
  
  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setStep(3);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };
  
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleSubmitBooking = async () => {
    if (!selectedService || !selectedTherapist || !selectedDate || !selectedTimeSlot) {
      toast.error('Please complete all booking details');
      return;
    }
    
    try {
      // Format appointment date and time
      const appointmentDateTime = `${format(selectedDate, 'yyyy-MM-dd')}T${selectedTimeSlot}:00`;
      
      // Create booking object
      const bookingData = {
        customerId: 1, // This would normally come from auth context
        serviceId: selectedService.id,
        therapistId: selectedTherapist.id,
        appointmentTime: appointmentDateTime,
        duration: selectedService.duration || 60, // Use service duration or default to 60
        status: "BOOKED" as const,
        amount: selectedService.price,
        isPaid: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Call API to create booking
      const response = await createBooking(bookingData);
      
      if (response.data) {
        toast.success('Booking confirmed! Thank you for choosing us.');
        navigate('/dashboard/bookings');
      } else {
        toast.error(response.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred while booking');
    }
  };
  
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  const renderServiceSelection = () => {
    if (isServicesLoading) return <div className="text-center py-10">Loading services...</div>;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <Card key={service.id} className="card-hover">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{service.description}</p>
              <div className="flex justify-between text-sm">
                <span>{service.duration || 60} minutes</span>
                <span className="font-medium">${service.price}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleServiceSelect(service)}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderTherapistSelection = () => {
    if (isTherapistsLoading) return <div className="text-center py-10">Loading specialists...</div>;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists?.map((therapist) => (
          <Card key={therapist.id} className="card-hover">
            <CardHeader>
              <CardTitle>{therapist.firstName} {therapist.lastName}</CardTitle>
              <CardDescription>{therapist.specialization}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm">{therapist.bio.substring(0, 100)}...</p>
              <div className="flex items-center mt-4">
                <span className="text-sm">Experience: {therapist.experience} years</span>
                <span className="ml-auto text-yellow-500">★ {therapist.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleTherapistSelect(therapist)}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderDateTimeSelection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => {
                // Disable dates in the past
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Time</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTimeSlot === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSlotSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Please select a date first</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderBookingSummary = () => {
    if (!selectedService || !selectedTherapist || !selectedDate || !selectedTimeSlot) {
      return null;
    }
    
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Service:</span>
            <span>{selectedService.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Specialist:</span>
            <span>{selectedTherapist.firstName} {selectedTherapist.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Time:</span>
            <span>{selectedTimeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration:</span>
            <span>{selectedService.duration || 60} minutes</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>${selectedService.price}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmitBooking}
          >
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center 
            ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`h-1 w-10 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`rounded-full h-10 w-10 flex items-center justify-center 
            ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`h-1 w-10 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`rounded-full h-10 w-10 flex items-center justify-center 
            ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>
    );
  };
  
  // Navigation buttons
  const renderNavButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <div></div> {/* Spacer */}
        {step === 3 && selectedDate && selectedTimeSlot && (
          <Button onClick={handleSubmitBooking}>
            Confirm Booking
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="container-custom section-padding">
      <h1 className="text-4xl text-center mb-2">Book Your Appointment</h1>
      <p className="text-center text-muted-foreground mb-8">
        Select from our range of services and specialists to book your perfect treatment
      </p>
      
      {renderStepIndicator()}
      
      <div className="my-8">
        {step === 1 && (
          <>
            <h2 className="text-2xl mb-6">Select a Service</h2>
            {renderServiceSelection()}
          </>
        )}
        
        {step === 2 && (
          <>
            <h2 className="text-2xl mb-6">Choose Your Specialist</h2>
            {renderTherapistSelection()}
          </>
        )}
        
        {step === 3 && (
          <>
            <h2 className="text-2xl mb-6">Choose Date & Time</h2>
            {renderDateTimeSelection()}
            {renderBookingSummary()}
          </>
        )}
      </div>
      
      {renderNavButtons()}
    </div>
  );
};

export default BookingPage;
