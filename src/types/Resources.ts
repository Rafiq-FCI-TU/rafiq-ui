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
