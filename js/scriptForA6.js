/*  91.461 Assignment: Assignment No. 6 Creating an Interactive Dynamic Table
Name: Elick Coval
Email address: elick_coval@student.uml.edu
Affiliation: Senior computer science student in GUI Programming I at Umass Lowell
File Updated: 11/14/19
Description of file: Javescript file where the validation and calculation
occurs for the multiplication table.


Copyright (c) 2019 by Elick Coval. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author. */

$(document).ready(function(){
  var table = document.getElementById("table");


  $("#submit").click(function(){
    // Local variables
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
      // Local variables
      var x1 = document.getElementById("xMin");
      var x2 = document.getElementById("xMax");
      var y1 = document.getElementById("yMin");
      var y2 = document.getElementById("yMax");
      var er = document.getElementById("error");

      if (xMin == "" || Number(xMin) > Number(xMax)){          // if no entry or invalid
        x1.setCustomValidity("ERROR");                        // red border
        $("#xMin").val("");                                   // clear text field
        x1.placeholder="Error: Please enter a min integer";
        er.style.visibility = "visible";
        hideTable = true;
      }
      else {x1.setCustomValidity("");}                        // hide red border

      if (xMax == "" || Number(xMax) < Number(xMin)){
        x2.setCustomValidity("ERROR");
        $("#xMax").val("");
        x2.placeholder="Error: Please enter a max integer";
        er.style.visibility = "visible";
        hideTable = true;
      }
      else {x2.setCustomValidity("");}

      if (yMin == "" || Number(yMin) >Number(yMax)){
        y1.setCustomValidity("ERROR");
        $("#yMin").val("");
        y1.placeholder="Error: Please enter a min integer";
        er.style.visibility = "visible";
        hideTable = true;
      }
      else {y1.setCustomValidity("");}

      if (yMax == "" || Number(yMax) < Number(yMin)){
        y2.setCustomValidity("ERROR");
        $("#yMax").val("");
        y2.placeholder="Error: Please enter a max integer";
        er.style.visibility = "visible";
        hideTable = true;
      }
      else {y2.setCustomValidity("");}

      if (!hideTable){
        er.style.visibility = "hidden";                    // hide the error message if the table is hidden
      }
    }

    function populateArrays(){                             // round every number added to each array
      for (i = 0; i <= xLength; i++){
        xArray[i] = Math.round(xMin);
        xMin++;
      }
      for (i = 0; i <= yLength; i++){
        yArray[i] = Math.round(yMin);
        yMin++;
      }
    }

    function buildX(col){                                 // build horizontal header row
      for(i=0; i <= col; i++){
        headStart += ("<th>" + xArray[i] + "</th>");
      }
      headStart += headEnd;
    }

    function buildY(row, col){                            // build vertical head along with corresponding rows
      for(i = 0; i <= row; i++){
        bodyStart += ("<tr><th>" + yArray[i] + "</th>");  //
        for(j = 0; j <= col; j++){
          bodyStart += ("<td>" + xArray[j] * yArray[i] + "</td>");
        }
        bodyStart += "</tr>";
      }}

      function refreshTable(){                         // add built strings to respective sections
        $("#myTable > thead").html(headStart);
        $("#myTable > tbody").html(bodyStart);
      }

      function displayTable(){
        if (!hideTable){
          table.style.display = "block";
        }
        else{ table.style.display = "none"; }
      }

    });
  });
