var buttonColours = ["red", "blue", "green", "yellow"];
var numberOfColours = buttonColours.length;
var buttonColourSerie = [];
var nrOfTiles = 4;

var gamePattern = [];
var userClickedPattern = [];

var counter = 0;
var level = 1;
/*Set max number of tiles acourding to our grid system*/
var maxRows = 3;
var maxColumn = 6;
$("#input-number").attr({"max" : maxRows*maxColumn});

var restart = 0;

function playButton(chosenTile){
  /* Button sound effect */
  playSound(chosenTile[1]);
  /* Button visual effect*/
  $("#"+chosenTile[0]).fadeTo("fast",0.2).fadeTo("fast", 1.0);
  cssEffect($("#"+chosenTile[0]),"btn-shadow", 100);
};

function randomGameColor(){
  var randomTile = Math.floor(Math.random()*nrOfTiles);
  var randomChosenTile = "tile-"+randomTile;
  var randomColour = $("#"+randomChosenTile).attr("class").split(/\s+/)[1];
  gamePattern.push(randomChosenTile);
  return [randomChosenTile,randomColour];
};

function tileGenerator(){
  var rowBreak = 3;
  var tileCounter = 1;
  var rowTemplate = "<div class='row'>";
  $(".game-tiles").append(rowTemplate);

  /*Fill Array with all the tiles re-usable colour values*/
  for (i=0; i<nrOfTiles; i++){

    if (counter === numberOfColours){
      counter = 0;
    }
    buttonColourSerie.push(buttonColours[counter]);
    counter++;
  }

  /******** Pattern Control *********/
  rowBreak = Math.ceil(nrOfTiles/maxRows);

  for (i=2; i<=maxRows; i++){
    if (nrOfTiles %i === 0){
      rowBreak = nrOfTiles / i;
      if (rowBreak < maxColumn){
        break;
      }
      else{
        rowBreak = Math.ceil(nrOfTiles/maxRows);
      }
    }
    else{
      if (rowBreak > maxColumn){
        rowBreak = Math.ceil(nrOfTiles/maxRows);
      }

      if (Math.floor(nrOfTiles/maxRows)<maxRows){
        rowBreak = Math.ceil((nrOfTiles/maxRows)+1);
      }
    }
  }

  if (nrOfTiles <4){
    rowBreak = 3;
  }

  /******************* Creation of Tiles ***********************/
  for (i=0; i<nrOfTiles; i++) {
    var tileTemplate = "<div class='tile "+buttonColourSerie[i]+"' id='tile-"+i+"' type='button'></div>";

    if (tileCounter > rowBreak){
      tileCounter = 1;
      $(".game-tiles").append(rowTemplate);
    }

    $(".game-tiles").append(tileTemplate);
    tileCounter ++;
  }

  /******************* Add Event Listener ************************/
  $(".tile").click(function(){
    var playerChosenColor = $(this).attr("class").split(/\s+/)[1];
    var playerChosenTile = $(this).attr("id");
    userClickedPattern.push(playerChosenTile);
    playButton([playerChosenTile,playerChosenColor]);
    checkUserAnswer();
  });
};

function startGame(){
  $("body").keypress(function(e){
    /*Detect Enter key (13) to start game*/
    if(e.which==13){
      nrOfTiles = $("#input-number").val();
      $(".game-info").text("Level " + level);
      $(".input-tile").hide();
      if (restart === 0){
        tileGenerator();
      }
      setTimeout(function(){playButton(randomGameColor())}, 2000);
      $("body").off();
      restart = 1;
    }
  })
};

function gameOver(){
  $("h1").text("Game Over! You have reached level " + level + ", Press Enter to Continue");
    /* Game Over Sound */
    playSound("wrong");
    /* Game Over Visual */
    cssEffect($("body"), "game-over", 50);
    /* Reset Game Values */
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    startGame();
};

function levelUp(){
  level++;
  userClickedPattern = [];
  $(".game-info").text("Level " + level);
  setTimeout(function(){playButton(randomGameColor())}, 1000); /* Start next level with a delay*/
};

function checkUserAnswer() {
  if (gamePattern.length === userClickedPattern.length){
    aString = gamePattern.toString();
    bString = userClickedPattern.toString();
    if (aString !== bString){
      gameOver();
    }
    else {
      levelUp();
    }
  }
};

/* Play a sound*/
function playSound(soundId){
  var sound = new Audio("./sounds/"+soundId +".mp3");
  sound.play();
};

/* Create visual effect using css classes*/
function cssEffect(source, classId, timer){
  source.addClass(classId);
  setTimeout(function(){source.removeClass(classId)}, timer);
};


startGame();
