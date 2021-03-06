// Import
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  // Find all products
  // Be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include:[
        {
          model: Tag,
          through: { model: ProductTag, attributes: [] },
          attributes: ['tag_name']
        }]
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  // Find a single product by its `id`
  // Be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['category_name']},
        { model: Tag,          
          through: { model: ProductTag, attributes: [] },
          attributes: ['tag_name'] 
        }
      ]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product was found with that ID!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // If there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagsIdArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagsIdArray);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagsIdArray) => res.status(200).json(productTagsIdArray))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
router.put('/:id', (req, res) => {

  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })

    .then((productTagsIdArray) => {
      // Get list of current tag_ids
      const productTagIds = productTagsIdArray.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTagsIdArray
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })

    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {

  // Delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product was found with that ID!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export
module.exports = router;
