import 'dotenv/config.js';

import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();

const PORT = 8000;

app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoutes);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
