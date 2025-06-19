import { useMutation } from '@tanstack/react-query';
import { api } from '../config';
import { queryClient } from '../main';
import type { ResponseProps, TodoDTOProps, TodoModelProps } from '../@types';

export function useEditTodo() {
  async function editTodo(
    params: Omit<TodoDTOProps, 'createdAt' | 'updatedAt'>
  ) {
    const { id, ...data } = params;

    const response = await api.put<ResponseProps<TodoModelProps>>(
      `/todo/${id}`,
      data
    );
    return response.data.body;
  }

  return useMutation({
    mutationKey: ['edit'],
    mutationFn: editTodo,
    onSuccess: data => {
      queryClient.refetchQueries({
        queryKey: ['todos'],
      });
      return data;
    },
  });
}
