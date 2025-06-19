import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import { toast } from 'sonner';
import { type TodoCardProps, type TodoDTOProps } from '../../@types';
import { Input, IconButton } from '../';
import { useAddTodo } from '../../services';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoDTOProps>({} as TodoDTOProps);

  const { isPending: isCreated, mutateAsync: create } = useAddTodo();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { title, annotation } = todo;

    if (!title.trim() && !annotation.trim()) {
      toast.error('Título e anotação não podem estar vazios.');
      return;
    }

    if (isEditing) {
      if (!isEdit) {
        setTodo({ id: '', title: '', annotation: '', updatedAt: null });
      }
      setIsReadOnly(isEdit);
      setIsEditing(false);
    } else {
      const result = await create(todo);
      setTodo(result);
    }
  }

  const onEditing = useCallback(() => {
    if (isEditing) {
      setTodo({ id, title, annotation, updatedAt });
      setIsReadOnly(true);
      setIsEditing(false);
    } else {
      setIsReadOnly(false);
      setIsEditing(true);
    }
  }, [isEditing, id, title, annotation, updatedAt]);

  const renderButtons = useMemo(
    () =>
      isEdit ? (
        <>
          <IconButton
            variant={isEditing ? 'go-back' : 'edit'}
            disabled={isCreated}
            onClick={onEditing}
          />

          <IconButton
            variant={isEditing ? 'save' : 'remove'}
            disabled={isCreated}
          />
        </>
      ) : (
        <IconButton variant='save' disabled={isCreated} loading={isCreated} />
      ),
    [isEdit, isEditing, isCreated, onEditing]
  );

  useEffect(() => {
    setTodo({ id, title, annotation, updatedAt });
  }, [id, title, annotation, updatedAt, isEdit]);

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col w-full h-auto p-8 gap-10 bg-neutral-800 ring-1 ring-neutral-500 rounded-2xl'
    >
      <div className='flex flex-row w-full h-auto items-start gap-5'>
        <Input
          value={todo.title}
          variant='text'
          disabled={isCreated}
          readOnly={isReadOnly}
          onChange={text => setTodo({ ...todo, title: text })}
        />

        <div className='flex flex-row items-center gap-3'>{renderButtons}</div>
      </div>

      <Input
        value={todo.annotation}
        variant='textarea'
        disabled={isCreated}
        readOnly={isReadOnly}
        onChange={text => setTodo({ ...todo, annotation: text })}
      />
    </form>
  );
}
