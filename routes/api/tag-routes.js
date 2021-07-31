const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  // Find all tags
  // Be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
        include: [{ model: Product,
        through: { model: ProductTag, attributes: [] }
        }]
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {

  // Find a single tag by its `id`
  // Be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id,
    {
      include: [
        { 
          model: Product,
          through: ProductTag 
        }
      ]
    });

    if(!tagData){
      res.status(404).json({message: 'No tag was found with that ID!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {

  // Create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {

  // Update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag was found with that ID!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {

  // Delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag was found with that ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
