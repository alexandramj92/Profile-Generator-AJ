const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();

inquirer.prompt([
    
    {
        type:"input",
        message: "Enter your GitHub username:",
        name:"username"
    },

    {
        type: "input",
        message: "What is your favorite color?",
        name: "favoriteColor"
    }

]).then(function({username}){

    const queryUrl = `https://api.github.com/users/${username}`;
    const starredUrl = `https://api.github.com/users/${username}/starred`;

    axios.get(queryUrl).then(function(res){

        //retrieving information that will go in the PDF

        const fullName = res.data.name;
        console.log(fullName);

        const company =  res.data.company;
        console.log(company);

        const blog = res.data.blog;
        console.log(blog);

        const location = res.data.location; 
        console.log(location);

        const email = res.data.email;
        console.log(email);

        const githubLink = res.data.html_url;
        console.log(githubLink);

        const publicRepos = res.data.public_repos;
        console.log(publicRepos);

        const followers = res.data.followers;
        console.log(followers);

        const following = res.data.following;
        console.log(following);
    });

    axios.get(starredUrl).then(function(res){
        // retrieving the length of starred repositories to get the number of github stars
        const githubStars = res.data.length;
        console.log(githubStars);
    });
    


});
