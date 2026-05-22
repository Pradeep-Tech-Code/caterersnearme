const { getCollection, ObjectId } = require('../db');

const Caterer = {

  async findAll() {
    const collection = getCollection();
    const docs = await collection.find({}).toArray();
    return docs.map(this.format);
  },

  async findById(id) {
    if (!ObjectId.isValid(id)) return null;
    const collection = getCollection();
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? this.format(doc) : null;
  },

  async create(data) {
    const collection = getCollection();
    const cleanData = {
      name: data.name.trim(),
      location: data.location.trim(),
      pricePerPlate: data.pricePerPlate,
      cuisines: data.cuisines.map((c) => c.trim()),
      rating: data.rating,
    };
    const result = await collection.insertOne(cleanData);
    const created = await collection.findOne({ _id: result.insertedId });
    return this.format(created);
  },

  format(doc) {
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
  },
};

module.exports = Caterer;
