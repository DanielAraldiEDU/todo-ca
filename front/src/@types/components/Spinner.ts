export type SpinnerColorType = 'primary' | 'secondary' | 'success';
export type SpinnerSizeType = 'medium' | 'large';

export interface SpinnerProps {
  color?: SpinnerColorType;
  size?: SpinnerSizeType;
}
