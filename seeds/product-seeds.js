const { Product } = require('../models');

// Sample data
const productData = [
  {
    product_name: 'T-Shirt',
    price: 16.99,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'Jeans',
    price: 49.00,
    stock: 63,
    category_id: 2,
  },
  {
    product_name: 'DVD Player',
    price: 32.99,
    stock: 19,
    category_id: 3,
  },
  {
    product_name: 'Scarf',
    price: 18.99,
    stock: 89,
    category_id: 4,
  },
  {
    product_name: 'Sneakers',
    price: 59.99,
    stock: 22,
    category_id: 5,
  },
  {
    product_name: 'Sweater',
    price: 24.99,
    stock: 72,
    category_id: 1,
  },
  {
    product_name: 'Cargo Pants',
    price: 39.00,
    stock: 78,
    category_id: 2,
  },
  {
    product_name: 'CD Player',
    price: 29.99,
    stock: 17,
    category_id: 3,
  },
  {
    product_name: 'Sunglasses',
    price: 29.99,
    stock: 11,
    category_id: 4,
  },
  {
    product_name: 'Sandals',
    price: 37.99,
    stock: 98,
    category_id: 5,
  },
  {
    product_name: 'Necklace',
    price: 68.99,
    stock: 9,
    category_id: 4,
  },
  {
    product_name: 'Slippers',
    price: 19.99,
    stock: 99,
    category_id: 5,
  },
];

// Populate
const seedProducts = () => Product.bulkCreate(productData);

// Export
module.exports = seedProducts;
