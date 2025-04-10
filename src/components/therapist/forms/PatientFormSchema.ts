
import * as z from "zod";

export const patientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Age must be a positive number.",
  }),
  condition: z.string().min(2, { message: "Condition is required." }),
  preconditions: z.array(z.string()).optional().default([]),
  diagnosisDate: z.string().optional(),
  contactPerson: z.string().min(2, { message: "Contact person name is required." }),
  contactPhone: z.string().min(6, { message: "Valid phone number is required." }),
  contactEmail: z.string().email({ message: "Valid email is required." }),
  notes: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
