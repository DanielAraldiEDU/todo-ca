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
  const isSave = variant === 'save';

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

  const ringColors: Record<IconButtonVariantType, string> = {
    'go-back': 'ring-neutral-200',
    remove: 'ring-red-500',
    save: 'ring-green-500',
    edit: 'ring-neutral-300',
  };

  const backgroundColor =
    isRemove && shouldConfirm ? 'bg-red-500' : 'bg-transparent';
  const buttonType = isSave ? 'submit' : 'button';

  return (
    <button
      type={buttonType}
      title={titles[variant]}
      disabled={disabled}
      onClick={shouldConfirm ? onConfirm : onAction}
      className={`flex size-12 justify-center items-center ${backgroundColor} outline-none ring-1 ${ringColors[variant]} rounded-lg cursor-pointer focus:ring-2 focus-within:right-2 hover:opacity-90 hover:disabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-80`}
    >
      <Icon name={iconNames[variant]} color={iconColors[variant]} />
    </button>
  );
}
