import 'dotenv/config';

import express, { json } from 'express';
import { Client } from 'cassandra-driver';
import cors from 'cors';
import helmet from 'helmet';
import { v4 } from 'uuid';
import { created, noContent, ok, serverError } from './helpers';
import { RequiredFieldValidation, ValidationComposite } from './validators';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use(helmet());

const client = new Client({
  contactPoints: [process.env.HOST || 'localhost'],
  localDataCenter: process.env.DATA_CENTER,
  keyspace: process.env.KEYSPACE,
});

app.get('/todos', async (_, res) => {
  try {
    const query = 'SELECT * FROM todo';
    const result = await client.execute(query);
    res.json(ok(result.rows));
  } catch (error) {
    res.status(500).json(serverError(error));
  }
});

app.post('/todo', async (req, res) => {
  try {
    const { title, annotation } = req.body;

    const validations = new ValidationComposite([
      new RequiredFieldValidation('title'),
      new RequiredFieldValidation('annotation'),
    ]);

    const error = validations.validate(req.body);
    if (error) res.status(400).json(error);

    const query = `INSERT INTO todo (id, title, annotation, created_at) VALUES (?, ?, ?, ?)`;
    const id = v4();
    const createdAt = new Date();

    await client.execute(query, [id, title, annotation, createdAt]);
    res.status(201).json(created({ id, title, annotation, createdAt }));
  } catch (error) {
    res.status(500).json(serverError(error));
  }
});

app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, annotation } = req.body;

    const validations = new ValidationComposite([
      new RequiredFieldValidation('id'),
      new RequiredFieldValidation('title'),
      new RequiredFieldValidation('annotation'),
    ]);

    const error = validations.validate({ ...req.body, ...req.params });
    if (error) res.status(400).json(error);

    const query = `UPDATE todo SET title = ?, annotation = ?, updated_at = ? WHERE id = ?`;
    const updatedAt = new Date();

    await client.execute(query, [title, annotation, updatedAt, id]);
    res.status(200).json(ok({ id, title, annotation, updatedAt }));
  } catch (error) {
    res.status(500).json(serverError(error));
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const validations = new ValidationComposite([
      new RequiredFieldValidation('id'),
    ]);

    const error = validations.validate(req.params);
    if (error) res.status(400).json(error);

    const query = `DELETE FROM todo WHERE id = ?`;
    await client.execute(query, [id]);

    res.status(204).json(noContent());
  } catch (error) {
    res.status(500).json(serverError(error));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
