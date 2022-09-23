"use strict"; 
/* Next modify assignment4.html to include the JavaScript code required for field validation.
 * !!- All the fields are mandatory (cannot be left blank)
 * !!- The postal code has to be in the a0a0a0 format – (research it on the internet)
 * !!- Province is one of QC, ON, MN, SK, AB, BC.
 * !!- Age has to be at least 18 yrs. old.
 * !!- The Email field must contain the @ and . characters
 * (5% of the mark for using a regular expression – research it on the internet)
 * *- The Confirm Password and Password fields should have identical input.
 * !!- Passwords must have at least 6 characters and must contain at least one digit and one upper-case character.
 * (5% of the mark for using a regular expression – research it on the internet)
 * *!- When the form fields pass validation, an alert message is displayed to show a
 * confirmation message (e.g. “Thanks for registering with our website, your customer record was created successfully.”).
 */

/* Fields */
var MembershipFields = document.querySelectorAll(".membership input");
const FNAME = 0;
const LNAME = 1;
const ADDRESS = 2;
const CITY = 3;
const ZIP = 4;
const PROVINCE = 5;
const AGE = 6;
const PASS = 7;
const CONFIRM = 8;
const EMAIL = 9;

/* Inicialization */
function initialization(){
    initializemembership();
}

/* Validation functions */
function fNameValidation(){
    if(MembershipFields[FNAME].value.length > 0 && MembershipFields[FNAME].value.length < 17){
        MembershipFields[FNAME].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[FNAME].title;
        MembershipFields[FNAME].setCustomValidity(message);
        MembershipFields[FNAME].reportValidity();
    }
}

function lNameValidation(){
    if(MembershipFields[LNAME].value.length > 0 && MembershipFields[LNAME].value.length < 32){
        MembershipFields[LNAME].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[LNAME].title;
        MembershipFields[LNAME].setCustomValidity(message);
        MembershipFields[LNAME].reportValidity();
    }
}

function addressValidation(){
    if(MembershipFields[ADDRESS].value.length > 0 && MembershipFields[ADDRESS].value.length < 32){
        MembershipFields[ADDRESS].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[ADDRESS].title;
        MembershipFields[ADDRESS].setCustomValidity(message);
        MembershipFields[ADDRESS].reportValidity();
    }
}

function cityValidation(){
    if(MembershipFields[CITY].value.length > 0 && MembershipFields[CITY].value.length < 32){
        MembershipFields[CITY].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[CITY].title;
        MembershipFields[CITY].setCustomValidity(message);
        MembershipFields[CITY].reportValidity();
    }
}

function zipValidation(){
    var pattern = /^([A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1})$/;
    MembershipFields[ZIP].value = MembershipFields[ZIP].value.toLowerCase();

    if(pattern.test(MembershipFields[ZIP].value)){
        MembershipFields[ZIP].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[ZIP].title;
        MembershipFields[ZIP].setCustomValidity(message);
        MembershipFields[ZIP].reportValidity();
    }
}

function provinceValidation(){
    var pattern = /^(QC|ON|MN|SK|AB|BC)$/;
    MembershipFields[PROVINCE].value = MembershipFields[PROVINCE].value.toUpperCase();

    if(pattern.test(MembershipFields[PROVINCE].value)){
        MembershipFields[PROVINCE].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[PROVINCE].title;
        MembershipFields[PROVINCE].setCustomValidity(message);
        MembershipFields[PROVINCE].reportValidity();
    }
}

function ageValidation(){
    var pattern = /^(1[89]|[2-9][0-9]|1[01][0-9]|12[0-3])$/;

    if(pattern.test(MembershipFields[AGE].value)){
        MembershipFields[AGE].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[AGE].title;
        MembershipFields[AGE].setCustomValidity(message);
        MembershipFields[AGE].reportValidity();
    }
}

function emailValidation(){
    var pattern = /^([_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]+)*@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*(\.[a-z]{2,6}))$/;

    if(pattern.test(MembershipFields[EMAIL].value)){
        MembershipFields[EMAIL].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[EMAIL].title;
        MembershipFields[EMAIL].setCustomValidity(message);
        MembershipFields[EMAIL].reportValidity();
    }
}

function passValidation(){
    var pattern = /^((?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,})$/;

    if(pattern.test(MembershipFields[PASS].value)){
        MembershipFields[PASS].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[PASS].title;
        MembershipFields[PASS].setCustomValidity(message);
        MembershipFields[PASS].reportValidity();
    }
}

function confirmValidation(){
    if(MembershipFields[CONFIRM].value == MembershipFields[PASS].value){
        MembershipFields[CONFIRM].setCustomValidity("");
    } else{
        message = "Please Follow the instructions!\n" + MembershipFields[CONFIRM].title;
        MembershipFields[CONFIRM].setCustomValidity(message);
        MembershipFields[CONFIRM].reportValidity();
    }
}

/* initialization of fields*/
function initializemembership(){
    /* Making every field required*/ 
    for(var counter = 0; counter < MembershipFields.length; counter++){
        MembershipFields[counter].required=true;
    }
    /* Placeholder Backward compatible*/
    if(!Modernizr.input.placeholder){
        document.getElementById("firstName").value = "First Name";
        document.getElementById("lastName").value = "Last Name";
        document.getElementById("address").value = "### Street Name";
        document.getElementById("city").value = "City";
        document.getElementById("zip").value = "A1A1A1";
        document.getElementById("province").value = "QC or ON or MN or SK or AB or BC";
        document.getElementById("age").value = "18+";
        document.getElementById("pass").value = "A1pass";
        document.getElementById("email").value = "username@provider.ca";
    } else{
        for(var counter = 0; counter < MembershipFields.length; counter++){
            MembershipFields[counter].value="";
        }
    }
}

/* Placeholder Backward compatible: erasing fields*/
function eraseField(event) {
    event.currentTarget.value = "";
}

/* Placeholder Backward compatible: refilling fields*/
function reFill(event) {
    if(event.currentTarget.value == ""){
        switch(event.currentTarget.id){
            case "firstName":
                event.currentTarget.value = "First Name";
                break;
            case "lastName":
                event.currentTarget.value = "Last Name";
                break;
            case "address":
                event.currentTarget.value = "### Street Name";
                break;
            case "city":
                event.currentTarget.value = "City";
                break;
            case "zip":
                event.currentTarget.value = "A1A1A1";
                break;
            case "province":
                event.currentTarget.value = "QC or ON or MN or SK or AB or BC";
                break;
            case "age":
                event.currentTarget.value = "18+";
                break;
            case "pass":
                event.currentTarget.value = "A1pass";
                break;
            case "email":
                event.currentTarget.value = "username@provider.ca";
                break;
        }
    }
}

/*Validation */
var message;
function validate(){
    var counter;
    var passed = 0;

    for(counter = (MembershipFields.length-1); counter >= 0 ; --counter){
        if(!MembershipFields[counter].checkValidity()){
            message = "Please Follow the instructions!\n" + MembershipFields[counter].title;
            MembershipFields[counter].setCustomValidity(message);
        } else {
            MembershipFields[counter].setCustomValidity("");
            passed++;
        } 
    }
    if(passed == MembershipFields.length){
        window.alert("Thanks for registering with our website, your customer record was created successfully.")
    }
}

/*Listeners */
/*new browsers (addEventListener)*/
if(MembershipFields[0].addEventListener){
    /* Inicialization*/
    window.addEventListener("load", initialization, false);

    /* validation listners */
    MembershipFields[FNAME].addEventListener("change", fNameValidation, false);
    MembershipFields[LNAME].addEventListener("change", lNameValidation, false);
    MembershipFields[ADDRESS].addEventListener("change", addressValidation, false);
    MembershipFields[CITY].addEventListener("change", cityValidation, false);
    MembershipFields[ZIP].addEventListener("change", zipValidation, false);
    MembershipFields[PROVINCE].addEventListener("change", provinceValidation, false);
    MembershipFields[AGE].addEventListener("change", ageValidation, false);
    MembershipFields[EMAIL].addEventListener("change", emailValidation, false);
    MembershipFields[PASS].addEventListener("change", passValidation, false);
    MembershipFields[PASS].addEventListener("change", confirmValidation, false);
    MembershipFields[CONFIRM].addEventListener("change", confirmValidation, false);

    document.getElementById("submit").addEventListener("click", validate, false);

    /* for placeholder backward compability*/
    if(!Modernizr.input.placeholder){
        /* for eraseField */
        for(var counter = 0; counter < MembershipFields.length; counter++){
            MembershipFields[counter].addEventListener("focus", eraseField, false);
        }
        /* for reFill */
        for(var counter = 0; counter < MembershipFields.length; counter++){
            MembershipFields[counter].addEventListener("blur", reFill, false);
        }
    }
    /*older browsers (attachEvent)*/
} else if(MembershipFields[0].attachEvent) {
    /* Inicialization*/
    window.addEventListener("load", initialization, false);

    /* validation listners */
    MembershipFields[FNAME].attachEvent("onchange", fNameValidation, false);
    MembershipFields[LNAME].attachEvent("onchange", lNameValidation, false);
    MembershipFields[ADDRESS].attachEvent("onchange", addressValidation, false);
    MembershipFields[CITY].attachEvent("onchange", cityValidation, false);
    MembershipFields[ZIP].attachEvent("onchange", zipValidation, false);
    MembershipFields[PROVINCE].attachEvent("onchange", provinceValidation, false);
    MembershipFields[AGE].attachEvent("onchange", ageValidation, false);
    MembershipFields[EMAIL].attachEvent("onchange", emailValidation, false);
    MembershipFields[PASS].attachEvent("onchange", passValidation, false);
    MembershipFields[PASS].attachEvent("onchange", confirmValidation, false);
    MembershipFields[CONFIRM].attachEvent("onchange", confirmValidation, false);

    document.getElementById("submit").attachEvent("onclick", validate, false);

    /* for placeholder backward compability*/
    if(!Modernizr.input.placeholder){
        /* for eraseField */
        for(var counter = 0; counter < MembershipFields.length; counter++){
            MembershipFields[counter].attachEvent("onfocus", eraseField, false);
        }
        /* for reFill */
        for(var counter = 0; counter < MembershipFields.length; counter++){
            MembershipFields[counter].attachEvent("onblur", reFill);
        }
    }
}