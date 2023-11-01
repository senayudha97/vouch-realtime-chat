module.exports = (app) => {
  const messages = require("../controllers/messages.controller.js");
  const router = require("express").Router();

  router.get("/:message_room_id", messages.findAll);
  router.post("/", messages.create);
  router.get("/exit/:id", messages.exit);

  app.use("/messages", router);
};
