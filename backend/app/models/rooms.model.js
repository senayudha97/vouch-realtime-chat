module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      room_id: String,
      room_users: Array,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("rooms", schema);
};
