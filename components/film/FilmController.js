const filmService = require("./FilmService");

const getFilm = async (_limit, _page) => {
  try {
    return await filmService.getFilm(_limit, _page);
  } catch (error) {
    throw error;
  }
};

const addFilm = async (
  filmName,
  trailerID,
  totalEpisode,
  categories,
  description,
  imageList
) => {
  try {
    return await filmService.addFilm(
      filmName,
      trailerID,
      totalEpisode,
      categories,
      description,
      imageList
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { getFilm, addFilm };
