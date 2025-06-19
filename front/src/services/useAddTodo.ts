import { useMutation } from '@tanstack/react-query';
import type { ResponseProps, TodoDTOProps, TodoModelProps } from '../@types';
import { api } from '../config';
import { queryClient } from '../main';

export function useAddTodo() {
  async function addTodo(params: TodoDTOProps) {
    const { title, annotation } = params;

    const response = await api.post<ResponseProps<TodoModelProps>>('/todo', {
      title,
      annotation,
    });
    return response.data.body;
  }

  return useMutation({
    mutationKey: ['add'],
    mutationFn: addTodo,
    onSuccess: data => {
      queryClient.refetchQueries({
        queryKey: ['todos'],
      });
      return data;
    },
  });
}
