const express = require('express');
const Example = require('../models/Example');
const router = express.Router();


// GET /api/example
router.get('/', async (req, res, next) => {
  try {
    const items = await Example.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});


// POST /api/example
router.post('/', async (req, res, next) => {
  try {
    const newItem = new Example({ name: req.body.name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
