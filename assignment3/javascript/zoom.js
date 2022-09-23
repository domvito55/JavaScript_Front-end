"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
/* Src of big picture to be called */
var imgURL = window.opener.photoZoomed.src;
imgURL = imgURL.substring(0,imgURL.length-6) + ".jpg";

/* Buttons */
var addFav = document.getElementById("addFav");
var closeWin = document.getElementById("closeWin");

/* Adding new img node to favorites place */
function addToFav(){
   if(window.opener.numFav < 5){
      window.opener.numFav++;

      var newImage = window.opener.document.createElement("img");
      newImage.id = "img" + window.opener.numFav;
      newImage.src = window.opener.photoZoomed.src;
      newImage.value = window.opener.numFav;
      window.opener.fieldSet.appendChild(newImage);
      window.opener.addFavImgListener();
   } else {
      forbiddenAdd();

      window.alert("You've reached the maximum number of favorites. To add a new image, you need first to " +
      "erase one item from your favorites. Go to your favorites and click over the item you want to remove.")
     }
   window.close()
}

function closeWindow(){
   window.close()
}

if(addFav.addEventListener){
   addFav.addEventListener("click", addToFav, false);
   closeWin.addEventListener("click", closeWindow, false);
} else {
   addFav.attachEvent("onclick", addToFav, false);
   closeWin.attachEvent("onclick", closeWindow, false);
}

function forbiddenAdd(){
   addFav.style.backgroundColor = "#DDD";
   addFav.style.color = "#FFF";
}

/* populate img element and create event listener */
function pageSetup() {
   document.getElementsByTagName("img")[0].src = imgURL; // assign filename to img element
   if(window.opener.numFav >= 5){
      forbiddenAdd();
   }
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;