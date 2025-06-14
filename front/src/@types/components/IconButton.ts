export type IconButtonVariantType = 'go-back' | 'remove' | 'save' | 'edit';

export interface IconButtonProps {
  variant: IconButtonVariantType;
  disabled?: boolean;
  onClick?: VoidFunction;
}
