
import React from "react";
import { Certification } from "@/types/certifications";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CertificationDetailsProps {
  certification: Certification;
}

export const CertificationDetails: React.FC<CertificationDetailsProps> = ({
  certification,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{certification.name}</h3>
            <p className="text-sm text-muted-foreground">
              {certification.type} · {certification.category} · Valid for {certification.validityPeriod}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Description</h4>
            <p className="text-sm mt-1">{certification.description}</p>
          </div>
          <div>
            <h4 className="font-medium">Requirements</h4>
            <p className="text-sm mt-1">{certification.requirements}</p>
          </div>
          <div>
            <h4 className="font-medium">Issued By</h4>
            <p className="text-sm mt-1">{certification.issuedBy}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
