const fs = require("fs");

function writeToHTMLFile(fileName, data) {
    fs.writeFile(fileName, data, function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Created HTML file successfully.");
        }
    });

}

function convertToPDF(htmlStr, pdfFileName) {
    convertFactory = require('electron-html-to');

    const conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });

    conversion({ html: htmlStr  }, function (err, result) {
        if (err) {
            return console.error(err);
        }

        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream("../Assets/pdf-files/" + pdfFileName + ".pdf"));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });
}


function init() {
    const genHTML = require("./generateHTML.js");
    const inquirer = require("inquirer");
    inquirer.prompt([
        {
            type: "input",
            Message: "GitHub username",
            name: "username"
        },
        {
            type: "list",
            message: "Choose your favorite color:",
            choices: ["green", "blue", "pink", "red"],
            name: "color"
        }
    ]).then(function (data) {
        console.log("Color: ", data.color, " username: ", data.username);

        function getGitHubData(username) {
            const gitHubs = {};
            const userURL = "https://api.github.com/users/" + username + "?";
            const axios = require("axios");
            let htmlStr;

            axios
                .get(userURL)
                .then(function (res) {
                    // To do: handle error when username is not matched
                    console.log(res.data.avatar_url);
                    console.log("URL: ", userURL);
                    gitHubs.avatarURL = res.data.avatar_url;
                    gitHubs.name = res.data.name;
                    gitHubs.company = res.data.company;
                    gitHubs.gitHubURL = res.data.html_url;
                    gitHubs.blogURL = res.data.blog;
                    gitHubs.publicRepos = res.data.public_repos;
                    gitHubs.followers = res.data.followers;
                    gitHubs.following = res.data.following;
                    gitHubs.location = res.data.location;
                    gitHubs.bio = res.data.bio;

                    // Get number of stars
                    const starURL = "https://api.github.com/users/" + username + "/starred";
                    let starNum = 0;
                    axios
                        .get(starURL)
                        .then(function (starData) { // need to hadle error
                            for (let star of starData.data) {
                                starNum = starNum + parseInt(star.stargazers_count);
                            }
                            gitHubs.stars = starNum;
                            // console.log("Data Pulled from GitHub: ", gitHubs);

                            // Write to HTML file
                            htmlStr = genHTML.generateHTML(colors = { color: `${data.color}` }, gitHubs);
                            writeToHTMLFile("../Assets/html/" + username + ".html", htmlStr);
                            // convert HTML to PDF
                            convertToPDF(htmlStr, username);
                        }).catch(function (err) {
                            console.group("Error getting star data from server");
                            return;
                        });

                }).catch(function (error) {
                    console.group("Error getting GitHub data from server or Username doesn't match any GitHub user.");
                    return;
                });
        }
        getGitHubData(data.username);
    })

}
init();

