const filmService = require("./FilmService");
const collectionService = require("../collections/CollectionService");

const getFilm = async (_limit, _page) => {
  try {
    return await filmService.getFilm(_limit, _page);
  } catch (error) {
    throw error;
  }
};

const getFilmById = async (_id) => {
  try {
    return await filmService.getFilmById(_id);
  } catch (error) {
    throw error;
  }
};

const addFilm = async (
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  _id_collection,
  imageList
) => {
  try {
    const filmResult = await filmService.addFilm(
      filmName,
      trailerID,
      total_episode,
      list_category,
      synopsis,
      _id_collection,
      imageList
    );
    // console.log("Film ID: " + filmResult);
    const collectionResult = await collectionService.addFilm(filmResult);
    console.log("CollectionResult: " + collectionResult);
    return filmResult;
  } catch (error) {
    throw error;
  }
};

const updateFilmById = async (
  _id,
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  _id_collection,
  previous_id_collection,
  imageList
) => {
  try {
    console.log(
      "FilmController-PreviousCollectionID: " + previous_id_collection
    );
    const result = await filmService.updateFilmById(
      _id,
      filmName,
      trailerID,
      total_episode,
      list_category,
      synopsis,
      _id_collection,
      imageList
    );
    await collectionService.updateFilm(previous_id_collection, _id);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteFilm = async (filmID, collectionID) => {
  try {
    const resultFilm = await filmService.deleteFilm(filmID);
    const resultCollection = await collectionService.deleteFilm(
      filmID,
      collectionID
    );
    return resultCollection && resultFilm;
  } catch (error) {
    throw error;
  }
};

module.exports = { getFilm, addFilm, getFilmById, updateFilmById, deleteFilm };
