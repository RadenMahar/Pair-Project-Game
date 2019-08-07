/*
Sprite sizes:
Tiles: 64*64                    64
Bomb: 48*48                     112
Flame: 48*48                    160
Powerups: 32*32                 192
ALL player animations: 32*48    240
                                288
                                336
*/
(function() {
    var img = new Image();
    img.src = "https://s7.postimg.org/700loqb2j/Final_Sprite_Sheet.png";
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    var scale = 40;
    canvas.height = 13 * scale;
    canvas.width = 19 * scale;
    var height = canvas.height,
      width = canvas.width,
      speed = 1.5;
    var keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
  
    var map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  
    function mapGen() {
      var iy;
      var ix;
      for (iy = 0; iy < 11; iy++) {
        for (ix = 0; ix < 17; ix++) {
          map[iy][ix] = randomWithProbability();
        }
      }
      for (iy = 1; iy < 10; iy += 2) {
        for (ix = 1; ix < 16; ix += 2) {
          map[iy][ix] = 2;
        }
      }
      map[0][0] = 0;
      map[0][1] = 0;
      map[1][0] = 0;
      map[0][15] = 0;
      map[0][16] = 0;
      map[1][16] = 0;
      map[10][0] = 0;
      map[10][1] = 0;
      map[9][0] = 0;
      map[10][16] = 0;
      map[10][15] = 0;
      map[9][16] = 0;
    }
  
    document.getElementById("reset").onclick = function() {mapGen()};
    
    mapGen();
  
    var player = {
      frame: 0,
      direction: 0, //0=down, 1=left, 2=up, 3=right
      x: 45,
      y: 30,
      width: 32,
      height: 48,
      dead: false,
      isMoving: false
    };
  
    window.addEventListener("keydown", function(e) {
      // keys.pop();
      
      if (e.keyCode == 38) {
        keys.up = true;
      }
      if (e.keyCode == 40) {
        keys.down = true;
      }
      if (e.keyCode == 37) {
        keys.left = true;
      }
      if (e.keyCode == 39) {
        keys.right = true;
      }
      player.isMoving = true;
    }, false);
  
    window.addEventListener("keyup", function(e) {
      /*delete*/
      if (e.keyCode == 38) {
        keys.up = false;
      }
      if (e.keyCode == 40) {
        keys.down = false;
      }
      if (e.keyCode == 37) {
        keys.left = false;
      }
      if (e.keyCode == 39) {
        keys.right = false;
      }
      if (keys.up == false && keys.down == false && keys.left == false && keys.right == false) {
        player.isMoving = false;
        player.frame = 0;
      }
    }, false);
  
    function game() {
      update();
      render();
    }
  
    function update() {
      if (keys.up) {
        player.y -= speed;
        player.direction = 2;
      }
      if (keys.down) {
        player.y += speed;
        player.direction = 0;
      }
      if (keys.left) {
        player.x -= speed;
        player.direction = 1;
      }
      if (keys.right) {
        player.x += speed;
        player.direction = 3;
      }
  
      //if (player.frame >= 4) player.frame = 0;
  
      if (player.x < scale) player.x = scale;
      if (player.y < scale - 16) player.y = scale - 16;
      if (player.x >= width - player.width - scale) player.x = width - player.width - scale;
      if (player.y >= height - player.height - scale) player.y = height - player.height - scale;
    }
  
    function render() {
      context.clearRect(0, 0, width, height);
      border();
      blocks();
      //collisionDetection();
  
      if (player.direction === 0) {
        context.drawImage(img, player.frame * 32, 240, 32, 48, player.x, player.y, player.width, player.height);
      }
  
      if (player.direction === 1) {
        context.drawImage(img, player.frame * 32 + 128, 240, 32, 48, player.x, player.y, player.width, player.height);
      }
  
      if (player.direction === 2) {
        context.drawImage(img, player.frame * 32 + 128, 288, 32, 48, player.x, player.y, player.width, player.height);
      }
  
      if (player.direction === 3) {
        context.drawImage(img, player.frame * 32, 288, 32, 48, player.x, player.y, player.width, player.height);
      }
    }
  
    function collisionDetection() {
      function RectsColliding(playr, y, x) {
        return !(playr.x > (x * scale) + 2 * scale || playr.x + playr.width < (x * scale) + scale || playr.y + (playr.height - playr.width) > (y * scale) + 2 * scale || playr.y + playr.height < (y * scale) + scale);
        //return !(playr.x>r2.x +r2.w  || playr.x+playr.width<r2.x || playr.y>r2.y +r2.h  || playr.y+playr.height<r2.y);
      }
  
      function RectsCollidingx(playr, x) {
        var left = (x * scale) + 2 * scale;
        var right = (x * scale) + scale;
        if (!(playr.x > left || playr.x + playr.width < right)) {
          return x * scale;
        }
        //return !(playr.x>r2.x +r2.w  || playr.x+playr.width<r2.x || playr.y>r2.y +r2.h  || playr.y+playr.height<r2.y);
      }
  
      function RectsCollidingy(playr, y) {
        var top = (y * scale) + 2 * scale;
        var bottom = (y * scale) + scale;
        if (!(playr.y + (playr.height - playr.width) > top || playr.y + playr.height < bottom )) {
          return y * scale;
        }
        //return !(playr.x>r2.x +r2.w  || playr.x+playr.width<r2.x || playr.y>r2.y +r2.h  || playr.y+playr.height<r2.y);
      }
  
      for (iy = 0; iy < 11; iy++) {
        for (ix = 0; ix < 17; ix++) {
          if (map[iy][ix] == 1 || map[iy][ix] == 2) {
            if (RectsColliding(player, iy, ix)) {
              console.log("collision");
              var ycol = RectsCollidingy(player, iy);
              var xcol = RectsCollidingx(player, ix);
              if (player.y + (player.height - player.width)/2> ycol) {
                player.y = (iy * scale) - (player.height - player.width)/2;// + 2 * scale;
              } else if (player.y + (player.height - player.width)/2 < ycol) {
                
              }
            }
          }
        }
      }
    }
  
    function blocks() {
      for (var iy = 0; iy < 11; iy++) {
        for (var ix = 0; ix < 17; ix++) {
          if (map[iy][ix] == 2) {
            context.drawImage(img, 128, 0, 64, 64, scale + scale * ix, scale + scale * iy, scale, scale);
          } else if (map[iy][ix] == 1) {
            context.drawImage(img, 64, 0, 64, 64, scale + scale * ix, scale + scale * iy, scale, scale);
          } else if (map[iy][ix] === 0) {
            context.drawImage(img, 0, 0, 64, 64, scale + scale * ix, scale + scale * iy, scale, scale);
          }
        }
      }
    }
  
    function border() {
      for (var i = 0; i < 19; i++) {
        context.drawImage(img, 128, 0, 64, 64, scale * i, 0, scale, scale);
        context.drawImage(img, 128, 0, 64, 64, scale * i, height - scale, scale, scale);
      }
      for (i = 0; i < 13; i++) {
        context.drawImage(img, 128, 0, 64, 64, 0, scale * i, scale, scale);
        context.drawImage(img, 128, 0, 64, 64, width - scale, scale * i, scale, scale);
      }
    }
  
    function randomWithProbability() {
      var notRandomNumbers = [1, 1, 1, 0];
      var idx = Math.floor(Math.random() * notRandomNumbers.length);
      return notRandomNumbers[idx];
    }
  
    setInterval(function() {
      game();
    }, 1000 / 60);
    
    function frame() {
      if (player.isMoving){
        if (player.frame >= 3) {
          player.frame = 0
        } else { 
          player.frame++
        }
      }
      
      
    }
    
    setInterval(function() {
      frame();
    }, 250);
  })();