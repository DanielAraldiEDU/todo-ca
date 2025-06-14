import { useState } from 'react';
import type {
  IconButtonProps,
  IconButtonVariantType,
  IconColorType,
  IconNameType,
} from '../../@types';
import { Icon } from '../Icon';

export function IconButton(props: IconButtonProps) {
  const { variant, disabled = false, onClick } = props;

  const [shouldConfirm, setShouldConfirm] = useState<boolean>(false);

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
    edit: 'neutral',
  };

  const titles: Record<IconButtonVariantType, string> = {
    'go-back': 'Voltar alterações',
    remove: shouldConfirm ? 'Confirmar exclusão' : 'Deletar',
    save: 'Salvar',
    edit: 'Editar',
  };

  const borderColors: Record<IconButtonVariantType, string> = {
    'go-back': 'border-neutral-200',
    remove: 'border-red-500',
    save: 'border-green-500',
    edit: 'border-neutral-300',
  };

  const shadows: Record<IconButtonVariantType, string> = {
    'go-back': 'shadow-neutral-200',
    remove: 'shadow-red-500',
    save: 'shadow-green-500',
    edit: 'shadow-neutral-300',
  };

  const backgroundColor =
    isRemove && shouldConfirm ? 'bg-red-500' : 'bg-transparent';

  return (
    <button
      type='button'
      title={titles[variant]}
      disabled={disabled}
      onClick={shouldConfirm ? onConfirm : onAction}
      className={`flex size-12 justify-center items-center border-2 ${borderColors[variant]} ${backgroundColor} outline-none rounded-lg cursor-pointer ${shadows[variant]} shadow-sm hover:opacity-95 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80`}
    >
      <Icon name={iconNames[variant]} color={iconColors[variant]} />
    </button>
  );
}
