module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      active_user_username: String,
      active_user_room: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("activeUsers", schema);
};
