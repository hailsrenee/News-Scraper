var express = require("express");
var logger = require("morgan");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var axios = require("axios");
var PORT = process.env.PORT || 3000;

var app = express();

var databaseURL = "scraper";
var collections = ["scrapedData"];

var db = require("../models");
var db = mongojs(databaseURL, collections);
db.on("error", function(error) {
    console.log("Database Error: ", error);
});

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(error, found) {
        if (error) {
            console.log(error);
            res.status(500).send("An error occurred.");
        } else {
            res.json(found);
        }
    });
});

console.log("\nGrabbing every article title and link from nytimes homepage:\n");

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
//     db.Article.find({}).then(function(dbArticle) {
//             res.json(dbArticle);
//         }).catch(function(error) {
//             res.json(error);
//             res.status(500).send("An error occurred.")
//         })
//     });

    app.listen(PORT, function() {
        console.log("App running on port " + PORT + "!");
    });



//PASTED FROM SOLUTION:
// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
// var axios = require("axios");
// var cheerio = require("cheerio");

// // This function will scrape the NYTimes website
// var scrape = function() {
//   // Scrape the NYTimes website
//   return axios.get("http://www.nytimes.com").then(function(res) {
//     var $ = cheerio.load(res.data);
//     console.log("scraping");
//     // Make an empty array to save our article info
//     var articles = [];

//     // Now, find and loop through each element that has the "css-180b3ld" class
//     // (i.e, the section holding the articles)
//     $("article.css-8atqhb").each(function(i, element) {
//       // In each article section, we grab the child with the class story-heading

//       // Then we grab the inner text of the this element and store it
//       // to the head variable. This is the article headline
//       var head = $(this)
//         .find("h2")
//         .text()
//         .trim();

//       // Grab the URL of the article
//       var url = $(this)
//         .find("a")
//         .attr("href");

//       // Then we grab any children with the class of summary and then grab it's inner text
//       // We store this to the sum variable. This is the article summary
//       var sum = $(this)
//         .find("p")
//         .text()
//         .trim();

//       // So long as our headline and sum and url aren't empty or undefined, do the following
//       if (head && sum && url) {
//         // This section uses regular expressions and the trim function to tidy our headlines and summaries
//         // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
//         var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
//         var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

//         // Initialize an object we will push to the articles array

//         var dataToAdd = {
//           headline: headNeat,
//           summary: sumNeat,
//           url: "https://www.nytimes.com" + url
//         };

//         articles.push(dataToAdd);
//       }
//     });
//     return articles;
//   });
// };

// // Export the function, so other files in our backend can use it
// module.exports = scrape;
