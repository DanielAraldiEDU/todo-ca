import 'dotenv/config';

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
