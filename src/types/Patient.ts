export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  totalScore: number;
  familyProfileId: string;
  assessmentId: number;
}
export interface PatientCard {
  patientId: number;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  totalScore: number;
  assignedAt: string;
  familyEmail: string;
}
