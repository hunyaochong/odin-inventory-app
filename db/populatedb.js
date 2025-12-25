const { Client } = require("pg");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const SQL = `
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  image_url VARCHAR(500),
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, description) VALUES
  ('Fresh Produce', 'Fresh fruits, vegetables, and salads'),
  ('Dairy & Eggs', 'Milk, cheese, yogurt, and fresh eggs'),
  ('Bakery & Bread', 'Freshly baked breads, pastries, and cakes');

INSERT INTO products (name, description, price, category_id, stock_quantity) VALUES
  ('Organic Bananas', 'Sweet and creamy organic bananas, perfect for snacking', 2.99, 1, 150),
  ('Cherry Tomatoes', 'Fresh cherry tomatoes, great for salads', 4.50, 1, 80),
  ('Baby Spinach', 'Tender baby spinach leaves, pre-washed', 3.75, 1, 60),
  ('Fresh Milk', 'Full cream fresh milk, 1 liter', 3.20, 2, 120),
  ('Greek Yogurt', 'Creamy Greek yogurt, plain 500g', 5.50, 2, 90),
  ('Free Range Eggs', 'Fresh free range eggs, 12 pack', 7.80, 2, 100),
  ('Sourdough Bread', 'Artisan sourdough bread, baked daily', 6.50, 3, 45),
  ('Croissants', 'Buttery French croissants, 4 pack', 8.90, 3, 35),
  ('Whole Wheat Bagels', 'Healthy whole wheat bagels, 6 pack', 5.20, 3, 50);
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();