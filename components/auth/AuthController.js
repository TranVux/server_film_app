const AuthService = require("./AuthService");
const FilmService = require("../film/FilmService");

const login = async (email, password) => {
  try {
    return await AuthService.login(email, password);
  } catch (error) {
    throw error;
  }
};

const register = async (username, email, password) => {
  try {
    return await AuthService.register(username, email, password);
  } catch (error) {
    throw error;
  }
};

const changePassword = async (user_id, oldPassword, newPassword) => {
  try {
    return await AuthService.changePassword(user_id, oldPassword, newPassword);
  } catch (error) {
    throw error;
  }
};

const getCollection = async (user_id) => {
  try {
    const collectionResult = await AuthService.getCollection(user_id);
    const filmResult = await FilmService.getFilmInArray(
      collectionResult.collections
    );
    return filmResult;
  } catch (error) {
    throw error;
  }
};

const addFilmCollection = async (user_id, film_id) => {
  try {
    return await AuthService.addFilmCollection(user_id, film_id);
  } catch (error) {
    throw error;
  }
};

const countUser = async () => {
  try {
    return await AuthService.countUser();
  } catch (error) {
    throw error;
  }
};

const updateImage = async (user_id, image) => {
  try {
    return await AuthService.updateImage(user_id, image);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
  getCollection,
  countUser,
  addFilmCollection,
  changePassword,
  updateImage,
};
