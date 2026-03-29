import { Router } from 'express';
import { createOrder, getAllOrders, getOrdersByEmail } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/by-email/:email', getOrdersByEmail);

export default router;
