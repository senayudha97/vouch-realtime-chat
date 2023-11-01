module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      message_room_id: String,
      message_username: String,
      message_text: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("messages", schema);
};
