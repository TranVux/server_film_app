const AuthService = require("./AuthService");

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

module.exports = { login, register, changePassword };
