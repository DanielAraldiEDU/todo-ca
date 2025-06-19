export interface TodoModelProps {
  id: string;
  title: string;
  annotations: string;
  createdAt: Date;
  updatedAt: Date | null;
}
