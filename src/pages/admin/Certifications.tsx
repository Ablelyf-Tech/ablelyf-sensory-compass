
import React, { useState } from "react";
import { PageTemplate } from "@/components/shared/PageTemplate";
import { Button } from "@/components/ui/button";
import { SearchAndFilter } from "@/components/shared/SearchAndFilter";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Certification, UserCertification } from "@/types/certifications";
import { useToast } from "@/hooks/use-toast";
import { CertificationList } from "@/components/admin/certifications/CertificationList";
import { CertificationDetails } from "@/components/admin/certifications/CertificationDetails";
import { UserCertificationList } from "@/components/admin/certifications/UserCertificationList";
import { AddCertificationForm } from "@/components/admin/certifications/AddCertificationForm";
import { AssignCertificationForm } from "@/components/admin/certifications/AssignCertificationForm";
import { CertificationFormValues, UserCertificationFormValues } from "@/components/admin/certifications/CertificationFormSchema";
import { 
  mockCertifications, 
  mockUserCertifications, 
  certificationFilterOptions, 
  userCertFilterOptions 
} from "@/data/certificationData";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications);
  const [userCertifications, setUserCertifications] = useState<UserCertification[]>(mockUserCertifications);
  const [filteredCertifications, setFilteredCertifications] = useState<Certification[]>(mockCertifications);
  const [filteredUserCertifications, setFilteredUserCertifications] = useState<UserCertification[]>(mockUserCertifications);
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [isAssignCertificationOpen, setIsAssignCertificationOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [activeTab, setActiveTab] = useState("all-certifications");
  const { toast } = useToast();

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
    // Create a new certification with all required properties
    const newCertification: Certification = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      type: data.type,
      category: data.category,
      description: data.description,
      requirements: data.requirements,
      validityPeriod: data.validityPeriod,
      issuedBy: data.issuedBy,
    };

    setCertifications([...certifications, newCertification]);
    setFilteredCertifications([...certifications, newCertification]);
    setIsAddCertificationOpen(false);

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

    const newUserCertification: UserCertification = {
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

    toast({
      title: "Certification assigned",
      description: `${selectedCert.name} has been assigned to ${selectedUser.userName}`,
    });
  };

  const viewCertificationDetails = (certification: Certification) => {
    setSelectedCertification(certification);
  };

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

            <CertificationList 
              certifications={filteredCertifications}
              onViewDetails={viewCertificationDetails}
              onAssignCertification={(cert) => {
                setSelectedCertification(cert);
                setIsAssignCertificationOpen(true);
              }}
            />

            {selectedCertification && (
              <CertificationDetails certification={selectedCertification} />
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

            <UserCertificationList userCertifications={filteredUserCertifications} />
          </TabsContent>
        </Tabs>

        <AddCertificationForm
          open={isAddCertificationOpen}
          onOpenChange={setIsAddCertificationOpen}
          onSubmit={handleAddCertification}
        />

        <AssignCertificationForm
          open={isAssignCertificationOpen}
          onOpenChange={setIsAssignCertificationOpen}
          onSubmit={handleAssignCertification}
          certifications={certifications}
          userCertifications={userCertifications}
          selectedCertificationId={selectedCertification?.id}
        />
      </div>
    </PageTemplate>
  );
};

export default Certifications;
