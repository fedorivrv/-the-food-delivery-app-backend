import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  searchOrders,
} from '../controllers/orderController';
import { validate } from '../middleware/validate';
import { orderSchema } from '../schemas/orderSchema';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', validate(orderSchema), createOrder);
router.get('/', protect, getAllOrders);
router.get('/search', searchOrders);

export default router;