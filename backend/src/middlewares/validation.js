function validateCaterer(req, res, next) {
  const errors = [];
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and must be a non-empty string.');
  }
  if (!location || typeof location !== 'string' || location.trim() === '') {
    errors.push('location is required and must be a non-empty string.');
  }
  if (pricePerPlate === undefined || pricePerPlate === null) {
    errors.push('pricePerPlate is required.');
  } else if (typeof pricePerPlate !== 'number' || pricePerPlate <= 0) {
    errors.push('pricePerPlate must be a positive number.');
  }
  if (!cuisines) {
    errors.push('cuisines is required.');
  } else if (!Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push('cuisines must be a non-empty array of strings.');
  } else if (cuisines.some((c) => typeof c !== 'string' || c.trim() === '')) {
    errors.push('Each item in cuisines must be a non-empty string.');
  }
  if (rating === undefined || rating === null) {
    errors.push('rating is required.');
  } else if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    errors.push('rating must be a number between 1 and 5.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = { validateCaterer };
