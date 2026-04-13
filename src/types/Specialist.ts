export interface SpecialistCard {
  id: string;
  fullname: string;
  specialty: string;
  rating: number;
  experienceYears: number;
  bio: string;
  imageUrl: string;
}

export interface SpecialistDetails extends SpecialistCard {
  education: string[];
  specializations: string[];
}

export interface SpecialistApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    credentials: string;
    specialty: string;
    organization: string;
    professionalBio: string;
    gender: string;
    patientsCount: number;
  };
}
