export interface TodoModelProps {
  id: string;
  title: string;
  annotation: string;
  created_at: Date;
  updated_at: Date | null;
}
