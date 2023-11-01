const dbConfig = require("../config/database.js");
const mongoose = require("mongoose");

module.exports = {
  mongoose,
  url: dbConfig.url,
  rooms: require("./rooms.model")(mongoose),
  messages: require("./messages.model")(mongoose),
  activeUsers: require("./activeUsers.model")(mongoose),
};
