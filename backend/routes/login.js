const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json(user);
      } else {
        res.json("incorrect");
      }
    } else {
      res.json("no record existed");
    }
  });
});


module.exports = router;
