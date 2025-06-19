import type { TodoDTOProps, TodoModelProps } from '../@types';

export function parseTodoToDTO(todo: TodoModelProps): TodoDTOProps {
  return {
    ...todo,
    updatedAt: todo.updated_at,
  };
}

export function parseTodosToDTO(todos: TodoModelProps[]): TodoDTOProps[] {
  return todos.map(parseTodoToDTO);
}
