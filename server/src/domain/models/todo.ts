export interface TodoModel {
  id: string;
  title: string;
  annotation: string;
  createdAt: Date;
  updatedAt: Date | null;
}
