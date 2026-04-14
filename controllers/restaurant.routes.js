const router = require('express').Router();
const verifyToken = require('../middleware/verify-token')
const Restaurant = require('../models/Restaurant');

// GET /restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('author');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// POST /restaurants
router.post('/', verifyToken, async (req, res) => {
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
    const foundRestaurant = await Restaurant.findById(req.params.restaurantId).populate('author');

    if (!foundRestaurant) {
      return res.status(404).json({ err: 'Restaurant not found.' });
    }

    res.json(foundRestaurant);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT /restaurants/:restaurantId
router.put('/:restaurantId', verifyToken, async (req, res) => {
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
router.delete('/:restaurantId', verifyToken, async (req, res) => {
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