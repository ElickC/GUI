/*  91.461 Assignment: Assignment No.7 Using the jQuery Validation Plugin with Your Dynamic Table
Name: Elick Coval
Email address: elick_coval@student.uml.edu
Affiliation: Senior computer science student in GUI Programming I at Umass Lowell
File Updated: 12/1/19
Description of file: Javescript file where the validation and calculation
occurs for the multiplication table.

Drew some inspriation from https://jqueryvalidation.org/

Copyright (c) 2019 by Elick Coval. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author. */

// wait for dom to be ready
$(document).ready(function(){

  $("#inputForm").validate({           // validation rules
    rules: {
      xMin: {
        required: true,
        number: true,
        lessThan: "#xMax",
        range: [-250,250]
      },
      xMax: {
        required: true,
        number: true,
        greaterThan: "#xMin",
        range: [-250,250]
      },
      yMin: {
        required: true,
        number: true,
        lessThan: "#yMax",
        range: [-250,250]
      },
      yMax: {
        required: true,
        number: true,
        greaterThan: "#yMin",
        range: [-250,250]
      }
    },
    messages: {                  // error messages
      xMin: {
        required: "Please enter a value",
        lessThan: "Please enter a value less than the Max Column",
        number: "Please enter an integer",
        min: "Please enter a value between -250 and 250"
      },
      xMax: {
        required: "Please enter a value",
        greaterThan: "Please enter a value greater than the Min Column",
        number: "Please enter an integer",
        min: "Difference from Min Column too large"
      },
      yMin: {
        required: "Please enter a value",
        lessThan: "Please enter a value less than the Max Row",
        number: "Please enter an integer",
        checkRange: "Difference from Max Row too large"
      },
      yMax: {
        required: "Please enter a value",
        greaterThan: "Please enter a value greater than the Min Row",
        number: "Please enter an integer",
        checkRange: "Difference from Min Row too large"
      }
    }
  });

  // default greaterThan method wasn't working properly
  $.validator.addMethod( "greaterThan", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-lessThan-blur" ).length ) {
        target.addClass( "validate-lessThan-blur" ).on( "blur.validate-lessThan", function() {
            $( element ).valid();
        } );
    }
        var x = parseInt(value);
        var y = parseInt(target.val());
    return x > y;
  });

// default lessThan method wasn't working properly
$.validator.addMethod( "lessThan", function( value, element, param ) {
  var target = $( param );

  if ( this.settings.onfocusout && target.not( ".validate-lessThan-blur" ).length ) {
      target.addClass( "validate-lessThan-blur" ).on( "blur.validate-lessThan", function() {
          $( element ).valid();
      } );
  }
      var x = parseInt(value);
      var y = parseInt(target.val());
  return x < y;
});

// prevent refresh on submit form
  $("#inputForm").submit(function(e) {
    e.preventDefault();
});

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
    var er = document.getElementById("error");
    var table = document.getElementById("table");

    //  validateInput(xMin, xMax, yMin, yMax);
    if ($("#inputForm").valid()){
      populateArrays();
      buildX(xLength);
      buildY(yLength, xLength);
      refreshTable();
    }
    else{
      hideTable = true;

    }
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

      if (xLength > 500 || yLength > 500){
        er.style.visibility = "visible";
        hideTable = true;
      }

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
          er.style.visibility = "hidden";
        }
        else{
          table.style.display = "none";
          er.style.visibility = "visible";
        }
      }

    });
  });
