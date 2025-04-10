
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PatientFormValues } from "./PatientFormSchema";

interface PatientDetailsFieldsProps {
  form: UseFormReturn<PatientFormValues>;
}

export const PatientDetailsFields: React.FC<PatientDetailsFieldsProps> = ({ form }) => {
  const [preconditionInput, setPreconditionInput] = useState("");
  const preconditions = form.watch("preconditions") || [];
  
  const handleAddPrecondition = () => {
    if (preconditionInput.trim().length > 0) {
      const updatedPreconditions = [...preconditions, preconditionInput.trim()];
      form.setValue("preconditions", updatedPreconditions);
      setPreconditionInput("");
    }
  };
  
  const handleRemovePrecondition = (index: number) => {
    const updatedPreconditions = preconditions.filter((_, i) => i !== index);
    form.setValue("preconditions", updatedPreconditions);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" placeholder="10" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Condition</FormLabel>
            <FormControl>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autism">Autism Spectrum Disorder</SelectItem>
                  <SelectItem value="adhd">ADHD</SelectItem>
                  <SelectItem value="sensory">Sensory Processing Disorder</SelectItem>
                  <SelectItem value="developmental">Developmental Delay</SelectItem>
                  <SelectItem value="learning">Learning Disability</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="diagnosisDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diagnosis Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Preconditions section */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-end gap-2 mb-2">
          <div className="flex-1">
            <FormLabel className="mb-2 block">Preconditions</FormLabel>
            <Input
              placeholder="Enter precondition"
              value={preconditionInput}
              onChange={(e) => setPreconditionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPrecondition();
                }
              }}
            />
          </div>
          <Button 
            type="button" 
            onClick={handleAddPrecondition}
            className="bg-ablelyf-blue-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Precondition
          </Button>
        </div>
        
        {preconditions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {preconditions.map((precondition, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {precondition}
                <X 
                  className="h-3 w-3 ml-2 cursor-pointer" 
                  onClick={() => handleRemovePrecondition(index)} 
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
