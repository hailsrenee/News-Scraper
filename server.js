var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com").then(function(response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $("article.css-8atqhb").each(function(i, element) {
            var title = $(element).find("h2").text();
            var link = 'https://www.nytimes.com' + $(element).find("a").attr("href");
            results.push({
                title: title,
                link: link
            });
            // db.Article.create(result).then(function(dbArticle) {
            //     console.log(dbArticle);
            // }).catch(function(error) {
            //     console.log(error);
            // });
        });
        res.send("Scrape Complete");
        console.log(results);
    });
});

// app.get("/articles", function(req, res) {
//     db.Article.find({}, function(error, data) {
//         if error {
//             console.log(error);
//             res.status(500).send("An error occurred.");
//         } else {
//             res.json(data);
//         };
//     });
        // .then(function(dbArticle) {
        //     res.json(dbArticle);
        // })
        // .catch(function(err) {
        //     res.json(err);
        //     res.status(500).send("An error occurred.")
        // });
// });

// app.get("/articles/:id", function(req, res) {
//     dbArticle.findOne({ _id: req.params.id })
//         .populate("note")
//         .then(function(dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });

// app.post("/articles/:id", function(req, res) {
//     db.Note.create(req.body)
//         .then(function(dbNote) {
//           return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function(dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});