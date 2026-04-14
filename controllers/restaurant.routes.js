const router = require('express').Router();
const Restaurant = require('../models/Restaurant');

// GET /restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ author: req.user._id });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST /restaurants
router.post('/', async (req, res) => {
  try {
    const createdRestaurant = await Restaurant.create({
      ...req.body,
      author: req.user._id,
    });

    res.status(201).json(createdRestaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET /restaurants/:restaurantId
router.get('/:restaurantId', async (req, res) => {
  try {
    const foundRestaurant = await Restaurant.findById(req.params.restaurantId);

    if (!foundRestaurant) {
      return res.status(404).json({ err: 'Restaurant not found.' });
    }

    if (foundRestaurant.author.toString() !== req.user._id) {
      return res.status(403).json({ err: 'Forbidden.' });
    }

    res.json(foundRestaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT /restaurants/:restaurantId
router.put('/:restaurantId', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.restaurantId, author: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ err: 'Restaurant not found.' });
    }

    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE /restaurants/:restaurantId
router.delete('/:restaurantId', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: req.params.restaurantId,
      author: req.user._id,
    });

    if (!deletedRestaurant) {
      return res.status(404).json({ err: 'Restaurant not found.' });
    }

    res.json(deletedRestaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;