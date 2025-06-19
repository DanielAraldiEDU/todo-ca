import { TodoModel } from '../../../domain';

export interface FindTodoRepository {
  find(id: string): Promise<FindTodoRepository.Result>;
}

export namespace FindTodoRepository {
  export type Result = TodoModel | null;
}
