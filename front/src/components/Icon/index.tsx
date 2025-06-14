import type { JSX } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ArrowClockwiseIcon,
  type IconProps as PhosphorIconProps,
} from '@phosphor-icons/react';
import type { IconColorType, IconNameType, IconProps } from '../../@types';

export function Icon(props: IconProps) {
  const { name, color = 'primary' } = props;

  const colors: Record<IconColorType, string> = {
    success: '#22c55e',
    error: '#ef4444',
    neutral: '#d4d4d4',
    secondary: '#171717',
    primary: '#f5f5f5',
  };

  const commonIconProps: PhosphorIconProps = {
    size: 24,
    color: colors[color],
  };

  const icons: Record<IconNameType, JSX.Element> = {
    pencil: <PencilIcon {...commonIconProps} />,
    trash: <TrashIcon {...commonIconProps} />,
    check: <CheckIcon {...commonIconProps} />,
    'arrow-clockwise': <ArrowClockwiseIcon {...commonIconProps} />,
  };

  return icons[name];
}
