const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Punto 1
 
 router.get('/punto1', async (req, res) => {
  try {
    let var1 = {pais: "Colombia", publicados:{$gt:20}};
    let var2 = {nombre:1, apellido:1, _id:0};
    const authors = await Author.find(var1, var2);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Punto2
 
router.get('/punto2', async (req, res) => {
  try {
    let var1 = {apellido: null};
    let var2 = {nombre:1, _id:0};
    const authors = await Author.find(var1, var2);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Punto3
 
router.get('/punto3', async (req, res) => {
  try {
    let var1 ={$or:[{publicados:{$lt:20}},{pais: "Argentina"}]};
    let var2 = {apellido:1, _id:0};
    const authors = await Author.find(var1, var2);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
