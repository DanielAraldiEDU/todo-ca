export type IconButtonVariantType = 'go-back' | 'remove' | 'save' | 'edit';

export interface IconButtonProps {
  variant: IconButtonVariantType;
  loading?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
}
