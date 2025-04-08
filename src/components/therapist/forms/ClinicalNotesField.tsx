
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "./PatientFormSchema";

interface ClinicalNotesFieldProps {
  form: UseFormReturn<PatientFormValues>;
}

export const ClinicalNotesField: React.FC<ClinicalNotesFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Clinical Notes</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter any relevant clinical notes or observations"
              className="min-h-[100px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
