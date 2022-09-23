function calculateIntake() {
    var metric = document.getElementById("metric");
    var female = document.getElementById("female");
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var feet = document.getElementById("feet");
    var age = document.getElementById("age");
    var activity = document.getElementById("activity");


    var BDR = document.getElementById("bdr");
    var intake = document.getElementById("intake");

    if (metric.checked) {
        if (female.checked) {
            BDR.value = 665 + (9.563 * weight.value) + (1.85 * height.value) - (4.676 * age.value);
        } else {
            BDR.value = 66.5 + (13.76 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
        }
    } else {
        if (female.checked) {
            BDR.value = 665 + (4.35 * weight.value) + (4.7 * height.value) + (4.7 * (12 * feet.value)) - (4.7 * age.value);
        } else {
            BDR.value = 66 + (6.2 * weight.value) + (12.7 * height.value) + (12.7 * (12 * feet.value)) - (6.76 * age.value);
        }
    }

    intake.value = activity.value * BDR.value;
}
document.getElementById("submit").onclick = calculateIntake;

function unitSystemFunc() {
    var metric = document.getElementById("metric");

    if (metric.checked) {
        var heightin = document.getElementById("height").value;
        var heightfeet = document.getElementById("feet").value;

        document.getElementById("feet").style.visibility = "hidden";
        document.getElementById("feet").style.marginLeft = "-54px";
        document.getElementById("feetSym").innerHTML = "";
        document.getElementById("heightRange").innerHTML = "(0~275) cm";
        document.getElementById("height").max = 275;
        document.getElementById("height").value = 2.54 * heightin + 2.54 * (12 * heightfeet);

        document.getElementById("weightRange").innerHTML = "(0~595) kg";
        document.getElementById("weightalign").style.marginLeft = "-13px";
        document.getElementById("weight").max = 595;
        document.getElementById("weight").value *= 0.45359237;
    } else {
        var heightcm = document.getElementById("height").value;
        var heightfeet = document.getElementById("feet").value;

        document.getElementById("feet").style.visibility = "visible";
        document.getElementById("feet").style.marginLeft = "-70px";
        document.getElementById("feetSym").innerHTML = " '";
        document.getElementById("heightRange").innerHTML = '" (0~'+"8'"+'11")';
        document.getElementById("height").max = 108;
        document.getElementById("height").value = (heightcm / 2.54) - (12 * heightfeet);

        document.getElementById("weightRange").innerHTML = "(0~1312) lbs";
        document.getElementById("weightalign").innerHTML = "&nbsp;&nbsp;&nbsp;";
        document.getElementById("weightalign").style.marginLeft = "0px";
        document.getElementById("weight").max = 1312;
        document.getElementById("weight").value /= 0.45359237;
    }
}
document.getElementById("metric").onchange = unitSystemFunc;
document.getElementById("imperial").onchange = unitSystemFunc;

function activityValue() {
    var activity = document.getElementById("activity").value

    document.getElementById("sup").innerHTML = "(" + activity + " x BDR)&nbsp;&nbsp;"
}
document.getElementById("activity").onchange = activityValue;


function resetButton(){
    var imperial = document.getElementById("imperial");
	imperial.checked = true;
    unitSystemFunc();
    document.getElementById("activity").value = 1.2;
    activityValue();
}
document.getElementById("reset").onclick = resetButton;

function keyboardLimits() {
    var imperial = document.getElementById("imperial");
    var age = document.getElementById("age");
    var feet = document.getElementById("feet");
    var height = document.getElementById("height");
    var weight = document.getElementById("weight");

    if (age.value < 0 || age.value > 123) {
        age.value = null;
        alert("You are trying to exceed the field limit");
    }
    if (feet.value < 0) {
        feet.value = null;
        alert("You are trying to exceed the field limit");
    }
    if (height.value < 0) {
        height.value = null;
        alert("You are trying to exceed the field limit");
    }
    if (weight.value < 0) {
        weight.value = null;
        alert("You are trying to exceed the field limit");
    }

    if (imperial.checked) {
        if (feet.value > 8) {
            feet.value = null;
            alert("You are trying to exceed the field limit");
        }
        if (height.value > 11) {
            height.value = null;
            alert("You are trying to exceed the field limit");
        }
        if (weight.value > 1312) {
            weight.value = null;
            alert("You are trying to exceed the field limit");
        }
    } else {
        if (height.value > 275) {
            height.value = null;
            alert("You are trying to exceed the field limit");
        }
        if (weight.value > 595) {
            weight.value = null;
            alert("You are trying to exceed the field limit");
        }

    }


}
document.getElementById("age").onkeyup = keyboardLimits;
document.getElementById("feet").onkeyup = keyboardLimits;
document.getElementById("height").onkeyup = keyboardLimits;
document.getElementById("weight").onkeyup = keyboardLimits;
