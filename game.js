var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var clicks = 0;

function buttonSequence(playerChosenColor){
  if (playerChosenColor) {
    randomChosenColour = playerChosenColor;
    userClickedPattern.push(playerChosenColor);
  }
  else {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  }

  /* Button sound effect */
  playSound(randomChosenColour);
  /* Button visual effect*/
  $("#"+randomChosenColour).fadeTo("fast",0.2).fadeTo("fast", 1.0);
  cssEffect($("#"+randomChosenColour),"btn-shadow", 100);
};


function startGame(){
  $("body").keypress(function(){
    $(".game-info").text("Level " + level);
    /*setTimeout(function(){buttonSequence()}, 1500);*/
    buttonSequence();
    $("body").off();
  })
};

function gameOver(){
  $("h1").text("Game Over! You have reached level " + level + ", Press a Key to Continue");
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
  setTimeout(function(){buttonSequence()}, 1000); /* Start next level with a delay*/
}

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

/* Add event listener to the buttons */
$(".tile").click(function(){
  var clickedElementId = $(this).attr("id")
  buttonSequence(clickedElementId);
  checkUserAnswer();
});

startGame();
