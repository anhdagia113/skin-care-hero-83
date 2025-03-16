
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SkinTest } from '@/types';
import { submitSkinTest } from '@/api/api-client';
import { toast } from 'sonner';

const skinTypes = [
  { value: 'normal', label: 'Normal' },
  { value: 'dry', label: 'Dry' },
  { value: 'oily', label: 'Oily' },
  { value: 'combination', label: 'Combination' },
  { value: 'sensitive', label: 'Sensitive' },
];

const sensitivityLevels = [
  { value: 'low', label: 'Low - My skin rarely reacts to products' },
  { value: 'medium', label: 'Medium - My skin occasionally gets irritated' },
  { value: 'high', label: 'High - My skin often reacts to new products' },
];

const skinConcerns = [
  { id: '1', label: 'Acne' },
  { id: '2', label: 'Fine Lines & Wrinkles' },
  { id: '3', label: 'Hyperpigmentation' },
  { id: '4', label: 'Dullness' },
  { id: '5', label: 'Uneven Texture' },
  { id: '6', label: 'Redness' },
  { id: '7', label: 'Enlarged Pores' },
  { id: '8', label: 'Dryness' },
];

const SkinTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [skinTest, setSkinTest] = useState<SkinTest>({
    skinType: '',
    concerns: [],
    sensitivity: '',
    allergies: '',
    previousTreatments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateSkinTest = (field: keyof SkinTest, value: any) => {
    setSkinTest(prev => ({ ...prev, [field]: value }));
  };

  const handleConcernToggle = (id: string) => {
    setSkinTest(prev => {
      const concerns = [...prev.concerns];
      if (concerns.includes(id)) {
        return { ...prev, concerns: concerns.filter(c => c !== id) };
      } else {
        return { ...prev, concerns: [...concerns, id] };
      }
    });
  };

  const handleSubmit = async () => {
    if (!skinTest.skinType || !skinTest.sensitivity || skinTest.concerns.length === 0) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitSkinTest(skinTest);
      if (response.data) {
        toast.success('Skin assessment completed! View your personalized recommendations.');
        navigate('/services', { state: { skinTestResults: response.data } });
      } else {
        toast.error(response.error || 'Failed to submit skin assessment');
      }
    } catch (error) {
      console.error('Error submitting skin test:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if ((currentStep === 1 && !skinTest.skinType) || 
        (currentStep === 2 && skinTest.concerns.length === 0) || 
        (currentStep === 3 && !skinTest.sensitivity)) {
      toast.error('Please answer the question to continue');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">What is your skin type?</CardTitle>
        <CardDescription>Select the option that best describes your skin's natural state</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={skinTest.skinType} onValueChange={value => updateSkinTest('skinType', value)}>
          {skinTypes.map(type => (
            <div key={type.value} className="flex items-center space-x-2 py-2">
              <RadioGroupItem value={type.value} id={`skin-type-${type.value}`} />
              <Label htmlFor={`skin-type-${type.value}`} className="cursor-pointer">{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={nextStep}>Next</Button>
      </CardFooter>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">What are your skin concerns?</CardTitle>
        <CardDescription>Select all that apply to your skin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skinConcerns.map(concern => (
            <div key={concern.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`concern-${concern.id}`} 
                checked={skinTest.concerns.includes(concern.id)}
                onCheckedChange={() => handleConcernToggle(concern.id)}
              />
              <Label htmlFor={`concern-${concern.id}`} className="cursor-pointer">{concern.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </CardFooter>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">How sensitive is your skin?</CardTitle>
        <CardDescription>This helps us recommend appropriate treatments</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={skinTest.sensitivity} onValueChange={value => updateSkinTest('sensitivity', value)}>
          {sensitivityLevels.map(level => (
            <div key={level.value} className="flex items-center space-x-2 py-2">
              <RadioGroupItem value={level.value} id={`sensitivity-${level.value}`} />
              <Label htmlFor={`sensitivity-${level.value}`} className="cursor-pointer">{level.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </CardFooter>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Additional Information</CardTitle>
        <CardDescription>Please share any other relevant details about your skin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="allergies" className="block mb-2">Do you have any allergies or known sensitivities to skincare ingredients?</Label>
          <Textarea 
            id="allergies" 
            placeholder="E.g., Fragrances, essential oils, specific ingredients..." 
            value={skinTest.allergies}
            onChange={e => updateSkinTest('allergies', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="previous-treatments" className="block mb-2">Have you had any previous facial treatments? If so, please describe.</Label>
          <Textarea 
            id="previous-treatments" 
            placeholder="E.g., Chemical peels, microdermabrasion, etc." 
            value={skinTest.previousTreatments}
            onChange={e => updateSkinTest('previousTreatments', e.target.value)}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderProgressBar = () => {
    const progress = (currentStep / 4) * 100;
    return (
      <div className="w-full max-w-3xl mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Skin Type</span>
          <span>Concerns</span>
          <span>Sensitivity</span>
          <span>Details</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container-custom section-padding flex flex-col items-center">
      <h1 className="text-4xl text-center mb-2">Skin Assessment</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl">
        Complete this assessment to receive personalized skincare recommendations and treatment suggestions
      </p>
      
      {renderProgressBar()}
      
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </div>
  );
};

export default SkinTestPage;
