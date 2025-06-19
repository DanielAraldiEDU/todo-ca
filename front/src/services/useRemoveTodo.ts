import { useMutation } from '@tanstack/react-query';
import { api } from '../config';
import { queryClient } from '../main';

export function useRemoveTodo() {
  async function removeTodo(id: string) {
    await api.delete(`/todo/${id}`);
  }

  return useMutation({
    mutationKey: ['remove'],
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['todos'],
      });
    },
  });
}
