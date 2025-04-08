
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { patients } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const assessmentSchema = z.object({
  patientId: z.string().min(1, { message: "Patient is required." }),
  assessmentType: z.string().min(1, { message: "Assessment type is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  socialSkills: z.number().min(0).max(10),
  communication: z.number().min(0).max(10),
  sensoryProcessing: z.number().min(0).max(10),
  motorSkills: z.number().min(0).max(10),
  adaptiveBehavior: z.number().min(0).max(10),
  notes: z.string(),
  recommendations: z.string(),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

export function AssessmentForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      patientId: "",
      assessmentType: "",
      date: "",
      location: "",
      socialSkills: 5,
      communication: 5,
      sensoryProcessing: 5,
      motorSkills: 5,
      adaptiveBehavior: 5,
      notes: "",
      recommendations: "",
    },
  });

  function onSubmit(data: AssessmentFormValues) {
    toast({
      title: "Assessment recorded",
      description: `Assessment for patient has been successfully recorded.`,
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  const getRatingLabel = (value: number) => {
    if (value <= 2) return "Needs significant support";
    if (value <= 4) return "Needs moderate support";
    if (value <= 6) return "Needs some support";
    if (value <= 8) return "Developing independence";
    return "Age-appropriate skills";
  };

  const getRatingColor = (value: number) => {
    if (value <= 2) return "bg-red-100 text-red-800 border-red-200";
    if (value <= 4) return "bg-amber-100 text-amber-800 border-amber-200";
    if (value <= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (value <= 8) return "bg-green-100 text-green-800 border-green-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-ablelyf-blue-500">
          <ClipboardList className="mr-2 h-4 w-4" />
          New Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record New Assessment</DialogTitle>
          <DialogDescription>
            Document patient assessment results and recommendations.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.age})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assessmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Assessment</SelectItem>
                          <SelectItem value="progress">Progress Assessment</SelectItem>
                          <SelectItem value="quarterly">Quarterly Review</SelectItem>
                          <SelectItem value="annual">Annual Review</SelectItem>
                          <SelectItem value="discharge">Discharge Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clinic">Clinic</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="telehealth">Telehealth</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Functional Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Rate each area on a scale of 0-10 (0: Requires maximum support, 10: Age-appropriate skills)
              </p>

              <div className="space-y-6 pt-2">
                <FormField
                  control={form.control}
                  name="socialSkills"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Social Skills</FormLabel>
                        <Badge className={getRatingColor(field.value)}>
                          {getRatingLabel(field.value)}
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Label>0</Label>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="flex-1"
                          />
                          <Label>10</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Communication</FormLabel>
                        <Badge className={getRatingColor(field.value)}>
                          {getRatingLabel(field.value)}
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Label>0</Label>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="flex-1"
                          />
                          <Label>10</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sensoryProcessing"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Sensory Processing</FormLabel>
                        <Badge className={getRatingColor(field.value)}>
                          {getRatingLabel(field.value)}
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Label>0</Label>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="flex-1"
                          />
                          <Label>10</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motorSkills"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Motor Skills</FormLabel>
                        <Badge className={getRatingColor(field.value)}>
                          {getRatingLabel(field.value)}
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Label>0</Label>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="flex-1"
                          />
                          <Label>10</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adaptiveBehavior"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Adaptive Behavior</FormLabel>
                        <Badge className={getRatingColor(field.value)}>
                          {getRatingLabel(field.value)}
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Label>0</Label>
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="flex-1"
                          />
                          <Label>10</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed observations and findings"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommendations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter therapeutic recommendations based on assessment"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Assessment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
