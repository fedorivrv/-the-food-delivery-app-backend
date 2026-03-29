import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  searchOrders,
} from '../controllers/orderController';
import { validate } from '../middleware/validate';
import { orderSchema } from '../schemas/orderSchema';

const router = Router();

router.post('/', validate(orderSchema), createOrder);
router.get('/', getAllOrders);
router.get('/search', searchOrders);

export default router;