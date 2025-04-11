
// Certification types
export interface Certification {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  requirements: string;
  validityPeriod: string;
  issuedBy: string;
}

export interface UserCertification {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  certificationId: string;
  certificationName: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expiring-soon' | 'expired';
}
