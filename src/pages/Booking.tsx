
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useServicesData } from "@/hooks/useServicesData";
import { useTherapistsData } from "@/hooks/useTherapistsData";
import { useCreateBooking } from "@/hooks/useBooking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Booking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedServiceId = searchParams.get("serviceId");
  const preselectedTherapistId = searchParams.get("therapistId");

  const [bookingData, setBookingData] = useState({
    customerId: 1, // This would normally come from the authenticated user
    serviceId: preselectedServiceId ? Number(preselectedServiceId) : 0,
    therapistId: preselectedTherapistId ? Number(preselectedTherapistId) : undefined,
    appointmentDate: new Date(),
    appointmentTime: "10:00",
    notes: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  const { data: services, isLoading: servicesLoading } = useServicesData();
  const { data: therapists, isLoading: therapistsLoading } = useTherapistsData();
  const createBooking = useCreateBooking();

  const [filteredTherapists, setFilteredTherapists] = useState(therapists || []);

  // Filter therapists based on selected service
  useEffect(() => {
    if (therapists && bookingData.serviceId) {
      const filtered = therapists.filter(therapist => 
        therapist.serviceIds.includes(bookingData.serviceId)
      );
      setFilteredTherapists(filtered);
    } else {
      setFilteredTherapists(therapists || []);
    }
  }, [therapists, bookingData.serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBookingData(prev => ({ ...prev, appointmentDate: date }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    try {
      // Format the datetime for the API
      const appointmentTime = new Date(bookingData.appointmentDate);
      const [hours, minutes] = bookingData.appointmentTime.split(':').map(Number);
      appointmentTime.setHours(hours, minutes);

      const submissionData = {
        customerId: bookingData.customerId,
        serviceId: bookingData.serviceId,
        therapistId: bookingData.therapistId,
        appointmentTime: appointmentTime.toISOString(),
        status: "BOOKED" as const,
        amount: services?.find(s => s.id === bookingData.serviceId)?.price || 0,
        isPaid: false
      };

      const result = await createBooking.mutateAsync(submissionData);
      setBookingConfirmation(result);
      setBookingComplete(true);
      toast.success("Your booking has been confirmed!");
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const isLoading = servicesLoading || therapistsLoading || createBooking.isPending;

  if (isLoading && currentStep === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  const selectedService = services?.find(service => service.id === Number(bookingData.serviceId));
  const selectedTherapist = therapists?.find(therapist => therapist.id === Number(bookingData.therapistId));

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-purple-100 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Schedule your skincare treatment with our expert specialists.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!bookingComplete ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Select Service"}
                  {currentStep === 2 && "Choose Specialist & Time"}
                  {currentStep === 3 && "Confirm Your Booking"}
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of 3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceId">Service</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("serviceId", value)}
                          value={bookingData.serviceId.toString()}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services?.map(service => (
                              <SelectItem key={service.id} value={service.id.toString()}>
                                {service.name} - ${service.price} ({service.durationMinutes} min)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedService && (
                        <Card className="bg-gray-50">
                          <CardHeader>
                            <CardTitle className="text-lg">{selectedService.name}</CardTitle>
                            <CardDescription>${selectedService.price} | {selectedService.durationMinutes} minutes</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600">{selectedService.description}</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="therapistId">Specialist (Optional)</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("therapistId", value)}
                          value={bookingData.therapistId?.toString() || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a specialist (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No preference</SelectItem>
                            {filteredTherapists.map(therapist => (
                              <SelectItem key={therapist.id} value={therapist.id.toString()}>
                                {therapist.firstName} {therapist.lastName} - {therapist.specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="appointmentDate">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal mt-1",
                                  !bookingData.appointmentDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingData.appointmentDate ? format(bookingData.appointmentDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={bookingData.appointmentDate}
                                onSelect={handleDateChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label htmlFor="appointmentTime">Time</Label>
                          <Select 
                            onValueChange={(value) => handleSelectChange("appointmentTime", value)}
                            value={bookingData.appointmentTime}
                            required
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Special Requests or Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Any special requests or information we should know"
                          value={bookingData.notes}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Booking Summary</h3>
                      
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Service:</p>
                            <p className="font-medium">{selectedService?.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Price:</p>
                            <p className="font-medium">${selectedService?.price}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date:</p>
                            <p className="font-medium">{format(bookingData.appointmentDate, "PPP")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time:</p>
                            <p className="font-medium">{format(new Date(`2000-01-01T${bookingData.appointmentTime}`), "h:mm a")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration:</p>
                            <p className="font-medium">{selectedService?.durationMinutes} minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Specialist:</p>
                            <p className="font-medium">
                              {selectedTherapist 
                                ? `${selectedTherapist.firstName} ${selectedTherapist.lastName}`
                                : "No preference (will be assigned)"}
                            </p>
                          </div>
                        </div>
                        
                        {bookingData.notes && (
                          <div>
                            <p className="text-sm text-gray-500">Notes:</p>
                            <p className="text-sm">{bookingData.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-gray-500">
                        <p>Payment will be collected at the center after your service.</p>
                        <p>If you need to cancel, please do so at least 24 hours in advance.</p>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={createBooking.isPending || (currentStep === 1 && !bookingData.serviceId)}
                >
                  {createBooking.isPending ? "Processing..." : currentStep < 3 ? "Continue" : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle className="text-2xl text-green-700">Booking Confirmed!</CardTitle>
                <CardDescription>
                  Your appointment has been successfully scheduled.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Booking Reference:</p>
                    <p className="text-xl font-bold">{bookingConfirmation?.id || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-gray-500">Service:</p>
                      <p className="font-medium">{selectedService?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time:</p>
                      <p className="font-medium">{format(bookingData.appointmentDate, "PPP")} at {format(new Date(`2000-01-01T${bookingData.appointmentTime}`), "h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Specialist:</p>
                      <p className="font-medium">
                        {selectedTherapist 
                          ? `${selectedTherapist.firstName} ${selectedTherapist.lastName}`
                          : "To be assigned"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration:</p>
                      <p className="font-medium">{selectedService?.durationMinutes} minutes</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  A confirmation email has been sent with your booking details.
                  Please arrive 10 minutes before your appointment time.
                </p>
                <div className="text-sm text-gray-500 mb-6">
                  <p>If you need to cancel, please do so at least 24 hours in advance.</p>
                  <p>Payment will be collected at the center after your service.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;
