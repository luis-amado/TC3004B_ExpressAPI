import { Router } from 'express';
import {
  getItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../controllers/items.controller.js';

const router = Router();

router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.post('/items', postItem);
router.put('/items/:id', putItem);
router.delete('/items/:id', deleteItem);

export default router;
