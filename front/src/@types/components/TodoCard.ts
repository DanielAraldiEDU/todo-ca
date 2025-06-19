export type TodoCardVariantType = 'add' | 'edit';

export interface TodoCardProps {
  variant: TodoCardVariantType;
  id?: string;
  title?: string;
  annotation?: string;
  updatedAt?: Date | null;
}
