# Todo Ca

[![wakatime](https://wakatime.com/badge/user/920a7e43-2969-4212-82ff-1b375685ff58/project/0f374365-9f90-43ca-a238-26cf68bb1681.svg)](https://wakatime.com/badge/user/920a7e43-2969-4212-82ff-1b375685ff58/project/0f374365-9f90-43ca-a238-26cf68bb1681)

A simple todo list with cassandra database.

## Front

Install all dependencies running:

```sh
cd front
npm install # or npm i
```

Before, run front project executing:

```sh
npm run dev
```

## Back

Create database in cassandra using this script:

```sql
CREATE KEYSPACE IF NOT EXISTS system_todo
WITH REPLICATION = {
	'class': 'SimpleStrategy',
	'replication_factor': 1
};
USE system_todo;

CREATE TABLE todo (
   id UUID PRIMARY KEY,
   title TEXT,
   annotation TEXT,
   created_at TIMESTAMP,
   updated_at TIMESTAMP
);

DESCRIBE TABLES
```

Install all dependencies running:

```sh
cd server
npm install # or npm i
```

Before, run front project executing:

```sh
npm run dev
```
