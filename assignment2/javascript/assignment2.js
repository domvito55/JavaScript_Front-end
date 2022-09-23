function drawTable() {
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    var table = document.getElementsByTagName("table")[0];
    var newRow = "";

    var i = 0;
    var j = 0;

    table.innerHTML = "";
    for(i=0;i<rows;i++){
        newRow = "<tr>";
        for(j=0;j<cols;j++){
            newRow += `<td>${i+1},${j+1}</td>`;
        }
        newRow += "</tr>";
        table.innerHTML += newRow;
    }

    table.style.border = "1px solid black"
}
document.getElementById("submit").onclick = drawTable;

function keyboardLimits() {
    var rows = document.getElementById("rows");
    var cols = document.getElementById("cols");

    if (rows.value < 0 || rows.value > 100) {
        rows.value = null;
        alert("You are trying to exceed the field limit");
    }
    if (cols.value < 0 || cols.value > 100 ) {
        cols.value = null;
        alert("You are trying to exceed the field limit");
    }
}
document.getElementById("rows").onkeyup = keyboardLimits;
document.getElementById("cols").onkeyup = keyboardLimits;
