import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { created, noContent, ok, serverError } from './helpers';
import { RequiredFieldValidation, ValidationComposite } from './validators';
import {
  CassandraRepository,
  CassandraHelper,
} from './repositories/db/cassandra';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use(helmet());

app.get('/todos', async (_, res) => {
  try {
    const cassandraRepository = new CassandraRepository();
    const result = await cassandraRepository.list();

    res.json(ok(result));
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

    const cassandraRepository = new CassandraRepository();
    const result = await cassandraRepository.create({
      title,
      annotation,
    });

    res.status(201).json(created(result));
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

    const cassandraRepository = new CassandraRepository();
    const result = await cassandraRepository.update(id, {
      title,
      annotation,
    });

    res.status(200).json(ok(result));
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

    const cassandraRepository = new CassandraRepository();
    await cassandraRepository.delete(id);

    res.status(204).json(noContent());
  } catch (error) {
    res.status(500).json(serverError(error));
  }
});

app.listen(PORT, () => {
  CassandraHelper.connect();

  if (CassandraHelper.isConnected()) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    throw new Error('Failed to connect to Cassandra');
  }
});
