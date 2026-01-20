
console.log('Loading player route...');
let Player;
try {
  Player = require('../models/Player');
  console.log('Player model loaded successfully.');
} catch (err) {
  console.error('Error loading Player model:', err);
}

const express = require('express');
const router = express.Router();

// POST /api/player
router.post('/', async (req, res, next) => {
  try {
    const { name, averageScore } = req.body;
    const newPlayer = new Player({ name, averageScore });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    console.error('Error in POST /api/player:', err);
    next(err);
  }
});

// GET /api/player (optional, for testing)
router.get('/', async (req, res, next) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    console.error('Error in GET /api/player:', err);
    next(err);
  }
});

console.log('Player route loaded.');
module.exports = router;
