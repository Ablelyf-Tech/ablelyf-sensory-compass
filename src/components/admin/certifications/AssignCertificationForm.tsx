
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Certification, UserCertification } from "@/types/certifications";
import { UserCertificationFormValues, userCertificationFormSchema } from "./CertificationFormSchema";

interface AssignCertificationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserCertificationFormValues) => void;
  certifications: Certification[];
  userCertifications: UserCertification[];
  selectedCertificationId?: string;
}

export const AssignCertificationForm: React.FC<AssignCertificationFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  certifications,
  userCertifications,
  selectedCertificationId,
}) => {
  const form = useForm<UserCertificationFormValues>({
    resolver: zodResolver(userCertificationFormSchema),
    defaultValues: {
      userId: "",
      certificationId: selectedCertificationId || "",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2))
        .toISOString()
        .split("T")[0],
    },
  });

  // Set certification ID if passed as prop
  React.useEffect(() => {
    if (selectedCertificationId) {
      form.setValue("certificationId", selectedCertificationId);
    }
  }, [selectedCertificationId, form]);

  const handleSubmit = (data: UserCertificationFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Certification</DialogTitle>
          <DialogDescription>
            Assign a certification to a user in the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userCertifications.map((cert) => (
                        <SelectItem key={cert.userId} value={cert.userId}>
                          {cert.userName} ({cert.userRole})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="certificationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select certification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {certifications.map((cert) => (
                        <SelectItem key={cert.id} value={cert.id}>
                          {cert.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Assign Certification</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
