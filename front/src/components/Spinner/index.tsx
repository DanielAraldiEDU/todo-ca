import type {
  SpinnerColorType,
  SpinnerProps,
  SpinnerSizeType,
} from '../../@types';

export function Spinner(props: SpinnerProps) {
  const { color = 'primary', size = 'medium' } = props;

  const borderColors: Record<SpinnerColorType, string> = {
    primary: 'border-neutral-900',
    secondary: 'border-neutral-100',
    success: 'border-green-500',
  };

  const sizes: Record<SpinnerSizeType, string> = {
    medium: 'size-6',
    large: 'size-8',
  };

  return (
    <div className='flex justify-center'>
      <div
        className={`${sizes[size]} border-2 ${borderColors[color]} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}
