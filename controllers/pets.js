const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// Routes

// get
router.get('/', async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).res.json(foundPets);
} catch (err) {
     res.json({ msg: err.message });
  }
});

// post
router.post('/', async (req,res) => {
   try {
    const createdPet = await Pet.create(req.body);
    res.status(200).res.json(createdPet); }
    catch (err) {
   const message = {msg: err.message};
   res.json(message)
  }
});

// show one pet
router.get('/:petId', async (req, res)=> {
    try { const foundPet = await Pet.findById(req.params.petId);

        if (!foundPet){
            res.status(404);
            throw new Error('Pet not found.')
        }

        res.status(500).json(foundPet)
    }
    catch (err) {
        if (res.statusCode === 404) {
            res.json({msg: err.message})
        }
        res.json({msg: err.message})
}
}
)

// delete single pet
router.delete('/:petId', async (req, res)=> {
    try { 
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);

    if (!deletedPet){
            res.status(404);
            throw new Error('Pet not found.')
        }

          res.status(200).json(deletedPet);
    }
    catch (err) {
        if (res.statusCode === 404) {
            res.json({msg: err.message})
        }
        res.json({msg: err.message})
}
}
)

// update
router.put('/:petId', async (req, res) => {
try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body,{new: true});

    if (updatedPet) {
        res.status(404)
        throw new Error('Pet not found.');
    }

    res.status(200).res.json(updatedPet);
}
catch (err) {
        if (res.statusCode === 404) {
            res.json({msg: err.message});
        }
        res.json({msg: err.message});
}
}
)


module.exports = router;