import type { ChangeEvent } from 'react';
import type { InputProps } from '../../@types';

export function Input(props: InputProps) {
  const { variant = 'text', onChange, ...rest } = props;

  const isText = variant === 'text';
  const isTextarea = variant === 'textarea';

  function onChangeText(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    onChange?.(event.target.value);
  }

  return (
    <>
      {isText && (
        <input
          required
          placeholder='Título'
          type='text'
          className='flex w-full h-14 !px-4 !py-1 border-2 border-neutral-100 rounded-lg outline-none text-xl text-neutral-100 shadow-neutral-100 shadow-sm hover:opacity-95 hover:read-only:opacity-100 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80 placeholder:text-neutral-500 read-only:h-11 read-only:border-none read-only:shadow-none read-only:text-neutral-300'
          onChange={onChangeText}
          min={1}
          minLength={1}
          {...rest}
        />
      )}

      {isTextarea && (
        <textarea
          required
          placeholder='Anotações'
          rows={5}
          minLength={1}
          className='flex w-full h-24 min-h-20 max-h-96 !p-4 border-2 border-neutral-100 rounded-lg outline-none text-xl text-neutral-100 shadow-neutral-100 shadow-sm hover:opacity-95 hover:read-only:opacity-100 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80 placeholder:text-neutral-500 read-only:h-16 read-only:min-h-16 read-only:border-none read-only:shadow-none read-only:text-neutral-300 read-only:resize-none'
          onChange={onChangeText}
          {...rest}
        />
      )}
    </>
  );
}
