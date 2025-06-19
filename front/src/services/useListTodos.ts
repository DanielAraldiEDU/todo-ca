import { useQuery } from '@tanstack/react-query';

import type { ResponseProps, TodoModelProps } from '../@types';
import { api } from '../config';
import { parseTodosToDTO } from '../helpers';

export function useListTodos() {
  async function fetch() {
    const response = await api.get<ResponseProps<TodoModelProps[]>>('/todos');
    return parseTodosToDTO(response.data.body);
  }

  return useQuery({
    queryKey: ['todos'],
    queryFn: fetch,
    placeholderData: data => data,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
