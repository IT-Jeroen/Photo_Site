var players = prompt("How many Players");

var allDiceRolls = [];

for(var i = 1; i<=players; i++){
  var diceRoll = Math.floor(Math.random()*6)+1;
  var image = "./images/dice" + diceRoll + ".png";
  var diceTemplate = "<div class=dice><p>Player " +i+"</p><img class=img"+i+" src="+image+"></div>";

  allDiceRolls.push(diceRoll);
  $(".container").append(diceTemplate);
}

var highScore = 0;
var winningPlayers = [];
for(var i = 0; i<players; i++){
  if (allDiceRolls[i] > highScore){
    highScore = allDiceRolls[i];
    winningPlayers=[];
    winningPlayers[0] = i+1;

  }
  else if (allDiceRolls[i] === highScore){
    winningPlayers.push(i);
  }
};

if (winningPlayers.length > 1){
  $("h1").text("Draw!");
}

else {
  $("h1").text("Player " + winningPlayers[0] + " Wins!");
}
