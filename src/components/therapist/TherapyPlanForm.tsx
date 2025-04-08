
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
import { FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patients } from "@/data/mockData";

const therapyPlanSchema = z.object({
  patientId: z.string().min(1, { message: "Patient is required." }),
  title: z.string().min(2, { message: "Title is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().optional(),
  goals: z.array(
    z.object({
      title: z.string().min(2, { message: "Goal title is required." }),
      description: z.string().min(2, { message: "Description is required." }),
      metrics: z.string().min(2, { message: "Success metrics are required." }),
      targetDate: z.string().optional(),
    })
  ).min(1, { message: "At least one goal is required." }),
});

type TherapyPlanValues = z.infer<typeof therapyPlanSchema>;

export function TherapyPlanForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<TherapyPlanValues>({
    resolver: zodResolver(therapyPlanSchema),
    defaultValues: {
      patientId: "",
      title: "",
      startDate: "",
      endDate: "",
      goals: [
        {
          title: "",
          description: "",
          metrics: "",
          targetDate: "",
        },
      ],
    },
  });

  function onSubmit(data: TherapyPlanValues) {
    toast({
      title: "Therapy plan created",
      description: `New plan "${data.title}" has been created successfully.`,
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  function addGoal() {
    const goals = form.getValues("goals");
    form.setValue("goals", [
      ...goals,
      { title: "", description: "", metrics: "", targetDate: "" },
    ]);
  }

  function removeGoal(index: number) {
    const goals = form.getValues("goals");
    if (goals.length > 1) {
      form.setValue(
        "goals",
        goals.filter((_, i) => i !== index)
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-ablelyf-blue-500">
          <FileText className="mr-2 h-4 w-4" />
          Create Therapy Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Therapy Plan</DialogTitle>
          <DialogDescription>
            Design a comprehensive therapy plan for your patient.
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Communication Skills Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Therapy Goals</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addGoal}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Goal
                </Button>
              </div>

              {form.watch("goals").map((_, index) => (
                <Card key={index} className="border border-border">
                  <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Goal {index + 1}</CardTitle>
                    {form.watch("goals").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGoal(index)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 py-0 px-6 pb-6">
                    <FormField
                      control={form.control}
                      name={`goals.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Improve verbal communication" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`goals.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed description of the goal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`goals.${index}.metrics`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Success Metrics</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How will progress be measured?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`goals.${index}.targetDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Date (Optional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Plan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
