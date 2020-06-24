var express = require("express");
var app = express();
var mongoose = require("mongoose");
// var multer = require("multer");
var Picture = require("./public/picture.js");
app.use(express.static("./"));
app.use(express.json());
// var Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// var upload = multer({
//   storage: Storage,
// });

mongoose.connect(
  "mongodb+srv://animesh:shanky98@cluster0-v7sfz.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  },
  function (err, db) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected db");
    }
  }
);

// app.get("/", function (req, res) {
//   Picture.find({}, function (err, allImages) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("hello Bhai");
//     }
//   });
// });

// app.post("/add", function (req, res) {
//   console.log(req.body);
//   const title = req.body.title;
//   var url = req.body.url;
//   var type = req.body.type;
//   var newImage = new Image({ title, url, type });
//   newImage
//     .save()
//     .then(() => res.json("Image Added!!"))
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/new", function (req, res) {
//   res.render("new.ejs");
// });

const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Server running on port ${port}`));
