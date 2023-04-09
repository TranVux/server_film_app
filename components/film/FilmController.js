const filmService = require("./FilmService");
const collectionService = require("../collections/CollectionService");
const categoriesService = require("../categories/CategoriesService");

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
    const categoriesResult = await categoriesService.modifyFilmAmount(
      list_category.map((value) => value._id),
      1
    );
    console.log("CollectionResult: " + collectionResult);
    console.log("CategoriesResult: " + categoriesResult);
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
  previous_list_category,
  synopsis,
  _id_collection,
  previous_id_collection,
  imageList
) => {
  try {
    console.log(
      "FilmController-PreviousCollectionID: " + previous_id_collection
    );
    const [result, resultCollection, resultCategories] = await Promise.all([
      filmService.updateFilmById(
        _id,
        filmName,
        trailerID,
        total_episode,
        list_category,
        synopsis,
        _id_collection,
        imageList
      ),
      collectionService.updateFilm(previous_id_collection, _id),
      categoriesService.updateFilmAmount(
        previous_list_category.map((value) => value._id),
        list_category.map((value) => value._id)
      ),
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteFilm = async (filmID, collectionID, list_category) => {
  try {
    const [resultFilm, resultCollection, resultCategories] = await Promise.all([
      filmService.deleteFilm(filmID),
      collectionService.deleteFilm(filmID, collectionID),
      categoriesService.modifyFilmAmount(list_category, -1),
    ]);

    return resultCollection && resultFilm && resultCategories;
  } catch (error) {
    throw error;
  }
};

const addEpisode = async (_id_film, name, index, video_id) => {
  try {
    return await filmService.addEpisode(_id_film, name, index, video_id);
  } catch (error) {
    throw error;
  }
};

const getEpisodeByFilmId = async (_id_film) => {
  try {
    return await filmService.getEpisodeByFilmId(_id_film);
  } catch (error) {
    throw error;
  }
};

const getDetailEpisode = async (id_film) => {
  try {
    return await filmService.getDetailEpisode(id_film);
  } catch (error) {
    throw error;
  }
};

const updateEpisode = async (id_film, id_episode, name, video_id, index) => {
  try {
    return await filmService.updateEpisode(
      id_film,
      id_episode,
      name,
      video_id,
      index
    );
  } catch (error) {
    throw error;
  }
};

const getRandomFilm = async (_limit) => {
  try {
    return await filmService.getRandomFilm(_limit);
  } catch (error) {
    throw error;
  }
};

const getFilmByCategories = async (list_category) => {
  try {
    return await filmService.getFilmByCategories(list_category);
  } catch (error) {
    throw error;
  }
};

const search = async (key) => {
  try {
    return await filmService.search(key);
  } catch (error) {
    throw error;
  }
};

const deleteEpisode = async (id_film, id_episode) => {
  try {
    return await filmService.deleteEpisode(id_film, id_episode);
  } catch (error) {
    throw error;
  }
};

const getTrendingFilm = async () => {
  try {
    return await filmService.getTrendingFilm();
  } catch (error) {
    throw error;
  }
};

const getFilmInArray = async (list_id) => {
  try {
    return await filmService.getFilmInArray(list_id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addFilm,
  addEpisode,
  getFilm,
  getFilmById,
  getRandomFilm,
  getFilmByCategories,
  getEpisodeByFilmId,
  getDetailEpisode,
  getTrendingFilm,
  getFilmInArray,
  search,
  updateFilmById,
  updateEpisode,
  deleteFilm,
  deleteEpisode,
};
