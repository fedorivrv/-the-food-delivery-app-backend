import { Request, Response } from 'express';
import { Shop } from '../models/Shop';
import { Product } from '../models/Product';

export async function getAllShops(req: Request, res: Response): Promise<void> {
  try {
    const { minRating, maxRating } = req.query;
    const filter: Record<string, unknown> = {};

    if (minRating !== undefined || maxRating !== undefined) {
      filter.rating = {};
      if (minRating !== undefined) (filter.rating as Record<string, number>).$gte = parseFloat(minRating as string);
      if (maxRating !== undefined) (filter.rating as Record<string, number>).$lte = parseFloat(maxRating as string);
    }

    const shops = await Shop.find(filter).sort({ name: 1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shops', error });
  }
}

export async function getShopById(req: Request, res: Response): Promise<void> {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) { res.status(404).json({ message: 'Shop not found' }); return; }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shop', error });
  }
}

export async function getProductsByShop(req: Request, res: Response): Promise<void> {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) { res.status(404).json({ message: 'Shop not found' }); return; }

    const { categories, sort, page, limit } = req.query;

    const filter: Record<string, unknown> = { shopId: req.params.id };

    if (categories) {
      const categoryList = (categories as string).split(',').map((c) => c.trim()).filter(Boolean);
      if (categoryList.length > 0) filter.category = { $in: categoryList };
    }

    let sortOption: Record<string, 1 | -1> = { name: 1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'name_asc') sortOption = { name: 1 };

    const pageNum = Math.max(1, parseInt((page as string) || '1', 10));
    const limitNum = Math.min(50, Math.max(1, parseInt((limit as string) || '8', 10)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: pageNum * limitNum < total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
}
