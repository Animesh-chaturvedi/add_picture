const router = require("express").Router();
var Picture = require("./public/picture.js");

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
  // const url = req.body.url;
  // const name = req.body.name;
  // const type = req.body.type;

  const newPicture = new Picture({
    name: req.body.name,
    url: req.body.url,
    type: req.body.type,
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
