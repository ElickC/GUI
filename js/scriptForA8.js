/*  91.461 Assignment: Assignment No. 8 Using the jQuery UI Slider and Tab Widgets
Name: Elick Coval
Email address: elick_coval@student.uml.edu
Affiliation: Senior computer science student in GUI Programming I at Umass Lowell
File Updated: 12/8/19
Description of file: Javescript file where the validation and calculation
occurs for the multiplication table.


Copyright (c) 2019 by Elick Coval. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

I had to rework how my table was created in order to get the tabs working.

Drew some inspriation from the source the professor provided us with as well as:


https://stackoverflow.com/questions/18572586/append-to-dynamically-created-tab
https://stackoverflow.com/questions/605969/jquery-count-number-of-list-elements
https://jsfiddle.net/EKBqy/
https://jqueryui.com/tabs/#manipulation
https://api.jqueryui.com/tabs/#method-destroy
*/

// wait for dom to be ready
$(document).ready(function(){

  $("#xMinSlider").slider({                                     // For each slider
    min: -55,
    max: 55,
    value: 0,
    slide: function( event, ui ){                               // Set the corresponding input box value to the slider's value
      $("#xMin").val( $("#xMinSlider").slider("value"));
      buildTable();
    }
  });

  $("#xMin").on("change", function(){                             // When the input box value changes, set the slider to the new value and redraw the table
    $("#xMinSlider").slider("value", parseInt($("#xMin").val()));
    buildTable();
  })

  $("#xMaxSlider").slider({
    min: -55,
    max: 55,
    value: 0,
    slide: function( event, ui ){
      $("#xMax").val( $("#xMaxSlider").slider("value"));
      buildTable();
    }
  });

  $("#xMax").on("change", function(){
    $("#xMaxSlider").slider("value", parseInt($("#xMax").val()));
    buildTable();
  })

  $("#yMinSlider").slider({
    min: -55,
    max: 55,
    value: 0,
    slide: function( event, ui ){
      $("#yMin").val( $("#yMinSlider").slider("value"));
      buildTable();
    }
  });

  $("#yMin").on("change", function(){
    $("#yMinSlider").slider("value", parseInt($("#yMin").val()));
    buildTable();
  })

  $("#yMaxSlider").slider({
    min: -55,
    max: 55,
    value: 0,
    slide: function( event, ui ){
      $("#yMax").val( $("#yMaxSlider").slider("value"));
      buildTable();
    }
  });

  $("#yMax").on("change", function(){
    $("#yMaxSlider").slider("value", parseInt($("#yMax").val()));
    buildTable();
  })
  $("#yMaxSlider").slider();

  var tabIndex = 1;

  $("#saveTable").click(function(){           // Save Table button click function

    if ($("#inputForm").valid()){

    var tabCount = $("#tabs li").length + 1;

    if(tabCount > 6) {
      alert("Sorry, only 6 multiplication tables may be saved at the same time. Please delete one to save another table.");
      return false;
    }


    $( "#tabs" ).tabs();                  // Initialize the tabs.

    var xMin = parseInt($("#xMin").val());          // Get the dimensions of the current table
    var xMax = parseInt( $("#xMax").val());
    var yMin = parseInt( $("#yMin").val());
    var yMax = parseInt( $("#yMax").val());

    tabIndex++;                         // Increment the index each time a new tab is added.


    var tabTitle = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + xMin +        // Create the title bar
                " to " + xMax + " by " + yMin + " to " + yMax + "</a>" +
                "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

    $( "div#tabs ul" ).append( tabTitle );                // Add a new Title bar.

    $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#table").html() + '</div>');        // Add the current table.

    $( "#tabs" ).tabs("refresh");  // Refresh the tabs so the new tab shows up.

    $( "#tabs" ).tabs("option", "active", -1);        // Make the new tab active, so that the user knows it updated.


    $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {                // Add a remove button, from jQuery UI's webpage: https://jqueryui.com/tabs/#manipulation
        var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelID ).remove();


        try {                                   // Refresh tabs and catch exceptions
          $( "#tabs" ).tabs("refresh");
        }
        catch (e) {
          //console.log(e);
        }



        if( $('div#tabs ul li.tab').length == 0) {              // Reset the page to way it was before if last tab
          try {
            $("#tabs").tabs("destroy");
          }
          catch (e) {
            //console.log(e);
          }

          return false;                                // Prevents default behavior from happening.
        }
    });
  }});



  $("#deleteTabs").click(function(){                // delete saved tabs button click
    $('#tabs .ui-tabs-nav a').each(function() {     // for every tab
        $("#tabs span.ui-icon-close").click()       // click it's close button
    });
  });


  $("#inputForm").validate({           // validation rules
    rules: {
      xMin: {
        required: true,
        number: true,
        lessThan: "#xMax",
        range: [-55,55]
      },
      xMax: {
        required: true,
        number: true,
        greaterThan: "#xMin",
        range: [-55,55]
      },
      yMin: {
        required: true,
        number: true,
        lessThan: "#yMax",
        range: [-55,55]
      },
      yMax: {
        required: true,
        number: true,
        greaterThan: "#yMin",
        range: [-55,55]
      }
    },
    messages: {                  // error messages
      xMin: {
        required: "Please enter a value",
        lessThan: "Please enter a value less than the Max Column",
        number: "Please enter an integer",
        min: "Please enter a value between -55 and 55"
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

  function buildTable() {
    // Local variables
    var xArray = [];
    var yArray = [];
    var xMin = parseInt($("#xMin").val());
    var xMax= parseInt($("#xMax").val());
    var yMin = parseInt($("#yMin").val());
    var yMax = parseInt($("#yMax").val());
    var xLength = xMax - xMin;
    var yLength = yMax - yMin;
    var tableContent = "";
    var tableStart = "<table class=\"table table-bordered table-dark\" id=\"myTable\"><thead>";
    var headStart = "<tr><th></th>";
    var headBody = "";
    var headEnd = "</tr></thead>";
    var bodyStart = "<tbody>";
    var tableBody = "";
    var bodyEnd = "</tr></tbody>";
    var tableEnd = "</table>";
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

      if (xLength > 55 || yLength > 55){
        er.style.visibility = "visible";
        hideTable = true;
      }

      if (!hideTable){
        er.style.visibility = "hidden";                    // hide the error message if the table is hidden
      }
    }

    function populateArrays(){                             // round every number added to each array
      for (i = 0; i <= xLength; i++){
        xArray[i] = xMin;
        xMin++;
      }
      for (i = 0; i <= yLength; i++){
        yArray[i] = yMin;
        yMin++;
      }
    }

    function buildX(col){                                 // build horizontal header row
      tableContent += tableStart;
      tableContent += headStart;
      for(i=0; i <= col; i++){
        headBody += ("<th>" + xArray[i] + "</th>");
      }
      tableContent += headBody;
      tableContent += headEnd;
    }

    function buildY(row, col){                           // build vertical head along with corresponding rows
      tableContent += bodyStart;
      for(i = 0; i <= row; i++){
        tableBody += ("<tr><th>" + yArray[i] + "</th>");  //
        for(j = 0; j <= col; j++){
          tableBody += ("<td>" + xArray[j] * yArray[i] + "</td>");
        }
        tableBody += "</tr>";
      }
      tableContent += tableBody;
      tableContent += bodyEnd;
      tableContent += tableEnd;
    }

      function refreshTable(){                         // add built strings to respective sections
        $("#table").html(tableContent);
      }

      function displayTable(){
        if (!hideTable){
          $("#table").show();
          er.style.visibility = "hidden";
        }
        else{
        $("#table").hide();
          er.style.visibility = "visible";
        }
      }

    }
  });
