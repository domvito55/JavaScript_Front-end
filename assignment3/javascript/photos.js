"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
/* galery */
var photoOrder = [1,2,3,4,5];
var listFigures = document.querySelectorAll("article figure");
var photoZoomed;

/* favorites */
var fieldSet = document.getElementById("favorites");
var numFav = 0;

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}

/* open center figure in separate window */
function zoomFig(event) {
   photoZoomed = event.currentTarget;
   var imgWidth = 980;
   var imgHeigh = 575;
   var winLeft;
   var winTop;
   var winOptions;

   if(screen.width < imgWidth){
      winLeft = 0;
   } else {
      winLeft = ((screen.width - imgWidth)/2);
   }

   if(screen.height < imgHeigh){
      winTop = 0;
   } else {
      winTop = ((screen.height - imgHeigh)/2);
   }

   winOptions = "width=" + imgWidth + ",height=" + imgHeigh + ",left=" + winLeft + ",top=" + winTop;

   window.open("./zoom.htm", "nome", winOptions);
}

/* creates X symbol */
function xSymbol(event){
   var existingSymbol = document.querySelectorAll("fieldset p");
   if(existingSymbol[0]){
      fieldSet.removeChild(existingSymbol[0]);
   }

   var deleteSymbol = document.createElement("p");
   deleteSymbol.innerHTML = "X";
   deleteSymbol.value = event.currentTarget.id;
   if(deleteSymbol.addEventListener){
      deleteSymbol.addEventListener("click", deleteFav, false);
   } else {
      deleteSymbol.attachEvent("onclick", deleteFav, false);
   }

   fieldSet.insertBefore(deleteSymbol, document.getElementById(deleteSymbol.value));
}

/* erase photo of favorites */
function deleteFav(event){
   event.currentTarget.style.color = "#ff0000";
   fieldSet.removeChild(document.getElementById(event.currentTarget.value));
   fieldSet.removeChild(event.currentTarget);
   numFav--;
}

/* called by the other screen to add a listener to the new favorite child */
function addFavImgListener(){
   var newFav = document.getElementById("img"+numFav);

   if(newFav.addEventListener){
      newFav.addEventListener("click", xSymbol, false);
   } else {
      newFav.attachEvent("onclick", xSymbol, false);
   }
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}

/* Called by setup */
function createEventListeners(){
   var rightButton = document.getElementById("rightarrow");
   var leftButton = document.getElementById("leftarrow");
   var counter;

   if(rightButton.addEventListener){
      rightButton.addEventListener("click", rightArrow, false);
      leftButton.addEventListener("click", leftArrow, false);
      for(counter = 0; counter < listFigures.length; counter++){
          listFigures[counter].children[0].addEventListener("click", zoomFig, false);
      }
   } else {
      rightButton.attachEvent("onclick", rightArrow, false);
      leftButton.attachEvent("onclick", leftArrow, false);
      for(counter = 0; counter < listFigures.length; counter++){
          listFigures[counter].children[0].attachEvent("onclick", zoomFig, false);
      }
  }
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}

function populateFigures(){
   var i=0;

   for(i=0; i<listFigures.length; i++){
      listFigures[i].children[0].src='./images/IMG_0' + photoOrder[i] + 'sm.jpg';
   }
}
