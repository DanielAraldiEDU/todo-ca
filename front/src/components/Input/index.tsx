import type { ChangeEvent } from 'react';
import type { InputProps } from '../../@types';

export function Input(props: InputProps) {
  const { variant = 'text', onChange, readOnly, value, ...rest } = props;

  const isText = variant === 'text';
  const isTextarea = variant === 'textarea';

  function onChangeText(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    onChange?.(event.target.value);
  }

  return (
    <>
      {isText &&
        (readOnly ? (
          <p className='flex w-full min-h-14 items-center p-4 text-xl text-neutral-300'>
            {value}
          </p>
        ) : (
          <input
            required
            placeholder='Título'
            type='text'
            className='flex w-full h-14 px-4 py-1 ring-1 ring-neutral-500 rounded-lg outline-none text-xl text-neutral-100 focus:ring-2 focus-within:right-2 hover:opacity-90 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80 placeholder:text-neutral-500'
            onChange={onChangeText}
            min={1}
            minLength={1}
            value={value}
            {...rest}
          />
        ))}

      {isTextarea &&
        (readOnly ? (
          <p className='flex w-full min-h-24 p-4 text-xl text-neutral-300'>
            {value}
          </p>
        ) : (
          <textarea
            required
            placeholder='Anotações'
            rows={5}
            minLength={1}
            className='flex w-full h-24 min-h-20 p-4 ring-1 ring-neutral-500 rounded-lg outline-none text-xl text-neutral-100 focus:ring-2 focus-within:right-2 hover:opacity-90 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80 disabled:resize-none placeholder:text-neutral-500'
            onChange={onChangeText}
            value={value}
            {...rest}
          />
        ))}
    </>
  );
}
