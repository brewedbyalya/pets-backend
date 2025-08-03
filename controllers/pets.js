const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// Routes

// get
router.get('/', async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.json(foundPets);
} catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// post
router.post('/', async (req,res) => {
   try {
    const createdPet = await Pet.create(req.body)
    res.json(createdPet); }
    catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;
