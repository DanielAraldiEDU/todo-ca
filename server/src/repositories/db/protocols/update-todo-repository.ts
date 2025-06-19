import { TodoModel } from '../../../domain';

export interface UpdateTodoRepository {
  update: (
    params: UpdateTodoRepository.Params
  ) => Promise<UpdateTodoRepository.Result>;
}

export namespace UpdateTodoRepository {
  export type Params = Omit<TodoModel, 'createdAt' | 'updatedAt'>;

  export type Result = TodoModel;
}
