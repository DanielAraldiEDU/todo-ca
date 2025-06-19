export const environments = {
  PORT: process.env.PORT || 3000,
  contactPoints: [process.env.HOST || 'localhost'],
  localDataCenter: process.env.DATA_CENTER,
  keySpace: process.env.KEYSPACE,
};
