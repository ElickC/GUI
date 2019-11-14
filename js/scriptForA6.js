$(document).ready(function(){
  var table = document.getElementById("table");


  $("#submit").click(function(){
    var xArray = [];
    var yArray = [];
    var xMin = $("#xMin").val();
    var xMax= $("#xMax").val();
    var yMin = $("#yMin").val();
    var yMax = $("#yMax").val();
    var xLength = xMax - xMin;
    var yLength = yMax - yMin;
    var headStart = "<tr><th></th>";
    var headEnd = "</tr>";
    var bodyStart = "";
    var bodyEnd = "</tr>";
    var hideTable = false;

    validateInput(xMin, xMax, yMin, yMax);
    populateArrays();
    buildX(xLength);
    buildY(yLength, xLength);
    refreshTable();
    displayTable();

    function validateInput(xMin, xMax, yMin, yMax){
      var x1 = document.getElementById("xMin");
      var x2 = document.getElementById("xMax");
      var y1 = document.getElementById("yMin");
      var y2 = document.getElementById("yMax");

      if (xMin == "" || Number(xMin) > Number(xMax)){
        x1.setCustomValidity("ERROR");
        hideTable = true;
        console.log(xMin, xMax);
      }
      else {x1.setCustomValidity("");}

      if (xMax == "" ||Number(xMax) < Number(xMin)){
        x2.setCustomValidity("ERROR");
        hideTable = true;
      }
      else {x2.setCustomValidity("");}

      if (yMin == "" || Number(yMin) >Number(yMax)){
        y1.setCustomValidity("ERROR");
        hideTable = true;
      }
      else {y1.setCustomValidity("");}

      if (yMax == "" || Number(yMax) < Number(yMin)){
        y2.setCustomValidity("ERROR");
        hideTable = true;
      }
      else {y2.setCustomValidity("");}




     }




    function populateArrays(){
      for (i = 0; i <= xLength; i++){
        xArray[i] = xMin;
        xMin++;
      }
      for (i = 0; i <= yLength; i++){
        yArray[i] = yMin;
        yMin++;
      }
    }

    function buildX(col){
      for(i=0; i <= col; i++){
        headStart += ("<th>" + xArray[i] + "</th>");
      }
      headStart += headEnd;
    }

    function buildY(row, col){
      for(i = 0; i <= row; i++){
        bodyStart += ("<tr><th>" + yArray[i] + "</th>");
        for(j = 0; j <= col; j++){
          bodyStart += ("<td>" + xArray[j] * yArray[i] + "</td>");
        }
        bodyStart += "</tr>";
      }}

    function refreshTable(){
      $("#myTable > thead").html(headStart);
      $("#myTable > tbody").html(bodyStart);
    }

    function displayTable(){
      if (!hideTable){
        table.style.display = "block";
      }
      else{ table.style.display = "none" }
    }



  });

});
