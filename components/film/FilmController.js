const filmService = require("./FilmService");

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
  imageList
) => {
  try {
    return await filmService.addFilm(
      filmName,
      trailerID,
      total_episode,
      list_category,
      synopsis,
      imageList
    );
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
  imageList
) => {
  try {
    return await filmService.updateFilmById(
      _id,
      filmName,
      trailerID,
      total_episode,
      list_category,
      synopsis,
      imageList
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { getFilm, addFilm, getFilmById, updateFilmById };
