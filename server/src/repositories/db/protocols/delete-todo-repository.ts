export interface DeleteTodoRepository {
  delete: (id: string) => Promise<DeleteTodoRepository.Result>;
}

export namespace DeleteTodoRepository {
  export type Result = void;
}
