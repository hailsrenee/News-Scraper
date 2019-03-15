var express = require("express");
// var logger = require("morgan");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var axios = require("axios");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;

var app = express();

// var databaseURL = "scraper";
// var collections = ["scrapedData"];

var routes = require("./routes");

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "maim"}));
app.set("view engine", "handlebars");

app.use(routes);

// var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoScraper';

// mongoose.connect(MONGODB_URI);

// var db = require("./models");
// var db = mongojs(databaseURL, collections);
// db.on("error", function(error) {
//     console.log("Database Error: ", error);
// });

// app.get("/", function(req, res) {
//     res.send("Hello world");
// });

// app.get("/all", function(req, res) {
//     db.scrapedData.find({}, function(error, found) {
//         if (error) {
//             console.log(error);
//             res.status(500).send("An error occurred.");
//         } else {
//             res.json(found);
//         }
//     });
// });

// console.log("\nGrabbing every article title and link from nytimes homepage:\n");

// app.get("/scrape", function(req, res) {
//     axios.get("https://www.nytimes.com").then(function(response) {
//         var $ = cheerio.load(response.data);
//         var results = [];
//         $("article.css-8atqhb").each(function(i, element) {
//             var title = $(element).find("h2").text();
//             var link = 'https://www.nytimes.com' + $(element).find("a").attr("href");
//             results.push({
//                 title: title,
//                 link: link
//             });
//             // db.Article.create(result).then(function(dbArticle) {
//             //     console.log(dbArticle);
//             // }).catch(function(error) {
//             //     console.log(error);
//             // });
//         });
//         res.send("Scrape Complete");
//         console.log(results);
//     });
// });

// // app.get("/articles", function(req, res) {
// //     db.Article.find({}).then(function(dbArticle) {
// //             res.json(dbArticle);
// //         }).catch(function(error) {
// //             res.json(error);
// //             res.status(500).send("An error occurred.")
// //         })
// //     });

    app.listen(PORT, function() {
        console.log("App running on port " + PORT + "!");
    });