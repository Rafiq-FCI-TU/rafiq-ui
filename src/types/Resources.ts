import type { User } from "../contexts/AuthContext";

export interface ResourcesCard {
  id: number;
  title: string;
  link: string;
  description: string;
  createdAt: string;
  tags: string[];
  author: Author;
}
export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface FormValues {
  title: string;
  link: string;
  description: string;
  tags: string[];
}
export interface CreateResourceFormProps {
  onCreate: (values: FormValues) => Promise<void>;
}
export interface EditResourceFormProps {
  resource: ResourcesCard;
  onSave: (resourceId: number, values: FormValues) => void;
  onCancel: () => void;
}
export interface ResourceCardProps {
  resource: ResourcesCard;
  onDelete: (resourceId: number) => void;
  onEdit: (resourceId: number, values: FormValues) => void;
  currentUser: User | null;
}
