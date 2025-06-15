export type IconNameType =
  | 'pencil'
  | 'trash'
  | 'check'
  | 'arrow-clockwise'
  | 'note-blank';
export type IconSizeType = 'medium' | 'xx-large';
export type IconColorType = 'primary' | 'secondary' | 'success' | 'error';

export interface IconProps {
  name: IconNameType;
  size?: IconSizeType;
  color?: IconColorType;
}
