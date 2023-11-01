const db = require("../models");
const Rooms = db.rooms;
const ActiveUsers = db.activeUsers;

exports.findAll = (req, res) => {
  Rooms.find()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.create = (req, res) => {
  const { room_id, room_username } = req.body;

  ActiveUsers.findOne({ active_user_username: room_username }).then((user) => {
    if (user) {
      console.log("reject login");
      return res.json({ success: true, message: "User already active" });
    } else {
      ActiveUsers.create({
        active_user_username: room_username,
        active_user_room: room_id,
      })
        .then(() => {
          Rooms.findOne({ room_id })
            .then((room) => {
              if (room) {
                if (
                  room.room_users.find(
                    (user) => user.user_username === room_username
                  )
                ) {
                  return res.json(room);
                } else {
                  room.room_users.push({ user_username: room_username });

                  room.save().then((updatedRoom) => {
                    return res.json(updatedRoom);
                  });
                }
              } else {
                const newRoom = new Rooms({
                  room_id,
                  room_users: [{ user_username: room_username }],
                });

                newRoom.save().then((createdRoom) => {
                  return res.json(createdRoom);
                });
              }
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  });
};

exports.show = (req, res) => {
  Rooms.findOne({ _id: req.params.id })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  Rooms.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Room not found",
        });
      }
      return res.json({ message: "Room updated successfully" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.delete = (req, res) => {
  Rooms.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Room not found",
        });
      }
      return res.json({ message: "Room deleted successfully" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
