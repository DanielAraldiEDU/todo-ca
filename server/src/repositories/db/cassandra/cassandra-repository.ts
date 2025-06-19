import { v4 } from 'uuid';
import { CassandraHelper } from './cassandra-helper';
import {
  ListTodosRepository,
  AddTodoRepository,
  DeleteTodoRepository,
  FindTodoRepository,
  UpdateTodoRepository,
} from '../';
import { TodoModel } from '../../../domain';

export class CassandraRepository
  implements
    ListTodosRepository,
    AddTodoRepository,
    DeleteTodoRepository,
    FindTodoRepository,
    UpdateTodoRepository
{
  async list(): Promise<ListTodosRepository.Result> {
    const query = 'SELECT * FROM todo';
    const result = await CassandraHelper.execute<TodoModel>(query);
    return result;
  }

  async add(
    params: AddTodoRepository.Params
  ): Promise<AddTodoRepository.Result> {
    const { annotation, title } = params;

    const id = v4();
    const createdAt = new Date();

    const query =
      'INSERT INTO todo (id, title, annotation, created_at) VALUES (?, ?, ?, ?)';
    await CassandraHelper.execute<TodoModel>(query, [
      id,
      title,
      annotation,
      createdAt,
    ]);

    return {
      id,
      createdAt,
      updatedAt: null,
      ...params,
    };
  }

  async find(id: string): Promise<FindTodoRepository.Result> {
    const query = 'SELECT * FROM todo WHERE id = ?';
    const result = await CassandraHelper.execute<TodoModel>(query, [id]);
    return result[0] || null;
  }

  async update(
    params: UpdateTodoRepository.Params
  ): Promise<UpdateTodoRepository.Result> {
    const { annotation, id, title } = params;

    const updatedAt = new Date();

    const query =
      'UPDATE todo SET title = ?, annotation = ?, updated_at = ? WHERE id = ?';
    await CassandraHelper.execute<TodoModel>(query, [
      title,
      annotation,
      updatedAt,
      id,
    ]);

    const result = await this.find(id);
    return result!;
  }

  async delete(id: string): Promise<DeleteTodoRepository.Result> {
    const query = 'DELETE FROM todo WHERE id = ?';
    await CassandraHelper.execute<TodoModel>(query, [id]);
  }
}
