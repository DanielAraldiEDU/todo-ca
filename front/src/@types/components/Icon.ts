export type IconNameType = 'pencil' | 'trash' | 'check' | 'arrow-clockwise';
export type IconColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'neutral';

export interface IconProps {
  name: IconNameType;
  color?: IconColorType;
}
