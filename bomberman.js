
//Get a reference to the stage and output
var stage = document.querySelector("#stage");
var output = document.getElementById("output");
var gamescore = document.getElementById("gamescore");
var bombermanLife = document.getElementById("bomberLife");
console.log(output);

//Add a keyboard listener
window.addEventListener("keydown", keydownHandler, false);
var Render = window.setInterval(render, 50); // Render the game constantly

function restart() {
  document.location.href="";
}

//The game map
var map = [
  [0,0,0,1,1,0,0,0,1,0,0,0,0],
  [0,2,1,2,0,2,0,2,0,2,0,2,0],
  [0,0,1,0,1,0,1,2,1,0,0,0,0],
  [0,2,0,2,1,2,0,2,1,2,1,2,1],
  [0,0,0,0,1,1,1,1,2,0,0,0,0],
  [0,2,0,2,0,2,2,2,0,2,0,2,1],
  [0,2,0,0,0,0,0,1,1,0,0,0,0],
  [0,2,1,2,0,2,1,2,0,2,0,2,0],
  [1,1,2,0,0,0,1,1,0,1,1,0,0],
  [0,2,0,2,0,2,0,2,1,2,0,2,1],
  [1,0,0,0,1,1,1,0,2,0,1,0,-1],
];

//The game objects map
var gameObjects = [
  [5,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,-1],
];

//Bomb map
var bombArray = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

//Map code
var STANDARDTILE = 0;
var SOFTWALL = 1; //softWall
var HARDWALL = 2; //hardWall
var PRINCESS = -1;
var MONSTER = 4;
var HERO = 5; //Player Character
var MONSTER_TWO = 6;
var MONSTER_THREE = 7;
// var MONSTER_FOUR = 8;
// var MONSTER_FIVE = 9;
var STANDARDTILE2 = 10;
var BOMB = -2;
var FIRE = 12;

//The size of each cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//Find the hero's and monster's start positions
var heroRow;
var heroColumn;
var monsterRow;
var monsterColumn;
var monsterRow_Two;
var monsterColumn_Two;
var monsterRow_Three;
var monsterColumn_Three;
var bombRow
var bombColumn

//Initial Score
var score = 0;
//Initial Life
var bombermanLife = 100;

//Hero's Movement
for(var row = 0; row < ROWS; row++)
{
  for(var column = 0; column < COLUMNS; column++)
  {
    if(gameObjects[row][column] === HERO)
    {
      heroRow = row;
      heroColumn = column;
    }
  }
}

// for(var row = 0; row < ROWS; row++)
// {
//   for(var column = 0; column < COLUMNS; column++)
//   {
//     if(gameObjects[row][column] === HERO)
//     {
//       hero1Row = row;
//       hero1Column = column;
//     }
//   }
// }

//Arrow key codes
var UP = 38; //Keycode for up
var DOWN = 40; //Keycode for down
var RIGHT = 39; //Keycode for right
var LEFT = 37; //Keycode for left
var SPACEBAR = 17; //Keycode for Spacebar

var W = 87; //Keycode for up
var S = 83; //Keycode for down
var D = 68; //Keycode for right
var A = 65; //Keycode for left
var Q = 61; //Keycode for Spacebar

render();

function keydownHandler(event) {
  event.preventDefault()
  switch(event.keyCode)
  {
    case UP:
    if(heroRow > 0)
    {
      //Clear the hero's current cell
      gameObjects[heroRow][heroColumn] = 0;

      //Subract 1 from the hero's row
      heroRow--;

      //Apply the hero's new updated position to the array
      // gameObjects[heroRow][heroColumn] = HERO;

      //If the new position is not zero. Do not allow the move
      if ((map[heroRow][heroColumn] > 0) || (bombArray[heroRow][heroColumn] === -2)) //Compare tiles
      {
        heroRow++;
      };
      gameObjects[heroRow][heroColumn] = HERO;
      bomberMoveSounds.play();
    }
    break;

    case DOWN:
    if(heroRow < ROWS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroRow++;

      if ((map[heroRow][heroColumn] > 0) || (bombArray[heroRow][heroColumn] === -2))
      {
        heroRow--;
      };

      gameObjects[heroRow][heroColumn] = HERO;
      bomberMoveSounds.play();
    }
    break;

    case LEFT:
    if(heroColumn > 0)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn--;

      if ((map[heroRow][heroColumn] > 0) || (bombArray[heroRow][heroColumn] === -2))
      {
        heroColumn++;
      };

      gameObjects[heroRow][heroColumn] = HERO;
      bomberMoveSounds.play();
    }
    break;

    case RIGHT:
    if(heroColumn < COLUMNS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn++;

      if ((map[heroRow][heroColumn] > 0)  || (bombArray[heroRow][heroColumn] === -2))
      {
        heroColumn--;
      };


      gameObjects[heroRow][heroColumn] = HERO;
      bomberMoveSounds.play();

    }
    break;

    case SPACEBAR:
    {
      console.log("A Bomb has been planted.");
      placeBomb();
      plantBombSpaceBar.play();
    }
    break;
  }

  //Render the game
  render();
}

//Bomb
var bombPack = 10
// number of bombs
function placeBomb(){
  // if(placebomb && player.bombs != 0)
  //     map[heroColumn][heroRow].object = 2;
  {
    var bombRow1 = heroRow;
    var bombColumn1 = heroColumn;

    bombArray[bombRow1][bombColumn1] = -2;
    map[bombRow1][bombColumn1] = -2;
    //placebomb = false;
    bombPack--;

    setTimeout(function() {
      explode(bombRow1,bombColumn1);
    }, 2000);
    console.log("Bomb has been triggered");
  }



//clearing tiles and changing the image back to standardtile
function clearTiles(){
  bombArray[bombRow1][bombColumn1 + 1] = 0; //right
  bombArray[bombRow1][bombColumn1] = 0; //center
  bombArray[bombRow1 + 1][bombColumn1] = 0; //below
  bombArray[bombRow1][bombColumn1 - 1] = 0; //left
  bombArray[bombRow1 - 1][bombColumn1] = 0; //above
}
//

  function burningTileRight(){
    bombArray[bombRow1][bombColumn1 + 1] = 12
  }

  function burningTileCenter(){
    bombArray[bombRow1][bombColumn1] = 12
  }

  function burningTileBelow(){
    bombArray[bombRow1 + 1][bombColumn1] = 12
  }

  function burningTileLeft(){
    bombArray[bombRow1][bombColumn1 - 1] = 12
  }

  function burningTileAbove(){
    bombArray[bombRow1 - 1][bombColumn1] = 12
  }


  function explode(bombRow1, bombColumn1){
    //alert('BOOM!');
    bombArray[bombRow1][bombColumn1] = 0;
    explosionSounds.play();
    //console.log("Row: ", bombRow, "Col: ", bombColumn);
    // if (map[bombRow][++bombColumn] = '0' || map[bombRow][++bombColumn]) = '1') {

    //Right. < 2 as only 1 and 0 variables of softwall and standardtile can be bombed
    if ((map[bombRow1][bombColumn1 + 1] < 2) && (bombColumn1 <= COLUMNS)) {
      setTimeout(burningTileRight,0)
      setTimeout(clearTiles, 1000)
      //console.log("There's a fire");
      map[bombRow1][bombColumn1 + 1] = 0;
      //test bomb the spider
      gameObjects[bombRow1][bombColumn1 + 1] = 0;
    }

    //Useless, player cannot move to non-movable tiles
    if (map[bombRow1][bombColumn1] < 2) {
      setTimeout(burningTileCenter,0)
      setTimeout(clearTiles, 1000)
      map[bombRow1][bombColumn1] = 0; // bombed the original bomb spot

    }

    //Below
    if ((map[bombRow1 + 1][bombColumn1]  < 2) && (bombRow1 <= ROWS)) {
      setTimeout(burningTileBelow,0)
      setTimeout(clearTiles, 1000)
      map[bombRow1 + 1][bombColumn1] = 0; //bombed one tile below

    }

    //Left
    if ((map[bombRow1][bombColumn1 - 1] < 2) && (bombColumn1 >= 0)) {
      setTimeout(burningTileLeft,0)
      setTimeout(clearTiles, 1000)
      map[bombRow1][bombColumn1 - 1] = 0;
    }                                  //bombed the left tile

    //Above
    if ((map[bombRow1 - 1][bombColumn1] < 2) &&  (bombRow1 >= 0)) {
      setTimeout(burningTileAbove,0)
      setTimeout(clearTiles, 1000)
      map[bombRow1 - 1][bombColumn1] = 0 ; //bombed the above tile
      //test bomb the spider
    }

    bombPack++;
  }
  console.log("Change the softWall into standardTile")
}

function moveMonster(rowParameter, columnParameter, WhichMonster) //Movement for monsters
{
   return function()
  {
    //The 4 possible directions that the monster can move
    var UP = 1;
    var DOWN = 2;
    var LEFT = 3;
    var RIGHT = 4;

    //An array to store the valid direction that
    //the monster is allowed to move in
    var validDirections = [];
    var KillMonster = false
    //The final direction that the monster will move in
    var direction = undefined;

    //Find out what kinds of things are in the cells
    //that surround the monster. If the cells contain STANDARDTILE,
    //push the corresponding direction into the validDirections array


    if(rowParameter > 0)
    {
      var thingAbove = map[rowParameter - 1][columnParameter];
      if ((thingAbove === 0) && ((gameObjects[rowParameter - 1][columnParameter] === 5) || (gameObjects[rowParameter - 1][columnParameter] === 0)))
      {
        validDirections.push(UP);
      }
    }
    if(rowParameter < ROWS - 1)
    {
      var thingBelow = map[rowParameter + 1][columnParameter];
      if ((thingBelow === 0) && ((gameObjects[rowParameter + 1][columnParameter] === 5) || (gameObjects[rowParameter + 1][columnParameter] === 0)))
      {
        validDirections.push(DOWN);
      }
    }
    if(columnParameter > 0)
    {
      var thingToTheLeft = map[rowParameter][columnParameter - 1];
      if ((thingToTheLeft === 0) && ((gameObjects[rowParameter][columnParameter - 1] === 5) || (gameObjects[rowParameter][columnParameter - 1] === 0)))
      {
        validDirections.push(LEFT);
      }
    }
    if(columnParameter < COLUMNS - 1)
    {
      var thingToTheRight = map[rowParameter][columnParameter + 1];
      if ((thingToTheRight === 0)  && ((gameObjects[rowParameter][columnParameter + 1] === 5) || (gameObjects[rowParameter][columnParameter + 1] === 0)))
      {
        validDirections.push(RIGHT);
      }
    }

    // console.log(validDirections);

    //The validDirections array now contains 0 to 4 directions that the
    //contain STANDARDTILE cells. Which of those directions will the monster
    //choose to move in?

    //If a valid direction was found, Randomly choose one of the
    //possible directions and assign it to the direction variable
    if(validDirections.length !== 0)
    {
      var randomNumber = Math.floor(Math.random() * validDirections.length);
      direction = validDirections[randomNumber];
    }

    //Move the monster in the chosen direction
    switch(direction)
    {
      case UP:
      //Clear the monster's current cell
      gameObjects[rowParameter][columnParameter] = 0;
      //Subtract 1 from the monster's row
      rowParameter--;
      //Apply the monster's new updated position to the array
      // gameObjects[rowParameter][columnParameter] = MONSTER;
      break;

      case DOWN:
      gameObjects[rowParameter][columnParameter] = 0;
      rowParameter++;
      // gameObjects[rowParameter][columnParameter] = MONSTER;
      break;

      case LEFT:
      gameObjects[rowParameter][columnParameter] = 0;
      columnParameter--;
      // gameObjects[rowParameter][columnParameter] = MONSTER;
      break;

      case RIGHT:
      gameObjects[rowParameter][columnParameter] = 0;
      columnParameter++;
      // gameObjects[rowParameter][columnParameter] = MONSTER;
      //console.log("monster_one moving out");
    }
    //console.log(rowParameter, columnParameter);

    if (bombArray[rowParameter][columnParameter] === FIRE) {
      //Kill monster
      KillMonster = true
    }

    switch (WhichMonster) {
      case "One":
      monsterRow = rowParameter;
      monsterColumn = columnParameter;

      if (KillMonster) {
        gameObjects[rowParameter][columnParameter] = 0; // Use to change the dead spider image from spider to tile
        clearInterval(MonsterMove1);
        monsterRow = -5; // Change Monster Value to something else so that Monter is dead permanently
        monsterColumn = -5;

        gameMessage = "Monster Killed!!!";
        score = score + 500;
        spiderKilled.play();
      }
      break;

      case "Two":
      monsterRow_Two = rowParameter;
      monsterColumn_Two = columnParameter;

      if (KillMonster) {
        gameObjects[rowParameter][columnParameter] = 0; // Use to change the dead spider image from spider to tile
        clearInterval(MonsterMove2);
        monsterRow_Two = -5; // Change Monster Value to something else so that Monter is dead permanently
        monsterColumn_Two = -5;

        gameMessage = "Monster Killed!!!";
        score = score + 500;
        spiderKilled.play();
      }
      break;

      case "Three":
      monsterRow_Three = rowParameter;
      monsterColumn_Three = columnParameter;

      if (KillMonster) {
        gameObjects[rowParameter][columnParameter] = 0; // Use to change the dead spider image from spider to tile
        clearInterval(MonsterMove3);
        monsterRow_Three = -5; // Change Monster Value to something else so that Monter is dead permanently
        monsterColumn_Three = -5;

        gameMessage = "Monster Killed!!!";
        score = score + 500;
        spiderKilled.play();
      }
    }
  }
}

var scenario = ""
function CheckState() {

  if(map[heroRow][heroColumn] === PRINCESS) {
    scenario = "SavePrincess"
  } else if (((heroRow === monsterRow) && (heroColumn === monsterColumn)) || ((heroRow === monsterRow_Two) && (heroColumn === monsterColumn_Two)) || ((heroRow === monsterRow_Three) && (heroColumn === monsterColumn_Three))) {
    scenario = "KilledByMonster"
  } else if (bombArray[heroRow][heroColumn] === FIRE) {
    scenario = "KilledByBomb"
  } else {
    scenario = "GameOn"
  }
}


//endGame scenario
var gameMessage ="Bomberman Adventure";
function endGame(scenario) {

  var End = false;

  if (scenario === "SavePrincess") {

    var final_score = score + 10000;

    if (final_score > 12000) {
      score = score
    } else {
      score = final_score
    }

    //Display the game message
    gameMessage = "PRINCESS Saved! :)";
    victorySound.play();
    End = true

  } else if (scenario === "KilledByBomb"){
    bombermanLife -= 10;
    bombArray[heroRow][heroColumn] = 0;
    gameOverBoo.play();
    if(bombermanLife <= 0){
      End = true;
      gameMessage = "BOOM! In your face!";
    }
  } else {

  }

  if (End) {

    if (scenario === "KilledByMonster") { //To display the spider tile correctly after it has killed the human
      gameObjects[heroRow][heroColumn] = 4
    } else {
      gameObjects[heroRow][heroColumn] = 0
    }
    window.removeEventListener("keydown", keydownHandler, false);
    setTimeout(function( ) { clearInterval(Render); }, 50);
  }

}

function render()
{
  //Clear the stage of img cells
  //from the previous turn

  if(stage.hasChildNodes())
  //running if statement to determine if there is Child Nodes (Nodes is (HTML Elements)) to render the game
  {
    for(var i = 0; i < ROWS * COLUMNS; i++)
    {
      stage.removeChild(stage.firstChild);
    }
  }

  //Render the game by looping through the map arrays
  for(var row = 0; row < ROWS; row++)
  {
    for(var column = 0; column < COLUMNS; column++)
    {
      //Create a img tag called cell
      var cell = document.createElement("img");

      //Set it's CSS class to "cell"
      cell.setAttribute("class", "cell");

      //Add the img tag to the <div id="stage"> tag
      stage.appendChild(cell);

      //Find the correct image for this map cell
      switch(map[row][column])
      {
        case STANDARDTILE:
        cell.src = "img/Games-Artwork/standardTile.png";
        break;

        case SOFTWALL:
        cell.src = "img/Games-Artwork/softWall.png";
        break;

        case HARDWALL:
        cell.src = "img/Games-Artwork/hardWall.png";
        break;

      }

      switch(bombArray[row][column])
      {
        case BOMB:
        cell.src ="img/Games-Artwork/Smoothie_Smash_Bomb.gif";

        break;

        case FIRE:
        cell.src ="img/Games-Artwork/Fire_gif.gif";

        break;

      }
      //Add the hero and monster from the gameObjects array
      switch(gameObjects[row][column])
      {

        case STANDARDTILE2:
        cell.src = "img/Games-Artwork/standardTile.png";
        break;

        case HERO:
        cell.src ="img/Games-Artwork/player-1.png"
        break;

        case PRINCESS:
        cell.src = "img/Games-Artwork/player-2.png";
        break;

      }

      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }
  //console.log(score);
  CheckState();
  endGame(scenario);

  //Display the game message
  output.textContent = gameMessage;
  // console.log(gameMessage);
  //Display the score
  gamescore.innerHTML = score;

  bomberLife.innerHTML = bombermanLife;

}

//Sound Effects
var gameStartSound = document.getElementById("bombermanStartingSound");
gameStartSound.play(); //IntroSound
var bomberMoveSounds = document.getElementById("bombermanMovementSounds"); //Movement Sound
var plantBombSpaceBar = document.getElementById("plantBombSounds"); //Plant Bomb Sound
var explosionSounds= document.getElementById("explodedBombSounds"); //Explosion Sound
var victorySound = document.getElementById("winSounds"); //Victory Sound
var gameOverBoo = document.getElementById("gameOverSounds"); //Game over Sound
var spiderKilled = document.getElementById("spiderDie"); //Spider Die Sound
