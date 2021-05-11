var players = prompt("How many Players"); /*Should only ask once (Need to find alternative to refresh page to role the dice)*/
/*Find a way to re-roll the dice for the players in a draw*/
/*var players = 6;*/
var randomNumberArray = [];

for(var i = 1; i<=players; i++){
  var randomNumber = Math.floor(Math.random()*6)+1;
  var image = "./images/dice" + randomNumber + ".png";

  randomNumberArray.push(randomNumber)
  /*document.querySelector(".img" + i).setAttribute("src", image);*/

  /*create tags and text elements*/
  var diceContainerElement = document.querySelector(".container");
  var divTag = document.createElement("div");
  divTag.classList.add("dice");
  var playerTag = document.createElement("p");
  var playerText = document.createTextNode("Player " + i);
  var imageTag = document.createElement("img");
  imageTag.classList.add("img" + i);
  imageTag.setAttribute("src", image)

  /*Add tags and elements to the parent*/
  divTag.appendChild(playerTag);
  playerTag.appendChild(playerText);
  divTag.appendChild(imageTag);
  diceContainerElement.appendChild(divTag);

}

var checkForWinner = 0;
var winner = [];
for(var i = 0; i<players; i++){
  if (randomNumberArray[i] > checkForWinner){
    checkForWinner = randomNumberArray[i];
    winner=[];
    winner[0] = i+1;

  }
  else if (randomNumberArray[i] === checkForWinner){
    winner.push(i);
  }
}

if (winner.length > 1){
  document.querySelector("h1").innerText = "Draw!";
}

else {
  document.querySelector("h1").innerText = "Player " + winner[0] + " Wins!";
}


/*
if (randomNumberArray[0] > randomNumberArray[1]) {
  document.querySelector("h1").innerText = "Player 1 Wins";
}

else if (randomNumberArray[0] < randomNumberArray[1]) {
  document.querySelector("h1").innerText = "Player 2 Wins";
}

else {
  document.querySelector("h1").innerText = "Draw!";
}
*/


/*document.querySelector(".container").innerHTML = '<div class="dice">\n<p>Player 3</p>\n<img class="img3" src="">\n</div>'*/



/*
var num_a = Math.floor(Math.random()*6)+1;
var num_b = Math.floor(Math.random()*6)+1;

var image_a = "./images/dice" + num_a + ".png";
var image_b = "./images/dice" + num_b + ".png";

document.querySelector('.img1').setAttribute("src", image_a);
document.querySelector('.img2').setAttribute("src", image_b);



if (num_a > num_b){
  document.querySelector("h1").innerText = "Player 1 Wins";

}

else if (num_a < num_b){
  document.querySelector("h1").innerText = "Player 2 Wins";

}

else {
  document.querySelector("h1").innerText = "Draw!";

}
*/
