const Caterer = require('../models/caterer');

const getCaterers = async (req, res, next) => {
  try {
    const caterers = await Caterer.findAll();
    res.status(200).json(caterers);
  } catch (err) {
    next(err);
  }
};

const getCatererById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caterer = await Caterer.findById(id);

    if (!caterer) {
      return res.status(404).json({ error: `Caterer with id "${id}" not found.` });
    }

    res.status(200).json(caterer);
  } catch (err) {
    next(err);
  }
};

const createCaterer = async (req, res, next) => {
  try {
    const newCaterer = await Caterer.create(req.body);
    res.status(201).json(newCaterer);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCaterers,
  getCatererById,
  createCaterer,
};
