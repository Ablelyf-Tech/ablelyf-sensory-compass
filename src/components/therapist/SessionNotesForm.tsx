
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { patients } from "@/data/mockData";

const sessionNotesSchema = z.object({
  patientId: z.string().min(1, { message: "Patient is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  startTime: z.string().min(1, { message: "Start time is required." }),
  endTime: z.string().min(1, { message: "End time is required." }),
  sessionType: z.string().min(1, { message: "Session type is required." }),
  present: z.array(z.string()).min(1, { message: "At least one participant must be selected." }),
  observations: z.string().min(10, { message: "Observations should be at least 10 characters." }),
  interventions: z.string().min(10, { message: "Interventions should be at least 10 characters." }),
  patientResponse: z.string().min(10, { message: "Patient response should be at least 10 characters." }),
  followUp: z.string().min(10, { message: "Follow-up plan should be at least 10 characters." }),
  additionalNotes: z.string().optional(),
});

type SessionNotesValues = z.infer<typeof sessionNotesSchema>;

export function SessionNotesForm() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<SessionNotesValues>({
    resolver: zodResolver(sessionNotesSchema),
    defaultValues: {
      patientId: "",
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "",
      endTime: "",
      sessionType: "",
      present: [],
      observations: "",
      interventions: "",
      patientResponse: "",
      followUp: "",
      additionalNotes: "",
    },
  });

  function onSubmit(data: SessionNotesValues) {
    toast({
      title: "Session notes saved",
      description: "Your session notes have been saved successfully.",
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  const participantItems = [
    { id: "patient", label: "Patient" },
    { id: "caregiver", label: "Caregiver/Parent" },
    { id: "teacher", label: "Teacher" },
    { id: "therapist", label: "Therapist (You)" },
    { id: "assistant", label: "Therapy Assistant" },
    { id: "other", label: "Other Professional" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Session Notes
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Session Notes</SheetTitle>
          <SheetDescription>
            Document your therapy session details and observations.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Therapy</SelectItem>
                          <SelectItem value="group">Group Therapy</SelectItem>
                          <SelectItem value="family">Family Session</SelectItem>
                          <SelectItem value="assessment">Assessment Session</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up Session</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="present"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Present at Session</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {participantItems.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="present"
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
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document your observations of the patient during the session"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interventions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interventions Used</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe therapeutic techniques and interventions used"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientResponse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Response</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How did the patient respond to the interventions?"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followUp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow-up Plan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Plans for next session and home activities"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other relevant information"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
