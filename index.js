import express from 'express';
import indexRoutes from './routes/index.routes.js';
const app = express();

const PORT = 8000;

app.use(indexRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}\nhttp://localhost:${PORT}`);
});
