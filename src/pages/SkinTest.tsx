
import { useState } from "react";
import { useSkinTest } from "@/hooks/useSkinTest";
import { Service, SkinTest as SkinTestType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

const SkinTest = () => {
  const [skinTestData, setSkinTestData] = useState<SkinTestType>({
    skinType: "",
    skinConcerns: "",
    oiliness: 5,
    sensitivity: 5,
    hydration: 5,
    pigmentation: 5,
    wrinkles: 5,
    additionalNotes: ""
  });
  
  const [recommendedServices, setRecommendedServices] = useState<Service[]>([]);
  const [step, setStep] = useState(1);
  
  const skinTest = useSkinTest();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSkinTestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSkinTestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setSkinTestData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await skinTest.mutateAsync(skinTestData);
      setRecommendedServices(results);
      setStep(2);
      toast.success("Skin test completed! Here are your recommendations.");
    } catch (error) {
      toast.error("Failed to process skin test. Please try again.");
    }
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-purple-100 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Skin Assessment Test</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete this assessment to receive personalized service recommendations based on your skin type and concerns.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>Skin Assessment Form</CardTitle>
                <CardDescription>
                  Please answer the following questions about your skin to help us understand your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skinType">Skin Type</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("skinType", value)}
                        value={skinTestData.skinType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="oily">Oily</SelectItem>
                          <SelectItem value="combination">Combination</SelectItem>
                          <SelectItem value="sensitive">Sensitive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skinConcerns">Primary Skin Concerns</Label>
                      <Textarea
                        id="skinConcerns"
                        name="skinConcerns"
                        placeholder="e.g. acne, wrinkles, hyperpigmentation, etc."
                        value={skinTestData.skinConcerns}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="oiliness">Oiliness (1-10)</Label>
                      <div className="pt-5 pb-2">
                        <Slider 
                          defaultValue={[5]} 
                          max={10} 
                          step={1} 
                          onValueChange={(value) => handleSliderChange("oiliness", value)}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Very Dry</span>
                        <span>Balanced</span>
                        <span>Very Oily</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="sensitivity">Sensitivity (1-10)</Label>
                      <div className="pt-5 pb-2">
                        <Slider 
                          defaultValue={[5]} 
                          max={10} 
                          step={1}
                          onValueChange={(value) => handleSliderChange("sensitivity", value)}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Not Sensitive</span>
                        <span>Moderate</span>
                        <span>Very Sensitive</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hydration">Hydration (1-10)</Label>
                      <div className="pt-5 pb-2">
                        <Slider 
                          defaultValue={[5]} 
                          max={10} 
                          step={1}
                          onValueChange={(value) => handleSliderChange("hydration", value)}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Dehydrated</span>
                        <span>Adequate</span>
                        <span>Very Hydrated</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pigmentation">Pigmentation Issues (1-10)</Label>
                      <div className="pt-5 pb-2">
                        <Slider 
                          defaultValue={[5]} 
                          max={10} 
                          step={1}
                          onValueChange={(value) => handleSliderChange("pigmentation", value)}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>None</span>
                        <span>Moderate</span>
                        <span>Significant</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="wrinkles">Fine Lines & Wrinkles (1-10)</Label>
                      <div className="pt-5 pb-2">
                        <Slider 
                          defaultValue={[5]} 
                          max={10} 
                          step={1}
                          onValueChange={(value) => handleSliderChange("wrinkles", value)}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>None</span>
                        <span>Moderate</span>
                        <span>Significant</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        placeholder="Any other information about your skin you'd like to share"
                        value={skinTestData.additionalNotes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={skinTest.isPending}>
                    {skinTest.isPending ? "Processing..." : "Submit Assessment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Personalized Recommendations</CardTitle>
                  <CardDescription>
                    Based on your skin assessment, we recommend the following services:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendedServices.length > 0 ? (
                    <div className="space-y-6">
                      {recommendedServices.map((service) => (
                        <Card key={service.id}>
                          <CardHeader>
                            <CardTitle className="text-xl">{service.name}</CardTitle>
                            <CardDescription>${service.price} | {service.durationMinutes} minutes</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>{service.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Link to={`/booking?serviceId=${service.id}`} className="w-full">
                              <Button className="w-full">Book This Service</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No specific recommendations found based on your assessment.</p>
                      <Link to="/services">
                        <Button variant="outline">Browse All Services</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Retake Assessment
                  </Button>
                  <Link to="/booking">
                    <Button>Book Appointment</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SkinTest;
