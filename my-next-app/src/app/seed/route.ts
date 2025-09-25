import postgres from 'postgres';
import { createProduct, getProducts } from '../lib/actions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const products = [
  {
    category: 'Pottery',
    name: 'Hand-Thrown Ceramic Vase',
    artisan: 'by Sarah Chen',
    rating: 4.9,
    reviews: 127,
    price: 89,
    originalPrice: 120,
    onSale: true,
    imageUrl: '/placeholder-images/vase.jpg',
    featured: true
  },
  {
    category: 'Jewelry',
    name: 'Sterling Silver Pendant...',
    artisan: 'by Marcus Rivera',
    rating: 5,
    reviews: 89,
    price: 145,
    onSale: false,
    imageUrl: '/placeholder-images/jewelry.jpg',
    featured: true
  },
  {
    category: 'Textiles',
    name: 'Handwoven Wool Throw...',
    artisan: 'by Emma Thompson',
    rating: 4.8,
    reviews: 203,
    price: 198,
    onSale: false,
    imageUrl: '/placeholder-images/textiles.jpg',
    featured: true
  },
  {
    category: 'Woodworking',
    name: 'Reclaimed Wood Coffee Table',
    artisan: 'by David Park',
    rating: 4.9,
    reviews: 76,
    price: 425,
    onSale: false,
    imageUrl: '/placeholder-images/table.jpg',
    featured: true
  },
];
async function seedProducts() {
  await sql`DROP TABLE IF EXISTS products`;
  await sql`CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
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
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
