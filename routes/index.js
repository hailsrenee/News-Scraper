const express = require('express'),
      router = express.Router(),
      db = require("../models");

//get route to root, populating index.handlebars with articles
router.get('/', (req,res) => {
  db.Article
    .find({})
    .then(articles => res.render('index', {articles}))
    .catch(err=> res.json(err));
});

module.exports = router;

//PASTED FROM SOLVED
// var router = require("express").Router();
// var apiRoutes = require("./api");
// var viewRoutes = require("./view");

// router.use("/api", apiRoutes);
// router.use("/", viewRoutes);

// module.exports = router;
