import type { JSX } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ArrowClockwiseIcon,
  type IconProps as PhosphorIconProps,
  NoteBlankIcon,
} from '@phosphor-icons/react';
import type {
  IconColorType,
  IconNameType,
  IconProps,
  IconSizeType,
} from '../../@types';

export function Icon(props: IconProps) {
  const { name, size = 'medium', color = 'primary' } = props;

  const colors: Record<IconColorType, string> = {
    primary: '#f5f5f5',
    secondary: '#171717',
    success: '#22c55e',
    error: '#ef4444',
  };

  const sizes: Record<IconSizeType, number> = {
    medium: 24,
    'xx-large': 64,
  };

  const commonIconProps: PhosphorIconProps = {
    size: sizes[size],
    color: colors[color],
  };

  const icons: Record<IconNameType, JSX.Element> = {
    pencil: <PencilIcon {...commonIconProps} />,
    trash: <TrashIcon {...commonIconProps} />,
    check: <CheckIcon {...commonIconProps} />,
    'arrow-clockwise': <ArrowClockwiseIcon {...commonIconProps} />,
    'note-blank': <NoteBlankIcon {...commonIconProps} />,
  };

  return icons[name];
}
