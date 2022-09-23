"use strict"; // interpret document contents in JavaScript strict mode

/******************* global variables **********************/
var AJAXData;
var rotationTime;

/*********************** Algorithm *************************/
//Main: run setUpPage() function when page finishes loading
$(window).on("load", setUpPage);

//Create event listeners and populate image elements
function setUpPage() {
   //variables
   createEventListeners();
   getAJAX();
}

// Called by setUpPage
function createEventListeners(){
   $('#rightarrow').on("click", rightArrow);
   $('#leftarrow').on("click", leftArrow);
   $('#update').on("click", getAJAX);
}
//AJAX
function getAJAX(){
   //variables
   var AJAXRequest = new XMLHttpRequest();

   if (typeof rotationTime !== 'undefined'){
      clearTimeout(rotationTime);
   }

   var loc = window.location.pathname;
   var dir = loc.substring(0, loc.lastIndexOf('/'));
   console.log(dir);
   
   AJAXRequest.open('GET', './photos.txt');
   AJAXRequest.send();
   AJAXRequest.onload = function()
   {
      AJAXData = JSON.parse(AJAXRequest.responseText);
      populateFigures();
      rotationTime = setTimeout(rightArrow, AJAXData[0].visibleTime);
   };
}

function populateFigures(){
   var i=0;
   $("article figure").children()[i].src = "./images/" + AJAXData[AJAXData.length-1].name;
   for (i=1; i < $("article figure").length; i++){
      if(typeof AJAXData[i-1] !== 'undefined'){
         $("article figure").children()[i].src = "./images/" + AJAXData[i-1].name;
      } else{
         $("article figure").children()[i].src = "./images/" + AJAXData[AJAXData.length-1].name;
      }
   }
}

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   clearTimeout(rotationTime);
   var image = AJAXData.shift();
   AJAXData.push(image);
   $("article figure").fadeOut(100, populateFigures);
   $("article figure").fadeIn(100);
   rotationTime = setTimeout(rightArrow, AJAXData[0].visibleTime);
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   clearTimeout(rotationTime);
   var image = AJAXData.pop();
   AJAXData.unshift(image);
   $("article figure").fadeOut(100, populateFigures);
   $("article figure").fadeIn(100);
   rotationTime = setTimeout(leftArrow, AJAXData[0].visibleTime);
}

