
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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { patients } from "@/data/mockData";

const scheduleSessionSchema = z.object({
  patientId: z.string().min(1, { message: "Patient is required." }),
  sessionType: z.string().min(1, { message: "Session type is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  startTime: z.string().min(1, { message: "Start time is required." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  objective: z.string().min(5, { message: "Objective should be at least 5 characters." }),
  recurring: z.boolean().default(false),
  recurrencePattern: z.string().optional(),
  additionalParticipants: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

type ScheduleSessionValues = z.infer<typeof scheduleSessionSchema>;

export function ScheduleSessionForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ScheduleSessionValues>({
    resolver: zodResolver(scheduleSessionSchema),
    defaultValues: {
      patientId: "",
      sessionType: "",
      date: "",
      startTime: "",
      duration: "60",
      location: "",
      objective: "",
      recurring: false,
      recurrencePattern: "weekly",
      additionalParticipants: [],
      notes: "",
    },
  });

  function onSubmit(data: ScheduleSessionValues) {
    toast({
      title: "Session scheduled",
      description: `Session has been scheduled successfully.`,
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  const participantItems = [
    { id: "caregiver", label: "Caregiver/Parent" },
    { id: "teacher", label: "Teacher" },
    { id: "assistant", label: "Therapy Assistant" },
    { id: "specialist", label: "Specialist/Consultant" },
    { id: "translator", label: "Translator/Interpreter" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-ablelyf-blue-500">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Therapy Session</DialogTitle>
          <DialogDescription>
            Set up a new therapy session with your patient.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
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
                name="sessionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Therapy</SelectItem>
                          <SelectItem value="group">Group Therapy</SelectItem>
                          <SelectItem value="evaluation">Evaluation/Assessment</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="training">Parent/Caregiver Training</SelectItem>
                          <SelectItem value="team">Team Meeting</SelectItem>
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
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <SelectItem value="telehealth">Telehealth/Virtual</SelectItem>
                          <SelectItem value="home">Patient's Home</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="center">Community Center</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Objective</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief description of session goals"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="recurring"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Recurring Session
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Set this as a repeating session
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {form.watch("recurring") && (
                <FormField
                  control={form.control}
                  name="recurrencePattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurrence Pattern</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pattern" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="additionalParticipants"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Additional Participants</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Select anyone else who should attend
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {participantItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="additionalParticipants"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes, preparation required, etc."
                      className="min-h-[80px]"
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
              <Button type="submit">
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
