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
