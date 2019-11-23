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
        console.log(fullName);

        imgURL = res.data.avatar_url;
        console.log(imgURL);

        company =  res.data.company;
        console.log(company);

        blog = res.data.blog;
        console.log(blog);

        location = res.data.location; 
        console.log(location);

        email = res.data.email;
        console.log(email);

        githubLink = res.data.html_url;
        console.log(githubLink);

        publicRepos = res.data.public_repos;
        console.log(publicRepos);

        followers = res.data.followers;
        console.log(followers);

        following = res.data.following;
        console.log(following);
    });

    axios.get(starredUrl).then(function(res){
        // retrieving the length of starred repositories to get the number of github stars
        githubStars = res.data.length;
        console.log(githubStars);
        generatePDF();

    });
})


function generatePDF(){

   //generate PDF
   doc.pipe(fs.createWriteStream('file.pdf')); // write to PDF
  //  doc.pipe(res); // HTTP response
   // add stuff to PDF here using methods described below...
   
   doc
   .rect(20, 50, 570, 250)
   .fill(`${cardColor}`)

   doc
   .rect(80, 400, 200, 100)
   .fill(`${cardColor}`)
   .fontSize(20)
   .fillColor('white')
   .text('Public Repositories', 95, 440)
   .text(`${publicRepos}`, 160)

   doc
   .rect(340, 400, 200, 100)
   .fill(`${cardColor}`)
   .fontSize(20)
   .fillColor('white')
   .text('Followers', 400, 440)
   .text(`${followers}`, 420)

   doc
   .rect(80, 540, 200, 100)
   .fill(`${cardColor}`)
   .fontSize(20)
   .fillColor('white')
   .text('Github Stars', 120, 580)
   .text(`${githubStars}`, 160)
   
   
  doc
   .rect(340, 540, 200, 100)
   .fill(`${cardColor}`)
   .fontSize(20)
   .fillColor('white')
   .text('Following', 400, 580)
   .text(`${following}`, 420)

   doc.fillColor('white').fontSize(30).text('Hi!', 300, 150)
   doc.fillColor('white').fontSize(30).text(`My name is ${fullName}!`, 120)
   doc.fillColor('white').fontSize(20).text(`Currently @ ${company}`, 190)
   doc.fillColor('white').fontSize(20).text(`${location}`, 170, 270)

   doc.fillColor('white').fontSize(20).text('github', 290, 270)
   const widthGl = doc.widthOfString('github');
   const heightGl = doc.currentLineHeight();
   doc.link(290, 270, widthGl, heightGl, `${githubLink}`);


   doc.fillColor('white').fontSize(20).text("blog", 420, 270)
  const widthB = doc.widthOfString('blog');
  const heightB = doc.currentLineHeight();
  doc.link(420, 270, widthB, heightB, `${blog}`);

  

   doc.moveDown()
   doc.fillColor('black').fontSize(25)
   .text('I build things and teach people to code', 100)

   
   // finalize the PDF and end the stream
   doc.end();
   


};
