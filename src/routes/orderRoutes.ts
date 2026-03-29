import { Router } from 'express';
import { createOrder, getAllOrders, searchOrders } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/search', searchOrders);

export default router;
