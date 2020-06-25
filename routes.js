const router = require("express").Router();
var Picture = require("./public/picture.js");
var request = require("request");
var multer = require("multer");
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
});

router.route("/").get(async (req, res) => {
  console.log("hello");

  let limit = req.query.limit;
  let offset = req.query.offset;
  let nameString = req.query.nameString;
  console.log(limit, offset, nameString);

  if (limit === undefined) {
    limit = 100; // max limit
  }

  if (offset === undefined) {
    offset = 0;
  }

  //res.json("yo");

  let images = null;

  console.log(limit, offset, nameString);
  if (nameString === undefined) {
    images = await Picture.find().where("id").gt(offset).limit(limit);
  } else {
    images = await Picture.find()
      .where("id")
      .gt(offset)
      .where("name")
      .equals(nameString)
      .limit(limit);
  }
  console.log(images);

  res.json(images);
});

router.route("/add").post((req, res) => {
  console.log(req.body);

  request(
    {
      url: req.body.url,
      method: "HEAD",
    },
    function (err, response, body) {
      console.log(response.headers);
      const newPicture = new Picture({
        name: req.body.name,
        url: req.body.url,
        type: req.body.type,
        metaData: {
          size: response.headers["content-length"],
          extType: response.headers["content-type"],
        },
      });

      newPicture
        .save()
        .then(() => res.json(newPicture))
        .catch((err) => {
          console.log(err);
          res.status(400).json("Error: " + err);
        });
    }
  );
});

router.route("/addimage").post(upload.single("image"), (req, res) => {
  console.log(req.file);
  const newPicture = new Picture({
    name: req.file.filename,
    url: req.file.path,
    type: req.file.mimetype,
  });

  newPicture
    .save()
    .then(() => res.json(newPicture))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

router.route("/ahh").get((req, res) => {
  res.json("animesh");
});

module.exports = router;
