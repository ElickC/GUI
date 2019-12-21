/*  91.461 Assignment: Assignment No. 9 Implementing a Bit of Scrabble with Drag-and-Drop
Name: Elick Coval
Email address: elick_coval@student.uml.edu
Affiliation: Senior computer science student in GUI Programming I at Umass Lowell
File Updated: 12/20/19
Description of file: Javescript file for scrabble ui and logic

Copyright (c) 2019 by Elick Coval. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

The hardest part by far was getting the tiles to drag and drop correctly

Drew some inspriation from the sources the professor provided us as well as online resources:

https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.html
https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates
https://johnresig.com/blog/dictionary-lookups-in-javascript/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://api.jqueryui.com/draggable/
https://downing.io/GUI/assignment9.html
http://fpsmike80.github.io/
http://yongcho.github.io/GUI-Programming-1/assignment9.html#
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://stackoverflow.com/questions/1254665/jquery-draggable-droppable-how-to-snap-dropped-element-to-dropped-on-element
https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
https://stackoverflow.com/questions/38502010/get-attribute-id-of-a-div-element-thats-being-dragged-with-jquery
https://stackoverflow.com/questions/5735270/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of

*/

// wait for dom to be ready


// Data structure for the tiles provided by prof
var scrabbleTiles = [] ;
scrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "img" : "../images/scrabble/Scrabble_Tile_A.jpg"  } ;
scrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_B.jpg"  } ;
scrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_C.jpg"  } ;
scrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_D.jpg"  } ;
scrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "img" : "../images/scrabble/Scrabble_Tile_E.jpg"  } ;
scrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_F.jpg"  } ;
scrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "img" : "../images/scrabble/Scrabble_Tile_G.jpg"  } ;
scrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_H.jpg"  } ;
scrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "img" : "../images/scrabble/Scrabble_Tile_I.jpg"  } ;
scrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_J.jpg"  } ;
scrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_K.jpg"  } ;
scrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_L.jpg"  } ;
scrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_M.jpg"  } ;
scrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_N.jpg"  } ;
scrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "img" : "../images/scrabble/Scrabble_Tile_O.jpg"  } ;
scrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_P.jpg"  } ;
scrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_Q.jpg"  } ;
scrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_R.jpg"  } ;
scrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_S.jpg"  } ;
scrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_T.jpg"  } ;
scrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_U.jpg"  } ;
scrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_V.jpg"  } ;
scrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_W.jpg"  } ;
scrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_X.jpg"  } ;
scrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_Y.jpg"  } ;
scrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_Z.jpg"  } ;

// to return tiles to original state, Todo: elminate the need for this
function resetMasterTiles(){
  scrabbleTiles = [] ;
  scrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "img" : "../images/scrabble/Scrabble_Tile_A.jpg"  } ;
  scrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_B.jpg"  } ;
  scrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_C.jpg"  } ;
  scrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_D.jpg"  } ;
  scrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "img" : "../images/scrabble/Scrabble_Tile_E.jpg"  } ;
  scrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_F.jpg"  } ;
  scrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "img" : "../images/scrabble/Scrabble_Tile_G.jpg"  } ;
  scrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_H.jpg"  } ;
  scrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "img" : "../images/scrabble/Scrabble_Tile_I.jpg"  } ;
  scrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_J.jpg"  } ;
  scrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_K.jpg"  } ;
  scrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_L.jpg"  } ;
  scrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_M.jpg"  } ;
  scrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_N.jpg"  } ;
  scrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "img" : "../images/scrabble/Scrabble_Tile_O.jpg"  } ;
  scrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_P.jpg"  } ;
  scrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_Q.jpg"  } ;
  scrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_R.jpg"  } ;
  scrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_S.jpg"  } ;
  scrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "img" : "../images/scrabble/Scrabble_Tile_T.jpg"  } ;
  scrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "img" : "../images/scrabble/Scrabble_Tile_U.jpg"  } ;
  scrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_V.jpg"  } ;
  scrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_W.jpg"  } ;
  scrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_X.jpg"  } ;
  scrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "img" : "../images/scrabble/Scrabble_Tile_Y.jpg"  } ;
  scrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "img" : "../images/scrabble/Scrabble_Tile_Z.jpg"  } ;
}

// global vars for tile id's and score
var id = 1;
var score = 0;


// Data structure for keeping track of the board
var scrabbleBoard = {};
scrabbleBoard = [];
scrabbleBoard[0] = { "letterBonus": 1, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/boardTile.jpg"};
scrabbleBoard[1] = { "letterBonus": 2, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/Scrabble_DoubleLetter.jpg"};
scrabbleBoard[2] = { "letterBonus": 1, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/boardTile.jpg"};
scrabbleBoard[3] = { "letterBonus": 1, "wordBonus": 2, "letter": "", "tileId":0, "image": "../images/scrabble/Scrabble_DoubleWord.jpg"};
scrabbleBoard[4] = { "letterBonus": 1, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/boardTile.jpg"};
scrabbleBoard[5] = { "letterBonus": 1, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/boardTile.jpg"};
scrabbleBoard[6] = { "letterBonus": 2, "wordBonus": 1, "letter": "", "tileId":0, "image": "../images/scrabble/Scrabble_DoubleLetter.jpg"};

boardLength = scrabbleBoard.length;


$(document).ready(function(){

  // start but creating the board and tiles
  createBoard();
  addTilesToRack();

  function createBoard() {
    var image;
    var newTile;

    // add each board tile with correct sizing and dropping characteristics
    for (i = 0; i < boardLength; i++) {
        // console.log("scrabbleBoard Tile: " +   scrabbleBoard[i].letter + " with ID  " + scrabbleBoard[i].tileId);
        image = scrabbleBoard[i].image;
        newTile = $("<div class=\"tile\" tile=\"" + (i) + "\" style=\"background-image: url(" + image + ")\" />");
        newTile.css({"width": 93, "height": 101, "margin": 2, "border-width": 2, "border-radius": 10});
        $("#board").append(newTile);
        newTile.droppable({
          hoverClass: "drop-hover",
          tolerance: "intersect",
          drop: function(ev, ui) {
            scrabbleBoard[this.getAttribute("tile")].letter = ui.draggable.attr("letter");
            scrabbleBoard[this.getAttribute("tile")].tileId = ui.draggable.attr("id");

            // add the dropped piece to the board html for easy removal later
            (ui.draggable).detach().css({top: -5,left: -4}).appendTo(this);
            // printBoard();
          },

          // clear board data structure when tile is removed
          out: function(ev, ui) {
            scrabbleBoard[this.getAttribute("tile")].letter = "";
            scrabbleBoard[this.getAttribute("tile")].tileId = 0;
            // $("#tileRack").append(ui.draggable);
            // ui.draggable.css({"position": "relative", "top": "", "left": ""});
            (ui.draggable).detach().appendTo("#tileRack").css({top: 50});
          }
        });
      }
    }

  function clearBoard() {
    var tiles = $("#board img");

    // make sure data structure is correctly cleared
    for (var i = 0; i < boardLength; i++ ){
      if (scrabbleBoard[i].letter != ""){
        scrabbleBoard[i].tileId = 0;
        scrabbleBoard[i].letter = "";
        tiles.remove();
      }
    }
    calcBoardScore();
//    printBoard();
    }

  // remove the tile images from the top rack
    function clearRack(){
      var tiles = $("#tileRack img");
      tiles.remove();
    }

    function getNewTiles(x) {
      var rack = [];
      var remainingTiles = [];

      // Collect all of the remaining tile words and add them to the temp array
      for (var key in scrabbleTiles) {
        var remaining = scrabbleTiles[key]["number-remaining"];
        for (var i = 0; i < remaining; ++i) {
          remainingTiles.push(key);
        }
      }

      // for as many tiles as are called for
      for (var i = 0; i < x; i++) {
        // make sure there are tiles left to give
        if (remainingTiles.length > 0){
          // pick a random letter
          var randIndex = getRandomIntInclusive(0,25);
          // shrink range of possible random indices as letters are taken out
          while (randIndex > (remainingTiles.length-1)){
            randIndex = getRandomIntInclusive(0,(remainingTiles.length-1));
          }
          // console.log(" remainingTiles.length " + remainingTiles.length);
          var randLetter = remainingTiles[randIndex];
          // console.log("randIndex " + randIndex + ". randLetter:  " +  randLetter + ".");

          // add picked letter to be added to the rack
          rack.push(randLetter);
          // decrement global data structure
          --scrabbleTiles[randLetter]["number-remaining"];
          // remove picked letter from local array
          remainingTiles.splice(randIndex, 1);

        // ran out of letters to give, show error message and disable play word button
        } else {
           $("#err").show();
           $("#playWord").attr("disabled", true);
         }
       }

      return rack;
    }

    // get a unique id for each tile
    function getId(){
      return id++;
    }

    // how many tile images are on the rack
    function numTilesOnRack() {
      return $("#tileRack img").length;
    }

    function addTilesToRack() {
      var key;
      var tileId = 0;
      var newTile;
      var rack;

      clearBoard();

      // get needed number of tiles and insert/style them correctly
      rack = getNewTiles(7 - numTilesOnRack());
      $("#tileRack").droppable({
        drop: function(event, ui) {
            ui.draggable.draggable("option", "revert", true);
        }
      });

      for (i = 0; i < rack.length; ++i) {
        key = rack[i];
        tileId = getId();
        newTile = $("<img id=\"" + tileId + "\" src=\"" + scrabbleTiles[key]["img"] + "\" class=\"letterTile\" letter=\"" + key + "\" />");
        newTile.css({"top": 50, "margin": 4, "border-radius": 10});
        // Add tile image.
        $("#tileRack").append(newTile);


        // Make the tile draggable.
        newTile.draggable({
          snap: ".tile",
          stack: ".tile",
          snapMode: "inner",
          snapTolerance: 35,
          refreshPositions: true,
          revertDuration: 300,
          revert : function(event, ui) {

            // send tile back to the rack if taken off board
            $(this).data("uiDraggable").originalPosition = {
                top : 50,
                left : 0
            };
            // return boolean
            return !event;
            // that evaluate like this:
            // return event !== false ? false : true;
        }
        });
      }
    }

    // calculate word total each time through and add it to the total score
    function calcBoardScore(){
      var letter;
      var letterValue;
      var wordTotal = 0;
      var wordBonus = 1;


      for (i = 0; i < boardLength; i++) {
        letter = scrabbleBoard[i].letter;
        if (scrabbleBoard[i].letter != ""){
          letterValue = scrabbleTiles[letter].value;
          wordTotal += letterValue * scrabbleBoard[i].letterBonus;
          wordBonus *= scrabbleBoard[i].wordBonus;
          // console.log("INSIDE: letterValue: " + letterValue + "  scrabbleBoard[i].letterBonus:  " + scrabbleBoard[i].letterBonus + "  letter:  "
          //             + letter + "  wordBonus:  " + wordBonus + " wordTotal: " + wordTotal + "  score:  " + score);
        }
      }

      wordTotal *= wordBonus;
      score += wordTotal;

      // console.log("OUTSIDE: letterValue: " + letterValue +  "  letter:  "  + letter + "  wordBonus:  "
      //             + wordBonus + " wordTotal: " + wordTotal + " score:  " + score);

      return score;
    }

    // button clicks
    $("#resetGame").click(function(){
      clearRack();
      resetMasterTiles();
      addTilesToRack();
      score = 0;
      displayScore();
      $("#playWord").attr("disabled", false);
      $("#err").hide();
    });

    $("#playWord").click(function(){
      displayScore();
      addTilesToRack();
    });

    // helper functions
    function displayScore(){
      $("#score").html(calcBoardScore());
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    function printBoard(){
      for(i = 0; i < 7; i++){
       console.log(scrabbleBoard[i]);
      }
    }

});
