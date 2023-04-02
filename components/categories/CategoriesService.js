const CategoryModel = require("./CategoriesModel");

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find().sort({ film_amount: -1 });
    if (categories) {
      return categories;
    } else {
      return null;
    }
  } catch (error) {
    console.log("getAllCategories: " + error);
  }
};

const getAllHasFilm = async () => {
  try {
    const categories = await CategoryModel.find({ film_amount: { $gte: 1 } });
    if (categories) {
      return categories;
    } else {
      return null;
    }
  } catch (error) {
    console.log("getAllCategories: " + error);
  }
};

const addCategory = async (name) => {
  try {
    const count = await CategoryModel.countDocuments({ name: name }).exec();
    console.log("addCategory>>>>>>>: " + count);
    if (count > 0) {
      return false;
    } else {
      await CategoryModel.create({
        name: name,
      });
      return true;
    }
  } catch (error) {
    console.log("addCategory: " + error);
  }
};

const deleteCategory = async (_id) => {
  try {
    const result = await CategoryModel.deleteOne({ _id: _id });
    return result;
  } catch (error) {
    console.log("deleteCategory: " + error);
    return false;
  }
};

const updateCategory = async (_id, name) => {
  try {
    const result = CategoryModel.updateOne(
      { _id: _id },
      { $set: { name: name } }
    );
    return result;
  } catch (error) {
    console.log("updateCategory: " + error);
    return false;
  }
};

//type = 1 => increase || type = -1 => decrease
const modifyFilmAmount = async (id_arr, type = 1) => {
  try {
    return await CategoryModel.updateMany(
      { _id: { $in: id_arr } },
      { $inc: { film_amount: type } },
      { multi: true }
    );
  } catch (error) {
    console.log("modifyFilmAmount: " + error);
  }
};

const updateFilmAmount = async (prev_id_arr = [], id_arr) => {
  try {
    await modifyFilmAmount(prev_id_arr, -1);
    return await modifyFilmAmount(id_arr, 1);
  } catch (error) {
    console.log("updateFilmAmount: " + error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  updateFilmAmount,
  getAllHasFilm,
  modifyFilmAmount,
};

function intersect(a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection);
}
