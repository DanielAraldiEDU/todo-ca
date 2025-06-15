import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { type TodoDtoProps } from '../../@types';
import { Input, IconButton } from '../';

export type TodoCardVariantType = 'add' | 'edit';

export interface TodoCardProps {
  variant: TodoCardVariantType;
  id?: string;
  title?: string;
  annotations?: string;
}

export function TodoCard(props: TodoCardProps) {
  const { variant, id = '', title = '', annotations = '' } = props;

  const isEdit = useMemo(() => variant === 'edit', [variant]);

  const [isReadOnly, setIsReadOnly] = useState<boolean>(isEdit);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoDtoProps>({} as TodoDtoProps);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEditing) {
      if (!isEdit) setTodo({ id: '', title: '', annotations: '' });
      setIsReadOnly(isEdit);
      setIsEditing(false);
    }
  }

  function onEditing() {
    if (isEditing) {
      setTodo({ id, title, annotations });
      setIsReadOnly(true);
      setIsEditing(false);
    } else {
      setIsReadOnly(false);
      setIsEditing(true);
    }
  }

  useEffect(() => {
    setTodo({ id, title, annotations });
  }, [id, title, annotations, isEdit]);

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col w-full h-auto p-8 gap-10 bg-neutral-800 ring-1 ring-neutral-500 rounded-2xl'
    >
      <div className='flex flex-row w-full h-auto items-start gap-5'>
        <Input
          value={todo.title}
          variant='text'
          // disabled - TODO: Only when a request is in progress
          readOnly={isReadOnly}
          onChange={text => setTodo({ ...todo, title: text })}
        />

        <div className='flex flex-row items-center gap-3'>
          {isEdit ? (
            <>
              <IconButton
                variant={isEditing ? 'go-back' : 'edit'}
                // disabled - TODO: Only when a request is in progress
                onClick={onEditing}
              />

              <IconButton
                variant={isEditing ? 'save' : 'remove'}
                // disabled - TODO: Only when a request is in progress
              />
            </>
          ) : (
            <IconButton
              variant='save'
              // disabled - TODO: Only when a request is in progress
            />
          )}
        </div>
      </div>

      <Input
        value={todo.annotations}
        variant='textarea'
        // disabled - TODO: Only when a request is in progress
        readOnly={isReadOnly}
        onChange={text => setTodo({ ...todo, annotations: text })}
      />
    </form>
  );
}
