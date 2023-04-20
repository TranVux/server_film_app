const FilmModel = require("./FilmModel");

const getFilm = async (_limit, _page) => {
  try {
    if (!_limit || !_page) {
      const films = await FilmModel.find().populate("like");
      return { data: films };
    } else {
      const countOfDocument = await FilmModel.count({});
      console.log(countOfDocument);
      const startIndex = (Number(_page) - 1) * _limit;
      const endIndex = Number(_page) * Number(_limit);
      const totalPage = Math.ceil(countOfDocument / Number(_limit));

      const result = {};
      result.totalPage = totalPage;
      result.limit = Number(_limit);
      if (endIndex < countOfDocument) {
        result.next = { page: Number(_page) + 1 };
      }

      if (startIndex > 0) {
        result.previous = { page: Number(_page) - 1 };
      }
      result.data = await FilmModel.find()
        .populate("like")
        .skip(startIndex)
        .limit(_limit);

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
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like")
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
    })
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like");
  } catch (error) {
    console.log("getFilmByCategories: " + error);
  }
  return [];
};

//always search by film_name
const search = async (key) => {
  try {
    const regex = new RegExp(key, "gi");
    console.log(regex);
    return await FilmModel.find()
      .where({
        name: { $regex: regex },
      })
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like");
  } catch (error) {
    console.log("search: " + error);
  }
};

const addFilm = async (
  film_id,
  filmName,
  trailerID,
  likeId,
  total_episode,
  list_category,
  synopsis,
  _id_collection,
  imageList = {}
) => {
  try {
    const result = await FilmModel.create({
      _id: film_id,
      name: filmName,
      trailer: trailerID,
      like: likeId,
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
    const film = await FilmModel.findById(_id)
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like");
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

const getTrendingFilm = async () => {
  try {
    const result = await FilmModel.find()
      .sort({ views: -1 })
      .limit(10)
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like");
    return result;
  } catch (error) {
    console.log("getTrendingFilm: " + error);
  }
};

const getFilmInArray = async (list_id) => {
  try {
    return await FilmModel.find({ _id: { $in: list_id } })
      .populate({
        path: "_id_collection",
        populate: { path: "films", select: "name" },
      })
      .populate("like");
  } catch (error) {
    console.log("getFilmInArray: " + error);
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
  getTrendingFilm,
  getFilmInArray,
  search,
  updateEpisode,
  updateFilmById,
  deleteFilm,
  deleteEpisode,
};
