const inquirer = require("inquirer");
const fs = require("fs");
const {Triangle, Square, Circle} = require("./Lib/shape");
function writeToFile(fileName, answers) {
    let svgString = "";
    svgString = '<svg version="1.1" width="300" height="200">';
svgString += "<g>";
svgString += `${answers.shape}`;

let shapeChoice;
if (answers.shape === "triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}`;
    } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
   } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
   }
   
   svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textcolor}">${answers.text}</text>`;
   svgString  += "</g>";
   svgString += "</svg>";

   fs.writeFile(fileName, svgString, (err) =>{
    err ? console.log(err) : console.log("generated logo.svg");
   });
}

function promptUser() {
    inquirer
    .prompt([
{
    type: "input",
    message: "what text would you like your logo to display?",
    name: "text",
},
{
    type: "input",
    message: "what text color would you like to display?",
    name: "textColor",
},
{
    type: "list",
    message: "what shape would prefer?",
    choices: ["triangle", "Square", "Circle"],
    name: "shape",
},
{
    type: "input",
    message: "choose a color for the shape.",
    name: "shapeBackgroundColor",
},
    ])
    .then((answers) => {
        if (answers.text.length > 3) {
            console.log("must entera value of no more than 3 characters");
            promptUser();
        }else{
            writeToFile("logo.svg", answers);
        }
    });
}

promptUser(); 