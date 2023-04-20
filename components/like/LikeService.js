const LikeModel = require("./LikeModel");

const createLikeRecord = async (recordID, film_id) => {
  try {
    const result = await LikeModel.create({
      _id: recordID,
      film_id: film_id,
      liked: [],
    });

    return result;
  } catch (error) {
    console.log("CreateLikeRecord: " + error);
  }
};

const toggleLike = async (userID, filmID) => {
  try {
    const resLikeModel = await LikeModel.findOne({
      film_id: filmID,
    });

    if (!resLikeModel) {
      //create new record for user like
      const result = await LikeModel.create({
        user_id: userID,
        liked: [filmID],
      });

      return result;
    } else {
      //handle toggle like for user by film id
      const checkIsIncludesFilmId = resLikeModel.liked.includes(userID);

      if (checkIsIncludesFilmId) {
        const index = resLikeModel.liked.indexOf(userID);
        resLikeModel.liked.splice(index, 1);
      } else {
        resLikeModel.liked.push(userID);
      }

      await resLikeModel.save();

      return resLikeModel;
    }
  } catch (error) {
    console.log("toggleLike " + error);
  }
};

const deleteLike = async (likeID) => {
  try {
    return await LikeModel.deleteOne({ _id: likeID });
  } catch (error) {
    console.log("deleteLike: " + error);
  }
};

module.exports = { toggleLike, createLikeRecord, deleteLike };
