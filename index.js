import 'dotenv/config.js';

import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';
import items2Routes from './routes/items2.routes.js';
import loginRoutes from './routes/login.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './utils/mongodb.js';

const app = express();

connectDB();

const PORT = 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items2Routes);
app.use(loginRoutes);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
