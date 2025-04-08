
import React from "react";
import { PatientIntakeForm } from "./PatientIntakeForm";
import { TherapyPlanForm } from "./TherapyPlanForm";
import { AssessmentForm } from "./AssessmentForm";
import { LearningModuleForm } from "./LearningModuleForm";
import { SessionNotesForm } from "./SessionNotesForm";
import { ScheduleSessionForm } from "./ScheduleSessionForm";

// Form field components
import { PatientDetailsFields } from "./forms/PatientDetailsFields";
import { ContactInfoFields } from "./forms/ContactInfoFields";
import { ClinicalNotesField } from "./forms/ClinicalNotesField";

export const TherapistForms = {
  PatientIntakeForm,
  TherapyPlanForm,
  AssessmentForm,
  LearningModuleForm,
  SessionNotesForm,
  ScheduleSessionForm
};

export const PatientFormFields = {
  PatientDetailsFields,
  ContactInfoFields,
  ClinicalNotesField
};
