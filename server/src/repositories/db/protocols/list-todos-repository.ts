import { TodoModel } from '../../../domain';

export interface ListTodosRepository {
  list: () => Promise<ListTodosRepository.Result>;
}

export namespace ListTodosRepository {
  export type Result = Promise<TodoModel[]>;
}
