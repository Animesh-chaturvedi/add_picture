var mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
var Schema = mongoose.Schema;
const pictureSchema = new Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  metaData: {
    size: { type: Number },
    extType: { type: String },
  },
});

pictureSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Picture", pictureSchema);
