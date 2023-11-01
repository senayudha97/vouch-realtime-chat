const db = require("../models");
const Messages = db.messages;
const ActiveUsers = db.activeUsers;

exports.findAll = (req, res) => {
  Messages.find({ message_room_id: req.params.message_room_id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  Messages.create(req.body)
    .then(() => {
      res.json({ message: "Message created" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.show = (req, res) => {
  Messages.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.exit = (req, res) => {
  // return res.send(req.params.id);

  ActiveUsers.deleteOne({ active_user_username: req.params.id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
