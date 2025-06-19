import { v4 } from 'uuid';
import { CassandraHelper } from './cassandra-helper';

export class CassandraRepository {
  async list() {
    const query = 'SELECT * FROM todo';
    const result = await CassandraHelper.execute(query);
    return result.rows;
  }

  async create(todo: { title: string; annotation: string }) {
    const query =
      'INSERT INTO todo (id, title, annotation, created_at) VALUES (?, ?, ?, ?)';

    const id = v4();
    const createdAt = new Date();

    await CassandraHelper.execute(query, [
      id,
      todo.title,
      todo.annotation,
      createdAt,
    ]);

    return {
      id,
      createdAt,
      ...todo,
    };
  }

  async update(id: string, todo: { title: string; annotation: string }) {
    const query =
      'UPDATE todo SET title = ?, annotation = ?, updated_at = ? WHERE id = ?';
    const updatedAt = new Date();

    await CassandraHelper.execute(query, [
      todo.title,
      todo.annotation,
      updatedAt,
      id,
    ]);

    return {
      id,
      updatedAt,
      ...todo,
    };
  }

  async delete(id: string) {
    const query = 'DELETE FROM todo WHERE id = ?';
    await CassandraHelper.execute(query, [id]);
  }
}
