import { TodoModel } from '../../../domain';

export interface AddTodoRepository {
  add: (params: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>;
}

export namespace AddTodoRepository {
  export type Params = {
    title: string;
    annotation: string;
  };

  export type Result = TodoModel;
}
