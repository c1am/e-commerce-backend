const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Tops',
  },
  {
    category_name: 'Bottoms',
  },
  {
    category_name: 'Electronics',
  },
  {
    category_name: 'Accessories',
  },
  {
    category_name: 'Footwear',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);


// Expoty
module.exports = seedCategories;
