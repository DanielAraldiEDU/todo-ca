export type InputVariantType = 'text' | 'textarea';

export interface InputProps {
  variant?: InputVariantType;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}
