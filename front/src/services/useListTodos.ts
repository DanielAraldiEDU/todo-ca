import { useQuery } from '@tanstack/react-query';

import type { TodoModelProps } from '../@types';
import { api } from '../config';

export function useListTodos() {
  async function fetch() {
    const response = await api.get<TodoModelProps[]>('/todos');
    return response.data;
  }

  return useQuery({
    queryKey: ['todos'],
    queryFn: fetch,
    placeholderData: data => data,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialData: [],
  });
}
