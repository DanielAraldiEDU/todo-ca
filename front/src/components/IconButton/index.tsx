import { useEffect, useRef, useState } from 'react';
import type {
  IconButtonProps,
  IconButtonVariantType,
  IconColorType,
  IconNameType,
  SpinnerColorType,
} from '../../@types';
import { Icon, Spinner } from '../';
import { DURATION } from '../../config';

export function IconButton(props: IconButtonProps) {
  const { variant, loading = false, disabled = false, onClick } = props;

  const [shouldConfirm, setShouldConfirm] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isRemove = variant === 'remove';

  function onAction(): void {
    if (isRemove) setShouldConfirm(true);
    else onClick?.();
  }

  function onConfirm(): void {
    onClick?.();
    setShouldConfirm(false);
  }

  const iconNames: Record<IconButtonVariantType, IconNameType> = {
    'go-back': 'arrow-clockwise',
    remove: 'trash',
    save: 'check',
    edit: 'pencil',
  };

  const iconColors: Record<IconButtonVariantType, IconColorType> = {
    'go-back': 'primary',
    remove: shouldConfirm ? 'secondary' : 'error',
    save: 'success',
    edit: 'primary',
  };

  const titles: Record<IconButtonVariantType, string> = {
    'go-back': 'Voltar alterações',
    remove: shouldConfirm ? 'Confirmar exclusão' : 'Deletar',
    save: 'Salvar',
    edit: 'Editar',
  };

  const ringColors: Record<IconButtonVariantType, string> = {
    'go-back': 'ring-neutral-100',
    remove: 'ring-red-500',
    save: 'ring-green-500',
    edit: 'ring-neutral-100',
  };

  const spinnerColors: Record<IconButtonVariantType, SpinnerColorType> = {
    'go-back': 'secondary',
    remove: 'primary',
    save: 'success',
    edit: 'secondary',
  };

  const backgroundColor =
    isRemove && shouldConfirm ? 'bg-red-500' : 'bg-transparent';
  const shouldShowLoadingRemove = isRemove && loading && shouldConfirm;
  const shouldShowLoading = !isRemove && loading;

  useEffect(() => {
    let timeout: number | null = null;

    if (shouldConfirm) {
      timeout = setTimeout(() => {
        setShouldConfirm(false);
      }, DURATION);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [shouldConfirm]);

  return (
    <button
      ref={buttonRef}
      type='button'
      tabIndex={0}
      title={titles[variant]}
      disabled={disabled || loading}
      onClick={shouldConfirm ? onConfirm : onAction}
      className={`flex size-14 justify-center items-center ${backgroundColor} outline-none ring-1 ${ringColors[variant]} rounded-lg cursor-pointer focus:ring-2 focus-within:right-2 hover:opacity-90 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80`}
    >
      {shouldShowLoading || shouldShowLoadingRemove ? (
        <Spinner color={spinnerColors[variant]} />
      ) : (
        <Icon name={iconNames[variant]} color={iconColors[variant]} />
      )}
    </button>
  );
}
