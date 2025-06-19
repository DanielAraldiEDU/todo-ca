import { ArrayOrObject, Client } from 'cassandra-driver';

export const CassandraHelper = {
  client: null,

  connect(): void {
    if (this.isConnected()) return;

    this.client = new Client({
      contactPoints: [process.env.HOST || 'localhost'],
      localDataCenter: process.env.DATA_CENTER,
      keyspace: process.env.KEYSPACE,
    });
  },

  isConnected(): boolean {
    return !!this.client;
  },

  async disconnect(): Promise<void> {
    if (this.isConnected()) await this.client.shutdown();
  },

  async execute(query: string, params?: ArrayOrObject): Promise<any> {
    if (!this.isConnected()) {
      throw new Error('Cassandra client is not connected');
    }

    return await this.client.execute(query, params);
  },
};
