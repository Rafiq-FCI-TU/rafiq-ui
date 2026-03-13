export interface Session {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  sequence: number;
  score: number;
  publishedAt: string;
  thumbnailUrl: string;
  specialistProfileId: string;
  specialistName?: string;
  notes?: string;
}

export interface Tab {
  name: "Upcoming Sessions" | "Available Sessions" | "Clinical Notes";
  active: boolean;
  icon: React.ReactNode;
  type: SessionType | "notes";
}

export type SessionType = "not-allowed" | "allowed";
