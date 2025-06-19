import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type TodoCardProps, type TodoDTOProps } from '../../@types';
import { Input, IconButton } from '../';
import { useAddTodo, useEditTodo, useRemoveTodo } from '../../services';
import { formatDate } from '../../utils';

export function TodoCard(props: TodoCardProps) {
  const {
    variant,
    id = '',
    title = '',
    annotation = '',
    updatedAt = null,
  } = props;

  const isEdit = useMemo(() => variant === 'edit', [variant]);

  const [isReadOnly, setIsReadOnly] = useState<boolean>(isEdit);
  const [isRevert, setIsRevert] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoDTOProps>({} as TodoDTOProps);

  const { isPending: isCreating, mutateAsync: create } = useAddTodo();
  const { isPending: isEditing, mutateAsync: edit } = useEditTodo();
  const { isPending: isRemoving, mutateAsync: remove } = useRemoveTodo();

  const isDisabledInput = isCreating || isRemoving || isEditing;

  const onSubmit = useCallback(async () => {
    const { title, annotation } = todo;

    if (!title.trim() || !annotation.trim()) {
      toast.error('Os campos de título e anotações não podem estar vazios.');
      return;
    }

    if (isRevert) {
      if (isEdit) {
        const result = await edit(todo);
        setTodo(result);
      } else {
        setTodo({ id: '', title: '', annotation: '', updatedAt: null });
      }

      setIsReadOnly(isEdit);
      setIsRevert(false);
    } else {
      await create(todo);
      setTodo({ id: '', title: '', annotation: '', updatedAt: null });
    }
  }, [todo, isRevert, isEdit, create, edit]);

  const onEditing = useCallback(() => {
    if (isRevert) {
      setTodo({ id, title, annotation, updatedAt });
      setIsReadOnly(true);
      setIsRevert(false);
    } else {
      setIsReadOnly(false);
      setIsRevert(true);
    }
  }, [isRevert, id, title, annotation, updatedAt]);

  const onRemove = useCallback(async () => {
    await remove(id);
  }, [remove, id]);

  const renderButtons = useMemo(
    () =>
      isEdit ? (
        <>
          <IconButton
            variant={isRevert ? 'go-back' : 'edit'}
            disabled={isRemoving || isEditing}
            loading={isEditing}
            onClick={onEditing}
          />

          <IconButton
            variant={isRevert ? 'save' : 'remove'}
            disabled={isRemoving || isEditing}
            loading={isRemoving}
            onClick={isRevert ? onSubmit : onRemove}
          />
        </>
      ) : (
        <IconButton
          variant='save'
          disabled={isCreating}
          loading={isCreating}
          onClick={onSubmit}
        />
      ),
    [
      isEdit,
      isRevert,
      isEditing,
      isCreating,
      isRemoving,
      onEditing,
      onRemove,
      onSubmit,
    ]
  );

  useEffect(() => {
    setTodo({ id, title, annotation, updatedAt });
  }, [id, title, annotation, updatedAt, isEdit]);

  return (
    <form className='relative flex flex-col w-full h-auto p-8 gap-10 bg-neutral-800 ring-1 ring-neutral-500 rounded-2xl'>
      <div className='flex flex-row w-full h-auto items-center gap-5'>
        <Input
          value={todo.title}
          variant='text'
          disabled={isDisabledInput}
          readOnly={isReadOnly}
          onChange={text => setTodo({ ...todo, title: text })}
        />

        <div className='flex flex-row items-center gap-3'>{renderButtons}</div>
      </div>

      <div className='flex flex-col w-full h-auto gap-5'>
        <Input
          value={todo.annotation}
          variant='textarea'
          disabled={isDisabledInput}
          readOnly={isReadOnly}
          onChange={text => setTodo({ ...todo, annotation: text })}
        />

        {updatedAt && (
          <div className='flex w-full px-4 justify-center'>
            <span className='text-xs text-neutral-300'>
              {formatDate(updatedAt)}
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
