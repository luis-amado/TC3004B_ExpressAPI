import { Router } from 'express';
import {
  getItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
} from '../controllers/items.controller.js';
import { validateJWT } from '../utils/jwt.js';

const router = Router();

router.get('/items', validateJWT, getItems);
router.get('/items/:id', validateJWT, getItemById);
router.post('/items', validateJWT, postItem);
router.put('/items/:id', validateJWT, putItem);
router.delete('/items/:id', validateJWT, deleteItem);

export default router;
