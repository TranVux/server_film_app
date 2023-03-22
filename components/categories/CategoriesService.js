const getAllCategories = async () => {
  try {
    return DATA;
  } catch (error) {
    console.log("getAllCategories: " + error);
  }
};

const addCategory = async (name) => {
  try {
    const category = DATA.find(
      (item) => item.name.toString() === name.toString()
    );

    if (category) {
      return false;
    } else {
      DATA.push({
        _id: DATA.length + 1,
        name,
      });
      return true;
    }
  } catch (error) {
    console.log("addCategory: " + error);
  }
};

const deleteCategory = async (_id) => {
  try {
    const index = DATA.findIndex(
      (item) => item._id.toString() === _id.toString()
    );
    if (index) {
      DATA.splice(index, 1);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("deleteCategory: " + error);
    return false;
  }
};

const updateCategory = async (_id, name) => {
  try {
    const category = DATA.find(
      (item) => item._id.toString() === _id.toString()
    );

    if (category) {
      DATA.forEach((element) => {
        if (element._id.toString() === _id.toString()) {
          element._id = _id ? _id : element._id;
          element.name = name ? name : element.name;
        }
        return element;
      });
      return true;
    }
    return false;
  } catch (error) {
    console.log("updateCategory: " + error);
    return false;
  }
};
module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
const DATA = [
  {
    _id: 1,
    name: "Prefabricated Aluminum Metal Canopies",
  },
  {
    _id: 2,
    name: "Termite Control",
  },
  {
    _id: 3,
    name: "Drywall & Acoustical (MOB)",
  },
  {
    _id: 4,
    name: "Asphalt Paving",
  },
  {
    _id: 5,
    name: "Glass & Glazing",
  },
  {
    _id: 6,
    name: "Structural & Misc Steel Erection",
  },
  {
    _id: 7,
    name: "Asphalt Paving",
  },
  {
    _id: 8,
    name: "Temp Fencing, Decorative Fencing and Gates",
  },
  {
    _id: 9,
    name: "Ornamental Railings",
  },
  {
    _id: 10,
    name: "Asphalt Paving",
  },
  {
    _id: 11,
    name: "Ornamental Railings",
  },
  {
    _id: 12,
    name: "Roofing (Metal)",
  },
  {
    _id: 13,
    name: "Electrical",
  },
  {
    _id: 14,
    name: "Site Furnishings",
  },
  {
    _id: 15,
    name: "Marlite Panels (FED)",
  },
  {
    _id: 16,
    name: "Retaining Wall and Brick Pavers",
  },
  {
    _id: 17,
    name: "Waterproofing & Caulking",
  },
  {
    _id: 18,
    name: "Electrical and Fire Alarm",
  },
  {
    _id: 19,
    name: "Granite Surfaces",
  },
  {
    _id: 20,
    name: "Fire Sprinkler System",
  },
];
