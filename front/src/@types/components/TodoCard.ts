export type TodoCardVariantType = 'add' | 'edit';

export interface TodoCardProps {
  variant?: TodoCardVariantType;
  title: string;
  annotations: string;
}
