const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument ({compress:false});



let fullName="";
let imgURL="";
let company="";
let blog ="";
let location="";
let email="";
let githubLink="";
let publicRepos="";
let followers="";
let following="";
let githubStars="";
let cardColor="";




inquirer.prompt([
// prompts user for their github username and their favorite color
    
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

]).then(function({username, favoriteColor}){

    const queryUrl = `https://api.github.com/users/${username}`;
    const starredUrl = `https://api.github.com/users/${username}/starred`;
    cardColor = favoriteColor;

    axios.get(queryUrl).then(function(res){

        //retrieving information that will go in the PDF
   

        fullName = res.data.name;

        imgURL = res.data.avatar_url;

        company =  res.data.company;

        blog = res.data.blog;

        location = res.data.location; 

        email = res.data.email;

        githubLink = res.data.html_url;

        publicRepos = res.data.public_repos;

        followers = res.data.followers;

        following = res.data.following;
    });

    axios.get(starredUrl).then(function(res){
        // retrieving the length of starred repositories to get the number of github stars
        githubStars = res.data.length;
        generatePDF();

    });
})


function generatePDF(){

    //generate PDF
    doc.pipe(fs.createWriteStream('Github-Profile.pdf')); // write to PDF
    //  doc.pipe(res); // HTTP response
     // add stuff to PDF here using methods described below...
     
     doc
     .roundedRect(20, 50, 570, 250, 10)
     .fill(`${cardColor}`)
  
     doc
     .roundedRect(80, 400, 200, 100, 10)
     .fill(`${cardColor}`)
     .fontSize(20)
     .fillColor('white')
     .text('Public Repositories', 95, 435)
     .text(`${publicRepos}`, 165)
  
     doc
     .roundedRect(340, 400, 200, 100, 10)
     .fill(`${cardColor}`)
     .fontSize(20)
     .fillColor('white')
     .text('Followers', 400, 435)
     .text(`${followers}`, 425)
  
     doc
     .roundedRect(80, 540, 200, 100, 10)
     .fill(`${cardColor}`)
     .fontSize(20)
     .fillColor('white')
     .text('Github Stars', 120, 575)
     .text(`${githubStars}`, 160)
     
     
    doc
     .roundedRect(340, 540, 200, 100, 10)
     .fill(`${cardColor}`)
     .fontSize(20)
     .fillColor('white')
     .text('Following', 400, 575)
     .text(`${following}`, 425)
  
     doc.fillColor('white').fontSize(30).text('Hi!', 290, 100)
     doc.fillColor('white').fontSize(30).text(`My name is ${fullName}!`, 140)
     doc.fillColor('white').fontSize(20).text(`Currently at ${company}`, 220)
     doc.fillColor('white').fontSize(20).text(`${location}`, 70, 270)
  
     doc.fillColor('white').fontSize(20).text('github', 290, 270)
     const widthGl = doc.widthOfString('github');
     const heightGl = doc.currentLineHeight();
     doc.link(290, 270, widthGl, heightGl, `${githubLink}`);
  
  
     doc.fillColor('white').fontSize(20).text("blog", 470, 270)
    const widthB = doc.widthOfString('blog');
    const heightB = doc.currentLineHeight();
    doc.link(420, 270, widthB, heightB, `${blog}`);
  
    
  
     doc.moveDown()
     doc.fillColor('black').fontSize(25)
     .text('I build things and teach people to code.', 100)
  
     
     // finalize the PDF and end the stream
     doc.end();
   


};
