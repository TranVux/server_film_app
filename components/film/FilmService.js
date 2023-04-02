const FilmModel = require("./FilmModel");

const getFilm = async (_limit, _page) => {
  try {
    if (!_limit || !_page) {
      const films = await FilmModel.find();
      return { data: films };
    } else {
      const countOfDocument = await FilmModel.count({});
      console.log(countOfDocument);
      const startIndex = (Number(_page) - 1) * _limit;
      const endIndex = Number(_page) * Number(_limit);
      const totalPage = Math.ceil(countOfDocument / Number(_limit));

      const result = {};

      result.totalPage = totalPage;
      if (endIndex < countOfDocument) {
        result.next = { page: Number(_page) + 1, limit: _limit };
      }

      if (startIndex > 0) {
        result.previous = { page: Number(_page) - 1, limit: _limit };
      }
      result.data = await FilmModel.find().skip(startIndex).limit(_limit);

      return result;
    }
  } catch (error) {
    console.log("getFilm: " + error);
  }
};

const getRandomFilm = async (_limit) => {
  try {
    const countDocument = await FilmModel.count().exec();
    const skip = Math.floor(Math.random() * countDocument);
    return await FilmModel.find()
      .skip(skip)
      .limit(_limit ? _limit : 10);
  } catch (error) {
    console.log("getNewFilm: " + error);
  }
  return null;
};

const getFilmByCategories = async (list_category) => {
  try {
    return await FilmModel.find({
      "list_category.name": { $in: list_category },
    });
  } catch (error) {
    console.log("getFilmByCategories: " + error);
  }
  return [];
};

//always search by film_name
const search = async (key) => {
  try {
    console.log(key);
    return await FilmModel.find().where({
      name: { $regex: key, $options: "i" },
    });
  } catch (error) {
    console.log("search: " + error);
  }
};

const addFilm = async (
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  _id_collection,
  imageList = {}
) => {
  try {
    const result = await FilmModel.create({
      name: filmName,
      trailer: trailerID,
      total_episode: total_episode,
      list_category: list_category,
      synopsis: synopsis,
      thumbnail: {
        filename: imageList.thumbnail[0].filename,
        path: imageList.thumbnail[0].path,
      },
      background_medium: {
        filename: imageList.background_medium[0].filename,
        path: imageList.background_medium[0].path,
      },
      _id_collection: _id_collection,
    });
    // console.log(result.);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.log("addFilm: " + error);
    return result;
  }
};

const getFilmById = async (_id) => {
  try {
    const film = await FilmModel.findById(_id);
    if (film) {
      return film;
    }
    return null;
  } catch (error) {
    console.log("getFilmById: " + error);
  }
};

const updateFilmById = async (
  _id,
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  __id_collection,
  imageList = {}
) => {
  try {
    const oldResult = await FilmModel.findById(_id);
    const result = await FilmModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          name: filmName,
          trailer: trailerID,
          total_episode: total_episode,
          list_category: list_category,
          synopsis: synopsis,
          thumbnail:
            JSON.stringify(imageList) !== "{}" &&
            imageList.thumbnail[0].filename
              ? {
                  filename: imageList.thumbnail[0].filename,
                  path: imageList.thumbnail[0].path,
                }
              : oldResult.thumbnail,
          background_medium:
            JSON.stringify(imageList) !== "{}" &&
            imageList.background_medium[0].filename
              ? {
                  filename: imageList.background_medium[0].filename,
                  path: imageList.background_medium[0].path,
                }
              : oldResult.background_medium,
          _id_collection: __id_collection,
        },
      }
    );

    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.log("updateFilmById: " + error);
    return result;
  }
};

const deleteFilm = async (id) => {
  try {
    const result = await FilmModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log("deleteFilm: " + error);
  }
};

const addEpisode = async (_id_film, name, index, video_id) => {
  try {
    const now = new Date().getTime();
    const result = await FilmModel.findOneAndUpdate(
      { _id: _id_film },
      {
        $push: {
          list_episode: {
            _id: _id_film + "_" + now,
            name,
            index,
            video_id,
          },
        },
      }
    );
    return result;
  } catch (error) {
    console.log("addEpisode: " + error);
  }
};

const getEpisodeByFilmId = async (_id_film) => {
  try {
    const result = await FilmModel.findById(_id_film).select(
      "_id list_episode"
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log("getEpisodeByFilmId: " + error);
    return null;
  }
};

const getDetailEpisode = async (id_film) => {
  try {
    const film = FilmModel.findById(id_film).select("list_episode");
    return film;
  } catch (error) {
    console.log("getDetailEpisode: " + error);
    return null;
  }
};

const updateEpisode = async (id_film, id_episode, name, video_id, index) => {
  try {
    const result = FilmModel.updateOne(
      { _id: id_film, "list_episode._id": id_episode },
      {
        $set: {
          "list_episode.$.name": name,
          "list_episode.$.video_id": video_id,
          "list_episode.$.index": index,
        },
      }
    );

    return result;
  } catch (error) {
    console.log("updateEpisode: " + error);
  }
};

const deleteEpisode = async (id_film, id_episode) => {
  try {
    return await FilmModel.updateOne(
      {
        _id: id_film,
      },
      {
        $pull: { list_episode: { _id: id_episode } },
      }
    );
  } catch (error) {
    console.log("deleteEpisode: " + error);
  }
};

module.exports = {
  addEpisode,
  addFilm,
  getFilm,
  getFilmById,
  getEpisodeByFilmId,
  getDetailEpisode,
  getRandomFilm,
  getFilmByCategories,
  search,
  updateEpisode,
  updateFilmById,
  deleteFilm,
  deleteEpisode,
};
