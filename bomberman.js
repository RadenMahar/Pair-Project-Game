
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
  [0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,2,1,2,0,2,0,2,0,2,0,2,0],
  [0,0,1,0,1,0,1,2,1,1,1,1,0],
  [0,2,1,2,1,2,0,2,1,2,1,2,1],
  [0,0,1,1,1,1,1,1,2,0,0,0,0],
  [0,2,1,2,1,2,2,2,0,2,0,2,1],
  [0,2,0,0,1,1,1,1,1,1,1,1,0],
  [0,2,1,2,0,2,1,2,1,2,0,2,0],
  [1,1,2,1,1,1,1,1,1,1,1,1,0],
  [0,2,1,2,1,2,1,2,1,2,0,2,0],
  [1,0,1,1,1,1,1,0,2,0,0,0,-1],
];

for(let i = 0; i < map.length; i++){
  for(let j = 0; j < map.length; j++){
    if((i && j !== 0) && (i%2 === 0 && j%2 === 0) && (i !== map.length-1 && j !== map.length-1)){
      map[i][j] = Math.floor(Math.random()*1.9)
    }
  }
}

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

var itemArray=[[],[],[],[],[],[],[],[],[],[],[]]

for(i in map){
  var items = ['immortal','decreasehealth','ownhealth','expandbomb','deactivated'];
  for(j in map[i]){
    if(map[i][j]===1){
      itemArray[i].push(items[Math.floor(Math.random()*4.9)]);
    } else {
      itemArray[i].push(0);
    }

  }
};

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
var hero2Row;
var hero2Column;
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
var bombermanLife2 = 100;

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
    else if(gameObjects[row][column] === PRINCESS)
    {
      hero2Row = row;
      hero2Column = column;
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
var SPACEBAR = 16; //Keycode for Spacebar

var W = 87; //Keycode for up
var S = 83; //Keycode for down
var D = 68; //Keycode for right
var A = 65; //Keycode for left
var Q = 81; //Keycode for Spacebar

render();

function mati1(){
  UP=49;
  DOWN = 50;
  RIGHT = 51;
  LEFT = 52;
  SPACEBAR = 53;
};

function mati2(){
  W=49;
  S = 50;
  D = 51;
  A = 52;
  Q = 53;
};

function kembalikan1(){
UP = 38; //Keycode for up
DOWN = 40; //Keycode for down
RIGHT = 39; //Keycode for right
LEFT = 37; //Keycode for left
SPACEBAR = 16; //Keycode for Spacebar
};

function kembalikan2(){
W = 87; //Keycode for up
S = 83; //Keycode for down
D = 68; //Keycode for right
A = 65; //Keycode for left
Q = 81; //Keycode for Spacebar
};

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

    case W:
      if(hero2Row > 0)
      {
        //Clear the hero's current cell
        gameObjects[hero2Row][hero2Column] = 0;
  
        //Subract 1 from the hero's row
        hero2Row--;
  
        //Apply the hero's new updated position to the array
        // gameObjects[heroRow][heroColumn] = HERO;
  
        //If the new position is not zero. Do not allow the move
        if ((map[hero2Row][hero2Column] > 0) || (bombArray[hero2Row][hero2Column] === -2)) //Compare tiles
        {
          hero2Row++;
        };
        gameObjects[hero2Row][hero2Column] = PRINCESS;
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

    case S:
    if(hero2Row < ROWS - 1)
    {
      gameObjects[hero2Row][hero2Column] = 0;
      hero2Row++;

      if ((map[hero2Row][hero2Column] > 0) || (bombArray[hero2Row][hero2Column] === -2))
      {
        hero2Row--;
      };

      gameObjects[hero2Row][hero2Column] = PRINCESS;
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

    case A:
    if(hero2Column > 0)
    {
      gameObjects[hero2Row][hero2Column] = 0;
      hero2Column--;

      if ((map[hero2Row][hero2Column] > 0) || (bombArray[hero2Row][hero2Column] === -2))
      {
        hero2Column++;
      };

      gameObjects[hero2Row][hero2Column] = PRINCESS;
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

    case D:
    if(hero2Column < COLUMNS - 1)
    {
      gameObjects[hero2Row][hero2Column] = 0;
      hero2Column++;

      if ((map[hero2Row][hero2Column] > 0)  || (bombArray[hero2Row][hero2Column] === -2))
      {
        hero2Column--;
      };


      gameObjects[hero2Row][hero2Column] = PRINCESS;
      bomberMoveSounds.play();

    }
    break;

    case SPACEBAR:
    {
      console.log("A Bomb has been planted.");
      placeBomb(heroRow,heroColumn);
      plantBombSpaceBar.play();
    }
    break;

    case Q:
    {
      console.log("A Bomb has been planted.");
      placeBomb(hero2Row,hero2Column);
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
function placeBomb(heroRow,heroColumn){
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

  function showItemTileRight(){
    bombArray[bombRow1][bombColumn1 + 1] = itemArray[bombRow1][bombColumn1 + 1];
  }

  function showItemTileCenter(){
    bombArray[bombRow1][bombColumn1] = itemArray[bombRow1][bombColumn1];
  }

  function showItemTileBelow(){
    bombArray[bombRow1 + 1][bombColumn1] = itemArray[bombRow1 + 1][bombColumn1];
  }

  function showItemTileLeft(){
    bombArray[bombRow1][bombColumn1 - 1] = itemArray[bombRow1][bombColumn1 - 1];
  }

  function showItemTileAbove(){
    bombArray[bombRow1 - 1][bombColumn1] = itemArray[bombRow1 - 1][bombColumn1]; 
  }

  function explode(bombRow1, bombColumn1){
    //alert('BOOM!');
    bombArray[bombRow1][bombColumn1] = 0;
    explosionSounds.play();

    //Right. < 2 as only 1 and 0 variables of softwall and standardtile can be bombed
    if ((map[bombRow1][bombColumn1 + 1] < 2) && (bombColumn1 <= COLUMNS)) {
      setTimeout(burningTileRight,0)
      setTimeout(showItemTileRight,1000)
      setTimeout(clearTiles, 50000)
      //console.log("There's a fire");
      map[bombRow1][bombColumn1 + 1] = 0;
      //test bomb the spider
      gameObjects[bombRow1][bombColumn1 + 1] = 0;
    }

    //Useless, player cannot move to non-movable tiles
    if (map[bombRow1][bombColumn1] < 2) {
      setTimeout(burningTileCenter,0)
      setTimeout(showItemTileCenter,1000)
      setTimeout(clearTiles, 50000)
      map[bombRow1][bombColumn1] = 0; // bombed the original bomb spot

    }

    //Below
    if ((map[bombRow1 + 1][bombColumn1]  < 2) && (bombRow1 <= ROWS)) {
      setTimeout(burningTileBelow,0)
      setTimeout(showItemTileBelow,1000)
      setTimeout(clearTiles, 50000)
      map[bombRow1 + 1][bombColumn1] = 0; //bombed one tile below

    }

    //Left
    if ((map[bombRow1][bombColumn1 - 1] < 2) && (bombColumn1 >= 0)) {
      setTimeout(burningTileLeft,0)
      setTimeout(showItemTileLeft,1000)
      setTimeout(clearTiles, 50000)
      map[bombRow1][bombColumn1 - 1] = 0;
    }                                  //bombed the left tile

    //Above
    if ((map[bombRow1 - 1][bombColumn1] < 2) &&  (bombRow1 >= 0)) {
      setTimeout(burningTileAbove,0)
      setTimeout(showItemTileAbove,1000)
      setTimeout(clearTiles, 50000)
      map[bombRow1 - 1][bombColumn1] = 0 ; //bombed the above tile
      //test bomb the spider
    }

    bombPack++;
  }
  console.log("Change the softWall into standardTile")
}

var scenario = ""
function CheckState() {

  // if(map[heroRow][heroColumn] === PRINCESS) {
  //   scenario = "SavePrincess"}
  // if (((heroRow === monsterRow) && (heroColumn === monsterColumn)) || ((heroRow === monsterRow_Two) && (heroColumn === monsterColumn_Two)) || ((heroRow === monsterRow_Three) && (heroColumn === monsterColumn_Three))) {
  //   scenario = "KilledByMonster"
    if (bombArray[heroRow][heroColumn] === FIRE) {
    scenario = "KilledByBomb"
  }else if (bombArray[hero2Row][hero2Column] === FIRE) {
    scenario = "KilledByBomb2"
  }else if(bombArray[heroRow][heroColumn]==='immortal'){
    bombermanLife += 150
    bombArray[heroRow][heroColumn]=0;
    itemArray[heroRow][heroColumn]=0;
    scenario = "GameOn"}
  else if(bombArray[hero2Row][hero2Column]==='immortal'){
      bombermanLife2 += 150
      bombArray[hero2Row][hero2Column]=0;
      itemArray[hero2Row][hero2Column]=0;
      scenario = "GameOn2"
  } else if (bombArray[heroRow][heroColumn]==='decreasehealth'){
    bombermanLife2 -=30
    bombArray[heroRow][heroColumn]=0;
    itemArray[heroRow][heroColumn]=0;
    scenario = "decrease"
    } else if (bombArray[hero2Row][hero2Column]==='decreasehealth'){
    bombermanLife -=30
    bombArray[hero2Row][hero2Column]=0;
    itemArray[hero2Row][hero2Column]=0;
    scenario = "decrease2"
  } else if (bombArray[heroRow][heroColumn]==='ownhealth') {
    bombermanLife +=20
    bombArray[heroRow][heroColumn]=0;
    itemArray[heroRow][heroColumn]=0;
    scenario = "health"
  } else if (bombArray[hero2Row][hero2Column]==='ownhealth') {
    bombermanLife2 +=20
    bombArray[hero2Row][hero2Column]=0;
    itemArray[hero2Row][hero2Column]=0;
    scenario = "health2"
  }  
  else if (bombArray[heroRow][heroColumn]==='expandbomb') {
    placeBomb(hero2Row,hero2Column);
    bombArray[heroRow][heroColumn]=0;
    itemArray[heroRow][heroColumn]=0;
    scenario = "GameOn"
  }else if (bombArray[hero2Row][hero2Column]==='expandbomb') {
    placeBomb(heroRow,heroColumn);
    bombArray[hero2Row][hero2Column]=0;
    itemArray[hero2Row][hero2Column]=0;
    scenario = "GameOn"
  } else if (bombArray[heroRow][heroColumn]==='deactivated') {
    mati2();
    setTimeout(kembalikan2,5000);
    bombArray[heroRow][heroColumn]=0;
    itemArray[heroRow][heroColumn]=0;
    scenario = "GameOn"
  }else if (bombArray[hero2Row][hero2Column]==='deactivated') {
    mati1();
    setTimeout(kembalikan1,5000);
    bombArray[hero2Row][hero2Column]=0;
    itemArray[hero2Row][hero2Column]=0;
    scenario = "GameOn"
  }  
  else {
    scenario = "GameOn"
  }
}


//endGame scenario
var gameMessage ="Bomberman Adventure";
function endGame(scenario) {

  var End = false;

  // if (scenario === "SavePrincess") {

  //   var final_score = score + 10000;

  //   if (final_score > 12000) {
  //     score = score
  //   } else {
  //     score = final_score
  //   }

  //   //Display the game message
  //   gameMessage = "PRINCESS Saved! :)";
  //   victorySound.play();
  //   End = true} 

    if (scenario === "KilledByBomb"){
    bombermanLife -= 10;
    bombArray[heroRow][heroColumn] = 0;
    gameOverBoo.play();
    if(bombermanLife <= 0){
      End = true;
      gameMessage = "Pemenang player 2!";
    }
  }
  if (scenario === "KilledByBomb2"){
    bombermanLife2 -= 10;
    bombArray[hero2Row][hero2Column] = 0;
    gameOverBoo.play();
    if(bombermanLife2 <= 0){
      End = true;
      gameMessage = "Pemenang player 1!";
    }
  }
  if (scenario === "health"){
    bombermanLife += 10;
    bombArray[heroRow][heroColumn] = 0;
    gameOverBoo.play();
    if(bombermanLife <= 0){
      End = true;
      gameMessage = "Pemenang player 2!";
    }
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
        cell.src = "img/Games-Artwork/tower.png";
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

        case 'immortal':
          cell.src="https://cdn4.iconfinder.com/data/icons/hero-villain/200/16-512.png";
          break;

        case 'decreasehealth':
          cell.src="https://cdn0.iconfinder.com/data/icons/dottie-game/24/game_019-challenge-swords-match-attack-weapon-512.png";
          break;
        
        case 'ownhealth':
          cell.src = "https://www.pinclipart.com/picdir/middle/159-1592770_beat-cardiac-care-health-healthcare-healthy-heart-white.png";
          break;

        case 'expandbomb':
          cell.src = "https://cdn.iconscout.com/icon/premium/png-256-thumb/bomb-199-647513.png";
          break;
        
        case 'deactivated':
          cell.src = "https://cdn2.iconfinder.com/data/icons/antivirus-internet-security/33/protection_deactivated-512.png";
          break;

      }
      //Add the hero and monster from the gameObjects array
      switch(gameObjects[row][column])
      {

        case STANDARDTILE2:
        cell.src = "img/Games-Artwork/standardTile.png";
        break;

        case HERO:
        cell.src ="img/Games-Artwork/dota-player1.gif"
        break;

        case PRINCESS:
        cell.src = "img/Games-Artwork/dota-player2.gif";
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
  gamescore.innerHTML = bombermanLife2;

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
