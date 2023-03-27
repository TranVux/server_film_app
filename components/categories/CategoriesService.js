const CategoryModel = require("./CategoriesModel");

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find();
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

const increaseCount = async (_id) => {
  try {
    const prevModel = CategoryModel.findById(_id);
    const prevCount = prevModel.film_amount;

    const result = await CategoryModel.updateOne(
      { _id: _id },
      { $set: { amount_film: (prevCount += 1) } }
    );
    return result;
  } catch (error) {
    console.log("increaseCount: " + error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  increaseCount,
};
