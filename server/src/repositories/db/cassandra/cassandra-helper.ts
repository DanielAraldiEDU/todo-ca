import { ArrayOrObject, Client, types } from 'cassandra-driver';
import { environments } from '../../../config';

export const CassandraHelper = {
  client: null as Client | null,

  map<T>(resultSet: types.ResultSet): T[] {
    return (resultSet.rows as T[]) || [];
  },

  connect(): void {
    if (this.isConnected()) return;
    this.client = new Client({
      contactPoints: environments.contactPoints,
      localDataCenter: environments.localDataCenter,
      keyspace: environments.keySpace,
    });
  },

  isConnected(): boolean {
    return !!this.client;
  },

  async disconnect(): Promise<void> {
    if (this.isConnected()) await this.client!.shutdown();
  },

  async execute<T>(query: string, params?: ArrayOrObject): Promise<T[]> {
    if (!this.isConnected()) {
      throw new Error('Cassandra client is not connected');
    }
    const result = await this.client!.execute(query, params);
    return this.map(result);
  },
};
