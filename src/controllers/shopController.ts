import { Request, Response } from 'express';
import { Shop } from '../models/Shop';
import { Product } from '../models/Product';

export async function getAllShops(req: Request, res: Response): Promise<void> {
  try {
    const shops = await Shop.find().sort({ name: 1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shops', error });
  }
}

export async function getShopById(req: Request, res: Response): Promise<void> {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      res.status(404).json({ message: 'Shop not found' });
      return;
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shop', error });
  }
}

export async function getProductsByShop(req: Request, res: Response): Promise<void> {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      res.status(404).json({ message: 'Shop not found' });
      return;
    }
    const products = await Product.find({ shopId: req.params.id }).sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
}
