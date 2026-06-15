const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// TILE SIZE
const TILE = 32;

// SIMPLE TILEMAP (0 = floor, 1 = wall)
const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,2,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// PLAYER
let player = {
  x: 2 * TILE,
  y: 2 * TILE,
  speed: 2
};

// INPUT
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// CHECK COLLISION
function isWall(x, y) {
  let tileX = Math.floor(x / TILE);
  let tileY = Math.floor(y / TILE);
  return map[tileY][tileX] === 1;
}

// UPDATE PLAYER
function update() {
  let newX = player.x;
  let newY = player.y;

  if (keys["ArrowUp"]) newY -= player.speed;
  if (keys["ArrowDown"]) newY += player.speed;
  if (keys["ArrowLeft"]) newX -= player.speed;
  if (keys["ArrowRight"]) newX += player.speed;

  // Collision check
  if (!isWall(newX, player.y)) player.x = newX;
  if (!isWall(player.x, newY)) player.y = newY;
}

// DRAW MAP
function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "#444"; // wall
      } else {
        ctx.fillStyle = "#777"; // floor
      }
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);

      // NPC tile
      if (map[y][x] === 2) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(x * TILE + 8, y * TILE + 8, 16, 16);
      }
    }
  }
}

// DRAW PLAYER
function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, TILE, TILE);
}

// MAIN LOOP
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawMap();
  drawPlayer();
  requestAnimationFrame(loop);
}

loop();
