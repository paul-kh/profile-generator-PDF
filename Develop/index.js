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
            const queryURL = "https://api.github.com/users/" + username + "?";
            const axios = require("axios");
            let htmlStr;

            axios
                .get(queryURL)
                .then(function (res) {
                    // To do: handle error when username is not matched
                    console.log(res.data.avatar_url);
                    console.log("URL: ", queryURL);
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
                    console.log(gitHubs);

                    htmlStr = genHTML.generateHTML(colors = { color: `${data.color}` }, gitHubs);
                    writeToHTMLFile("../Assets/html/index.html", htmlStr);
                    // To Do: To convert HTML to PDF
                });

            // To get # of stars
            //https://api.github.com/users/paul-kh/starred
            // stargazers_count 
        }
        getGitHubData(data.username);
    });
    
}
init();

