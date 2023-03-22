const login = async (email, password) => {
  try {
    const user = DATA.find(
      (user) => user.email.toString() === email.toString()
    );

    if (user) {
      if (user.password.toString() === password.toString()) {
        return user;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("LOGIN ERROR>>>>>: " + error);
    return null;
  }
};

module.exports = { login };

const DATA = [
  {
    name: "Trần Anh Vũ",
    email: "abc@gmail.com",
    password: 1234,
  },
  {
    name: "Trần Anh B",
    email: "xyz@gmail.com",
    password: 1234,
  },
  {
    name: "Trần Anh A",
    email: "asd@gmail.com",
    password: 1234,
  },
];
