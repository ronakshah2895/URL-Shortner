module.exports = (Schema) => {
  const Url = new Schema({
    identifier: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  });
  return Url;
};
