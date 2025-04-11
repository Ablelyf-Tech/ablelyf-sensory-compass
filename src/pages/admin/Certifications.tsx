
import React, { useState } from "react";
import { PageTemplate } from "@/components/shared/PageTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchAndFilter } from "@/components/shared/SearchAndFilter";
import { BadgeCheck, Plus, Download, Eye, Award, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock certifications data
const mockCertifications = [
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
const mockUserCertifications = [
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

// Form schema for certification
const certificationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
  validityPeriod: z.string().min(1, { message: "Validity period is required" }),
  issuedBy: z.string().min(2, { message: "Issuer must be at least 2 characters" }),
});

// Form schema for user certification
const userCertificationFormSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  certificationId: z.string().min(1, { message: "Certification is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
});

type CertificationFormValues = z.infer<typeof certificationFormSchema>;
type UserCertificationFormValues = z.infer<typeof userCertificationFormSchema>;

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState(mockCertifications);
  const [userCertifications, setUserCertifications] = useState(mockUserCertifications);
  const [filteredCertifications, setFilteredCertifications] = useState(mockCertifications);
  const [filteredUserCertifications, setFilteredUserCertifications] = useState(mockUserCertifications);
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [isAssignCertificationOpen, setIsAssignCertificationOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<typeof mockCertifications[0] | null>(null);
  const [activeTab, setActiveTab] = useState("all-certifications");
  const { toast } = useToast();

  const certForm = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      name: "",
      type: "",
      category: "",
      description: "",
      requirements: "",
      validityPeriod: "",
      issuedBy: "",
    },
  });

  const userCertForm = useForm<UserCertificationFormValues>({
    resolver: zodResolver(userCertificationFormSchema),
    defaultValues: {
      userId: "",
      certificationId: "",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2))
        .toISOString()
        .split("T")[0],
    },
  });

  const handleSearch = (term: string) => {
    const filtered = certifications.filter(
      (cert) =>
        cert.name.toLowerCase().includes(term.toLowerCase()) ||
        cert.type.toLowerCase().includes(term.toLowerCase()) ||
        cert.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCertifications(filtered);
  };

  const handleUserCertSearch = (term: string) => {
    const filtered = userCertifications.filter(
      (cert) =>
        cert.userName.toLowerCase().includes(term.toLowerCase()) ||
        cert.certificationName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUserCertifications(filtered);
  };

  const handleFilter = (filters: Record<string, string>) => {
    let filtered = [...certifications];

    if (filters.type) {
      filtered = filtered.filter((cert) => cert.type === filters.type);
    }

    if (filters.category) {
      filtered = filtered.filter((cert) => cert.category === filters.category);
    }

    setFilteredCertifications(filtered);
  };

  const handleUserCertFilter = (filters: Record<string, string>) => {
    let filtered = [...userCertifications];

    if (filters.role) {
      filtered = filtered.filter((cert) => cert.userRole === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter((cert) => cert.status === filters.status);
    }

    setFilteredUserCertifications(filtered);
  };

  const handleAddCertification = (data: CertificationFormValues) => {
    const newCertification = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
    };

    setCertifications([...certifications, newCertification]);
    setFilteredCertifications([...certifications, newCertification]);
    setIsAddCertificationOpen(false);
    certForm.reset();

    toast({
      title: "Certification created",
      description: `${data.name} has been added to the system`,
    });
  };

  const handleAssignCertification = (data: UserCertificationFormValues) => {
    const selectedUser = mockUserCertifications.find((c) => c.userId === data.userId);
    const selectedCert = certifications.find((c) => c.id === data.certificationId);

    if (!selectedUser || !selectedCert) {
      toast({
        title: "Error",
        description: "User or certification not found",
        variant: "destructive",
      });
      return;
    }

    const newUserCertification = {
      id: Math.random().toString(36).substring(2, 9),
      userId: data.userId,
      userName: selectedUser.userName,
      userRole: selectedUser.userRole,
      certificationId: data.certificationId,
      certificationName: selectedCert.name,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      status: "active",
    };

    setUserCertifications([...userCertifications, newUserCertification]);
    setFilteredUserCertifications([...userCertifications, newUserCertification]);
    setIsAssignCertificationOpen(false);
    userCertForm.reset();

    toast({
      title: "Certification assigned",
      description: `${selectedCert.name} has been assigned to ${selectedUser.userName}`,
    });
  };

  const viewCertificationDetails = (certification: typeof mockCertifications[0]) => {
    setSelectedCertification(certification);
  };

  const certificationFilterOptions = [
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

  const userCertFilterOptions = [
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

  return (
    <PageTemplate title="Certifications" description="Manage professional certifications and user qualifications">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-certifications">All Certifications</TabsTrigger>
            <TabsTrigger value="user-certifications">User Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="all-certifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <SearchAndFilter
                onSearch={handleSearch}
                searchPlaceholder="Search certifications..."
                filterOptions={certificationFilterOptions}
                onFilter={handleFilter}
              />
              
              <Button onClick={() => setIsAddCertificationOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-ablelyf-blue-500" />
                  Available Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issued By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCertifications.map((cert) => (
                        <tr key={cert.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <BadgeCheck className="h-4 w-4 text-ablelyf-blue-500 mr-2" />
                              <div className="text-sm font-medium text-gray-900">
                                {cert.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{cert.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 capitalize">
                              {cert.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {cert.issuedBy}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewCertificationDetails(cert)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedCertification(cert);
                                  userCertForm.setValue("certificationId", cert.id);
                                  setIsAssignCertificationOpen(true);
                                }}
                              >
                                <BadgeCheck className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {selectedCertification && (
              <Card>
                <CardHeader>
                  <CardTitle>Certification Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedCertification.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCertification.type} · {selectedCertification.category} · Valid for {selectedCertification.validityPeriod}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm mt-1">{selectedCertification.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Requirements</h4>
                      <p className="text-sm mt-1">{selectedCertification.requirements}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Issued By</h4>
                      <p className="text-sm mt-1">{selectedCertification.issuedBy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="user-certifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <SearchAndFilter
                onSearch={handleUserCertSearch}
                searchPlaceholder="Search user certifications..."
                filterOptions={userCertFilterOptions}
                onFilter={handleUserCertFilter}
              />
              
              <Button onClick={() => setIsAssignCertificationOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Assign Certification
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-ablelyf-blue-500" />
                  User Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Certification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiry Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUserCertifications.map((cert) => (
                        <tr key={cert.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {cert.userName}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {cert.userRole}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{cert.certificationName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(cert.issueDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(cert.expiryDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                cert.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : cert.status === "expiring-soon"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {cert.status === "active"
                                ? "Active"
                                : cert.status === "expiring-soon"
                                ? "Expiring Soon"
                                : "Expired"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Certification Dialog */}
        <Dialog open={isAddCertificationOpen} onOpenChange={setIsAddCertificationOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Certification</DialogTitle>
              <DialogDescription>
                Create a new certification for professionals in the system.
              </DialogDescription>
            </DialogHeader>
            <Form {...certForm}>
              <form onSubmit={certForm.handleSubmit(handleAddCertification)} className="space-y-4">
                <FormField
                  control={certForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Sensory Processing Specialist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={certForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Educational">Educational</SelectItem>
                            <SelectItem value="Clinical">Clinical</SelectItem>
                            <SelectItem value="Family Support">Family Support</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={certForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="therapy">Therapy</SelectItem>
                            <SelectItem value="teaching">Teaching</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="caregiving">Caregiving</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={certForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what this certification is for" 
                          {...field} 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={certForm.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the requirements to obtain this certification" 
                          {...field} 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={certForm.control}
                    name="validityPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Validity Period</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1 year">1 year</SelectItem>
                            <SelectItem value="2 years">2 years</SelectItem>
                            <SelectItem value="3 years">3 years</SelectItem>
                            <SelectItem value="5 years">5 years</SelectItem>
                            <SelectItem value="Lifetime">Lifetime</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={certForm.control}
                    name="issuedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issued By</FormLabel>
                        <FormControl>
                          <Input placeholder="Issuing organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddCertificationOpen(false);
                      certForm.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Certification</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Assign Certification Dialog */}
        <Dialog open={isAssignCertificationOpen} onOpenChange={setIsAssignCertificationOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Certification</DialogTitle>
              <DialogDescription>
                Assign a certification to a user in the system.
              </DialogDescription>
            </DialogHeader>
            <Form {...userCertForm}>
              <form onSubmit={userCertForm.handleSubmit(handleAssignCertification)} className="space-y-4">
                <FormField
                  control={userCertForm.control}
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
                          {mockUserCertifications.map((cert) => (
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
                  control={userCertForm.control}
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
                  control={userCertForm.control}
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
                  control={userCertForm.control}
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
                      setIsAssignCertificationOpen(false);
                      userCertForm.reset();
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
      </div>
    </PageTemplate>
  );
};

export default Certifications;
