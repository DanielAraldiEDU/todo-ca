export type TodoCardVariantType = 'add' | 'edit';

export interface TodoCardProps {
  variant: TodoCardVariantType;
  id?: string;
  title?: string;
  annotations?: string;
  updatedAt?: Date | null;
}
