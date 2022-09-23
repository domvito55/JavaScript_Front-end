"use strict"; 
var billingFields = document.querySelectorAll(".billing input, .billing select");
var deliveryFields = document.querySelectorAll(".delivery input, .delivery select");

/* Inicialization */
window.onload = initialization;
function initialization(){
    initializeBilling();
    initializeDelivery();
}

function initializeBilling(){
    if(!Modernizr.input.placeholder){
        document.getElementById("firstNameB").value = "First Name";
        document.getElementById("lastNameB").value = "Last Name";
        document.getElementById("streetB").value = "### Street Name";
        document.getElementById("cityB").value = "City";
        document.getElementById("provinceB").selectedIndex = "-1";
        document.getElementById("zipB").value = "A1A 1A1";
        document.getElementById("phoneB").value = "### ### ####";
    } else{
        for(var counter = 0; counter < billingFields.length; counter++){
            if(billingFields[counter].tagName == "select"){
                billingFields[counter].selectedIndex = "-1";
            }else{
                billingFields[counter].value="";
            }
        }
    }
}

function initializeDelivery(){
    if(!Modernizr.input.placeholder){
        document.getElementById("firstNameD").value = "First Name";
        document.getElementById("lastNameD").value = "Last Name";
        document.getElementById("streetD").value = "### Street Name";
        document.getElementById("cityD").value = "City";
        document.getElementById("provinceD").selectedIndex = "-1";
        document.getElementById("zipD").value = "A1A 1A1";
        document.getElementById("phoneD").value = "### ### ####";
    } else{
        for(var counter = 1; counter < deliveryFields.length; counter++){
            if(deliveryFields[counter].tagName == "select"){
                deliveryFields[counter].selectedIndex = "-1";
            }else{
                deliveryFields[counter].value="";
            }
        }
    }
}

/* Copy fields */
function copyFields() {
    if(document.getElementById("copy").checked){
        for(var counter = 0; counter < billingFields.length; counter++){
            deliveryFields[counter+1].value = billingFields[counter].value;
        }
    } else{
        initializeDelivery();
    }
}

/* Placeholder Backward compatible */
function eraseField(event) {
    event.currentTarget.value = "";
}

function reFill(event) {
    if(event.currentTarget.value == ""){
        switch(event.currentTarget.id){
            case "firstNameB":
            case "firstNameD":
                event.currentTarget.value = "First Name";
                break;
            case "lastNameB":
            case "lastNameD":
                event.currentTarget.value = "Last Name";
                break;
            case "streetB":
            case "streetD":
                event.currentTarget.value = "### Street Name";
                break;
            case "cityB":
            case "cityD":
                event.currentTarget.value = "City";
                break;
            case "provinceB":
            case "provinceD":
                event.currentTarget.selectedIndex = "-1";
                break;
            case "zipB":
            case "zipD":
                event.currentTarget.value = "A1A 1A1";
                break;
            case "phoneB":
            case "phoneD":
                event.currentTarget.value = "### ### ####";
                break;
        }
    }
}

/*Validation */
var message;
function validate(){
    var counter;
    for(counter = (deliveryFields.length-1); counter >= 0 ; --counter){
        if(!deliveryFields[counter].checkValidity()){
            message = "Please Follow the instructions!\n" + deliveryFields[counter].title;
            deliveryFields[counter].setCustomValidity(message);
        } else {
            deliveryFields[counter].setCustomValidity("");
        } 
    }
    for(counter = (billingFields.length-1); counter >= 0 ; --counter){
        if(!billingFields[counter].checkValidity()){
            message = "Please Follow the instructions!\n" + billingFields[counter].title;
            billingFields[counter].setCustomValidity(message);
        } else {
            billingFields[counter].setCustomValidity("");
        } 
    }
}
document.getElementById("submit").onclick = validate;

function clearMessage(){
    for(var counter = (billingFields.length-1); counter >= 0 ; --counter){
        deliveryFields[counter+1].setCustomValidity("");
        billingFields[counter].setCustomValidity("");
    }
}

/*Listeners */
/*new browsers (addEventListener)*/
if(deliveryFields[0].addEventListener){
    /* for copyFields */
    deliveryFields[0].addEventListener("click", copyFields, false);
    /* for placeholder backward compability*/
    if(!Modernizr.input.placeholder){
        /* for eraseField */
        for(var counter = 0; counter < billingFields.length; counter++){
            billingFields[counter].addEventListener("focus", eraseField, false);
            deliveryFields[counter+1].addEventListener("focus", eraseField, false);
        }
        /* for reFill */
        for(var counter = 0; counter < billingFields.length; counter++){
            billingFields[counter].addEventListener("blur", reFill, false);
            deliveryFields[counter+1].addEventListener("blur", reFill, false);
        }
    }
    /* for clearMessage */
    for(var counter = 0; counter < billingFields.length; counter++){
        billingFields[counter].addEventListener("change", clearMessage, false);
    }
    for(var counter = 0; counter < deliveryFields.length; counter++){
        deliveryFields[counter].addEventListener("change", clearMessage, false);
    }
    
    /*older browsers (attachEvent)*/
} else if(deliveryFields[0].attachEvent) {
    /* for copyFields */
    deliveryFields[0].attachEvent("onclick", copyFields);
    /* for placeholder backward compability*/
    if(!Modernizr.input.placeholder){
        /* for eraseField */
        for(var counter = 0; counter < billingFields.length; counter++){
            billingFields[counter].attachEvent("onfocus", eraseField, false);
            deliveryFields[counter+1].attachEvent("onfocus", eraseField);
        }
        /* for reFill */
        for(var counter = 0; counter < billingFields.length; counter++){
            billingFields[counter].attachEvent("onblur", reFill);
            deliveryFields[counter+1].attachEvent("onblur", reFill);
        }
    }
    /* for clearMessage */
    for(var counter = 0; counter < billingFields.length; counter++){
        billingFields[counter].attachEvent("onchange", clearMessage, false);
    }
    for(var counter = 0; counter < deliveryFields.length; counter++){
        deliveryFields[counter].attachEvent("onchange", clearMessage, false);
    }
}