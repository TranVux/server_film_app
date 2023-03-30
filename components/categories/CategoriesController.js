const categoriesService = require("./CategoriesService");

const getAllCategories = async () => {
  try {
    return await categoriesService.getAllCategories();
  } catch (error) {
    throw error;
  }
};

const addCategory = async (name) => {
  try {
    return await categoriesService.addCategory(name);
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (_id) => {
  try {
    return await categoriesService.deleteCategory(_id);
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (_id, name) => {
  try {
    return await categoriesService.updateCategory(_id, name);
  } catch (error) {
    throw error;
  }
};

const increaseCount = async (_id) => {
  try {
    return await categoriesService.increaseCount(_id);
  } catch (error) {
    throw error;
  }
};

const getCategoriesHasFilm = async () => {
  try {
    return await categoriesService.getAllHasFilm();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  increaseCount,
  getCategoriesHasFilm,
};
