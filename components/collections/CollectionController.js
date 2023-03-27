const CollectionService = require("./CollectionService");

const addCollection = async (name) => {
  try {
    return await CollectionService.addCollection(name);
  } catch (error) {
    throw error;
  }
};

const getAllCollection = async () => {
  try {
    return await CollectionService.getAllCollection();
  } catch (error) {
    throw error;
  }
};

const addFilm = async (collectionID, filmID) => {
  try {
    return await CollectionService.addFilm(collectionID, filmID);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllCollection, addCollection, addFilm };
