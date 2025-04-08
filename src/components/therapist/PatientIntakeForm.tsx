
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { patientFormSchema, PatientFormValues } from "./forms/PatientFormSchema";
import { PatientDetailsFields } from "./forms/PatientDetailsFields";
import { ContactInfoFields } from "./forms/ContactInfoFields";
import { ClinicalNotesField } from "./forms/ClinicalNotesField";

type PatientIntakeFormProps = {
  children?: React.ReactNode;
};

export function PatientIntakeForm({ children }: PatientIntakeFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: "",
      condition: "",
      diagnosisDate: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      notes: "",
    },
  });

  function onSubmit(data: PatientFormValues) {
    toast({
      title: "Patient added successfully",
      description: `${data.name} has been added to your patients list.`,
    });
    console.log(data);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-ablelyf-blue-500">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient details to add them to your caseload.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <PatientDetailsFields form={form} />
            <ContactInfoFields form={form} />
            <ClinicalNotesField form={form} />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Patient</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
