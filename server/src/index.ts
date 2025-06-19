import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { badRequest, created, noContent, ok, serverError } from './helpers';
import { RequiredFieldValidation, ValidationComposite } from './validators';
import {
  CassandraRepository,
  CassandraHelper,
} from './repositories/db/cassandra';
import { environments } from './config';
import { NotFoundError } from './errors';

const app = express();
const PORT = environments.PORT;

app.use(json());
app.use(cors());
app.use(helmet());

app.get('/todos', async (_, res) => {
  try {
    const cassandraRepository = new CassandraRepository();
    const result = await cassandraRepository.list();

    res.json(ok(result));
  } catch (error) {
    res.status(500).json(serverError(error as Error));
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
    if (error) {
      res.status(400).json(badRequest(error));
      return;
    }

    const cassandraRepository = new CassandraRepository();
    const result = await cassandraRepository.add({
      title,
      annotation,
    });

    res.status(201).json(created(result));
  } catch (error) {
    res.status(500).json(serverError(error as Error));
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
    if (error) {
      res.status(400).json(badRequest(error));
      return;
    }

    const cassandraRepository = new CassandraRepository();

    const todoAlreadyExists = await cassandraRepository.find(id);
    if (!todoAlreadyExists) {
      res.status(400).json(badRequest(new NotFoundError(id)));
      return;
    }

    const result = await cassandraRepository.update({
      id,
      title,
      annotation,
    });

    res.status(200).json(ok(result));
  } catch (error) {
    console.log(error);
    res.status(500).json(serverError(error as Error));
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const validations = new ValidationComposite([
      new RequiredFieldValidation('id'),
    ]);

    const error = validations.validate(req.params);
    if (error) {
      res.status(400).json(badRequest(error));
      return;
    }

    const cassandraRepository = new CassandraRepository();
    const todoAlreadyExists = await cassandraRepository.find(id);
    if (!todoAlreadyExists) {
      res.status(400).json(badRequest(new NotFoundError(id)));
      return;
    }

    await cassandraRepository.delete(id);

    res.status(204).json(noContent());
  } catch (error) {
    res.status(500).json(serverError(error as Error));
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
