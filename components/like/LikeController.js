const LikeService = require("./LikeService");
const toggleLike = async (userID, filmID) => {
  try {
    return await LikeService.toggleLike(userID, filmID);
  } catch (error) {
    throw error;
  }
};

module.exports = { toggleLike };
