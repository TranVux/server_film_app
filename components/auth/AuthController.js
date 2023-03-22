const AuthService = require("./AuthService");

const login = async (email, password) => {
  try {
    return await AuthService.login(email, password);
  } catch (error) {
    throw error;
  }
};

module.exports = { login };
