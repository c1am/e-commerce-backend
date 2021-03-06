const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  // Find all categories
  // Be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
        include: [{ model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  // Find one category by its `id` value
  // Be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }] 
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  // Create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {

  // Update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  // Delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(
    {
      where: {
        id: req.params.id
      }
    });

    if(!categoryData){
      res.status(404).json({message: 'No category was found with that ID!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
