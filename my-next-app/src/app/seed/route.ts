import postgres from 'postgres';
import { createProduct } from '../../../lib/actions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


type SeedProduct = {
  category_id: number;
  name: string;
  artisan: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  onSale: boolean;
  imageUrl: string;
  featured: boolean;
};

const products: SeedProduct[] = [
  {
    category_id: 1,
    name: 'Hand-Thrown Ceramic Vase',
    artisan: 'by Sarah Chen',
    rating: 4.9,
    reviews: 127,
    price: 89,
    originalPrice: 120,
    onSale: true,
    imageUrl: '/items/vase.jpg',
    featured: true
  },
  {
    category_id: 2,
    name: 'Sterling Silver Pendant Necklace',
    artisan: 'by Marcus Rivera',
    rating: 5,
    reviews: 89,
    price: 145,
    onSale: false,
    imageUrl: '/items/jewelry.jpg',
    featured: true
  },
  {
    category_id: 3,
    name: 'Handwoven Wool Throw Blanket',
    artisan: 'by Emma Thompson',
    rating: 4.8,
    reviews: 203,
    price: 198,
    onSale: false,
    imageUrl: '/items/textiles.jpg',
    featured: true
  },
  {
    category_id: 4,
    name: 'Reclaimed Wood Coffee Table',
    artisan: 'by David Park',
    rating: 4.9,
    reviews: 76,
    price: 425,
    onSale: false,
    imageUrl: '/items/table.jpg',
    featured: true
  },
  {
    category_id: 6,
    name: 'Blown Glass Vase',
    artisan: 'by Laura Kim',
    rating: 4.7,
    reviews: 64,
    price: 120,
    originalPrice: 150,
    onSale: true,
    imageUrl: '/items/glass-vase.jpg',
    featured: false
  },
  {
    category_id: 5,
    name: 'Hand-Forged Iron Candle Holder',
    artisan: 'by Anthony Garcia',
    rating: 4.8,
    reviews: 98,
    price: 85,
    onSale: false,
    imageUrl: '/items/candle-holder.jpg',
    featured: false
  },
  {
    category_id: 1,
    name: 'Glazed Ceramic Bowl Set',
    artisan: 'by Laura Kim',
    rating: 4.7,
    reviews: 64,
    price: 59,
    originalPrice: 80,
    onSale: true,
    imageUrl: '/items/bowl.jpg',
    featured: false
  },
  {
    category_id: 2,
    name: 'Handcrafted Beaded Bracelet',
    artisan: 'by Anthony Garcia',
    rating: 4.6,
    reviews: 112,
    price: 75,
    onSale: false,
    imageUrl: '/items/bracelet.jpg',
    featured: false
  },
  {
    category_id: 3,
    name: 'Cotton Embroidered Pillow Cover',
    artisan: 'by Sophia Lee',
    rating: 4.9,
    reviews: 58,
    price: 35,
    onSale: true,
    imageUrl: '/items/pillow.jpg',
    featured: false
  },
  {
    category_id: 4,
    name: 'Handcrafted Wooden Cutting Board',
    artisan: 'by Michael Nguyen',
    rating: 5,
    reviews: 97,
    price: 55,
    onSale: false,
    imageUrl: '/items/cutting-board.jpg',
    featured: false
  }
];
async function seedProducts() {
  await sql`DROP TABLE IF EXISTS products`;
  await sql`CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    artisan VARCHAR(100) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    reviews INT NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    original_price DECIMAL(7,2),
    on_sale BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(300) NOT NULL,
    featured BOOLEAN DEFAULT FALSE
  )`;

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return createProduct(product);
    })
  );
  return insertedProducts;
}

async function seedUsers() {
  
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProducts()
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
