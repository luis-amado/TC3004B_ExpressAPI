import { Router } from 'express';
import {
  getItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../controllers/items2.controller.js';

const router = Router();

router.get('/items2', getItems);
router.get('/items2/:id', getItemById);
router.post('/items2', postItem);
router.put('/items2/:id', putItem);
router.delete('/items2/:id', deleteItem);

export default router;
