
import * as z from "zod";

// Form schema for certification
export const certificationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
  validityPeriod: z.string().min(1, { message: "Validity period is required" }),
  issuedBy: z.string().min(2, { message: "Issuer must be at least 2 characters" }),
});

// Form schema for user certification
export const userCertificationFormSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  certificationId: z.string().min(1, { message: "Certification is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
});

export type CertificationFormValues = z.infer<typeof certificationFormSchema>;
export type UserCertificationFormValues = z.infer<typeof userCertificationFormSchema>;
