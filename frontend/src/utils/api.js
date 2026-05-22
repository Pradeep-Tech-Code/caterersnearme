import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
});

/**
 * Fetch all caterers from the backend REST API
 * @returns {Promise<Array>} List of caterer objects
 */
export async function getCaterers() {
  const res = await API.get('/caterers');
  return res.data;
}

/**
 * Fetch a single caterer by ID
 * @param {string} id - The caterer ObjectId string
 * @returns {Promise<Object>} The caterer object
 */
export async function getCatererById(id) {
  const res = await API.get(`/caterers/${id}`);
  return res.data;
}

/**
 * Add a new caterer with validation
 * @param {Object} catererData - The caterer parameters
 * @returns {Promise<Object>} The created caterer object
 */
export async function createCaterer(catererData) {
  try {
    const res = await API.post('/caterers', catererData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data;
      throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Failed to create caterer');
    }
    throw err;
  }
}
