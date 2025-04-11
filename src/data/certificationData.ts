
import { Certification, UserCertification } from "@/types/certifications";

// Mock certifications data
export const mockCertifications: Certification[] = [
  {
    id: "1",
    name: "Sensory Processing Specialist",
    type: "Professional",
    category: "therapy",
    description: "Certification for therapists specializing in sensory processing disorders",
    requirements: "Minimum 2 years experience, 40 hours of training, final assessment",
    validityPeriod: "2 years",
    issuedBy: "American Therapy Association",
  },
  {
    id: "2",
    name: "Inclusive Education Facilitator",
    type: "Educational",
    category: "teaching",
    description: "Certification for educators working with neurodivergent students",
    requirements: "Bachelor's in Education, specialized coursework, supervised teaching",
    validityPeriod: "3 years",
    issuedBy: "National Education Board",
  },
  {
    id: "3",
    name: "Workplace Accommodation Specialist",
    type: "Professional",
    category: "hr",
    description: "Certification for HR professionals managing workplace accommodations",
    requirements: "HR experience, legal training, case studies",
    validityPeriod: "2 years",
    issuedBy: "Society for Human Resource Management",
  },
  {
    id: "4",
    name: "Applied Behavior Analysis Provider",
    type: "Clinical",
    category: "therapy",
    description: "Certification for delivering ABA therapy",
    requirements: "Master's degree, supervised clinical hours, exam",
    validityPeriod: "2 years",
    issuedBy: "Behavior Analyst Certification Board",
  },
  {
    id: "5",
    name: "Caregiving Support Specialist",
    type: "Family Support",
    category: "caregiving",
    description: "Certification for providing specialized family support",
    requirements: "Training program, case management experience",
    validityPeriod: "1 year",
    issuedBy: "Family Caregiver Alliance",
  },
];

// Mock user certifications
export const mockUserCertifications: UserCertification[] = [
  {
    id: "1",
    userId: "1",
    userName: "Dr. Sarah Johnson",
    userRole: "therapist",
    certificationId: "1",
    certificationName: "Sensory Processing Specialist",
    issueDate: "2023-06-15",
    expiryDate: "2025-06-15",
    status: "active",
  },
  {
    id: "2",
    userId: "1",
    userName: "Dr. Sarah Johnson",
    userRole: "therapist",
    certificationId: "4",
    certificationName: "Applied Behavior Analysis Provider",
    issueDate: "2023-04-10",
    expiryDate: "2025-04-10",
    status: "active",
  },
  {
    id: "3",
    userId: "3",
    userName: "Emma Wilson",
    userRole: "teacher",
    certificationId: "2",
    certificationName: "Inclusive Education Facilitator",
    issueDate: "2022-09-20",
    expiryDate: "2025-09-20",
    status: "active",
  },
  {
    id: "4",
    userId: "4",
    userName: "John Smith",
    userRole: "hr",
    certificationId: "3",
    certificationName: "Workplace Accommodation Specialist",
    issueDate: "2022-11-05",
    expiryDate: "2024-11-05",
    status: "expiring-soon",
  },
  {
    id: "5",
    userId: "2",
    userName: "Michael Davis",
    userRole: "caregiver",
    certificationId: "5",
    certificationName: "Caregiving Support Specialist",
    issueDate: "2023-01-30",
    expiryDate: "2024-01-30",
    status: "expired",
  },
];

// Filter option configurations
export const certificationFilterOptions = [
  {
    id: "type",
    label: "Type",
    options: [
      { value: "Professional", label: "Professional" },
      { value: "Educational", label: "Educational" },
      { value: "Clinical", label: "Clinical" },
      { value: "Family Support", label: "Family Support" },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: [
      { value: "therapy", label: "Therapy" },
      { value: "teaching", label: "Teaching" },
      { value: "hr", label: "HR" },
      { value: "caregiving", label: "Caregiving" },
    ],
  },
];

export const userCertFilterOptions = [
  {
    id: "role",
    label: "User Role",
    options: [
      { value: "therapist", label: "Therapist" },
      { value: "caregiver", label: "Caregiver" },
      { value: "teacher", label: "Teacher" },
      { value: "hr", label: "HR" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "expiring-soon", label: "Expiring Soon" },
      { value: "expired", label: "Expired" },
    ],
  },
];
