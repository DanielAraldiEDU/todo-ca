export interface TodoModelProps {
  id: string;
  title: string;
  annotation: string;
  createdAt: Date;
  updatedAt: Date | null;
}
