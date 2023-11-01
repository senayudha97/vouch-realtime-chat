module.exports = (app) => {
  const rooms = require("../controllers/rooms.controller.js");
  const router = require("express").Router();

  router.get("/", rooms.findAll);
  router.get("/:id", rooms.show);
  router.post("/", rooms.create);
  router.put("/:id", rooms.update);
  router.delete("/:id", rooms.delete);

  app.use("/rooms", router);
};
