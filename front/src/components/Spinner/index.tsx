import type { SpinnerColorType, SpinnerProps } from '../../@types';

export function Spinner(props: SpinnerProps) {
  const { color = 'primary' } = props;

  const borderColors: Record<SpinnerColorType, string> = {
    primary: 'border-neutral-900',
    secondary: 'border-neutral-100',
    success: 'border-green-500',
  };

  return (
    <div className='flex justify-center'>
      <div
        className={`size-6 border-2 ${borderColors[color]} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}
