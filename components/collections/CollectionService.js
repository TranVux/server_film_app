const FilmModel = require("../film/FilmModel");
const CollectionModel = require("./CollectionModel");

const addCollection = async (name) => {
  try {
    const allCollection = await getAllCollection();

    allCollection.map((collection) => {
      if (collection.name.toString() === name.toString()) return false;
    });

    CollectionModel.insertMany([
      {
        name: name,
      },
    ]);
  } catch (error) {
    console.log("addCollection: " + error);
  }
};

const addFilm = async (filmResult) => {
  try {
    const { _id, _id_collection } = filmResult;
    const result = await CollectionModel.findByIdAndUpdate(_id_collection, {
      $push: { films: _id },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("addFilm: " + error);
    return false;
  }
};

const updateFilm = async (previousCollectionID, film_id) => {
  try {
    const film = await FilmModel.findById(film_id);
    // console.log(
    //   "CollectionService-previousCollectionID: " + previousCollectionID
    // );
    // console.log("CollectionService-currentID: " + film._id_collection);
    let result;
    if (previousCollectionID.toString() !== film._id_collection.toString()) {
      await CollectionModel.findOneAndUpdate(
        { _id: previousCollectionID },
        { $pull: { films: film._id } }
      );

      result = await CollectionModel.findOneAndUpdate(
        { _id: film._id_collection },
        { $push: { films: film._id } }
      );
    }
    return result;
  } catch (error) {
    console.log("updateFilm " + error);
    return result;
  }
};

const getAllCollection = async () => {
  try {
    const collections = await CollectionModel.find();
    return collections;
  } catch (error) {
    console.log("getAllCollection: " + error);
  }
};

const deleteFilm = async (filmId, collectionID) => {
  try {
    const result = await CollectionModel.updateOne(
      { _id: collectionID },
      { $pull: { films: filmId } }
    );
    return result;
  } catch (error) {
    console.log("deleteFilmInCollection: " + error);
    return null;
  }
};

module.exports = {
  getAllCollection,
  addCollection,
  addFilm,
  updateFilm,
  deleteFilm,
};
