## App Name: GitHub-PDF Profile Generator

## About the App:

This app allows creating a command-line that dynamically generates a PDF profile from a GitHub username. 

![Alt text](./Assets/images/demo.gif?raw=true "App Demo")

The application will be invoked with the following command:

```sh
node index.js
```

![Alt text](./Assets/images/command-line.png?raw=true "Command Line Interface")


The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

![Alt text](./Assets/images/pdf-profiles-generated.png?raw=true "PDF Profiles Generated inside a specific folder")

## User Story:
Aa a product manager, I want a developer profile generator so that I can easily prepare reports for stakeholders.

## Business Context
When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

![Alt text](./Assets/images/profile.png?raw=true "Sample of PDF Generated Profile")
