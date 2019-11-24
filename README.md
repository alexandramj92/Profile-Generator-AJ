# Github Profile Generator

## Description

The user inputs a github username and their favorite color in the command line and a pdf of that username's profile is generated. 

## Usage

After the user inputs the github username of the person they would like to generate a pdf from. An axios request is made to retrieve the following information from the Github API: name, company, city, link to github profile, link to blog, # of public repositories, # of followers, # of github stars, and # following. 

Additionally, the user is prompted to input their favorite color. The color is used for the background of the cards in the PDF. 

See example of how the aplication functions below. 
![Pdf profile generator](Profile-Generator.mp4)

I used the pdfkit npm package to generate the pdf with the data retrieved from github. 

## Issues

 I initially wanted to include the profile image of the github username but unfortunately pdfkit does not support generating an image from a url. The github API returns a url and I could not find a solution to this issue so I decided not to include a profile image in the PDF. Additionally, I tried using another package but ones I tried were not working. 

## Requirements

The packages that need to be installed are fs, axios, inquirer, and pdfkit. 

