var JUMP = -10;
var FALL = 10;
var groundSprites;
//var skySprites;
var GROUND_SPRITE_WIDTH = 50;
//var SKY_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
//var SKY_SPRITE_HEIGHT = 50;
var numGroundSprites;
//var numSkySprites;
var player;
var obstacleSprites;
var obstacle
var isGameOver;
var score;
var playerImage;
var obstacleImage;

function preload() {
	playerImage = loadImage("trent1048.github.io/ship.png");
	obstacleImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
}

function setup() {
	isGameOver = false;
	score = 0;

	createCanvas(window.innnerWidth, window.innerHeight);
	background(0, 0, 0);
	groundSprites = new Group();
	//skySprites = new Group();
	obstacleSprites = new Group();

	numGroundSprites = width/GROUND_SPRITE_WIDTH + 1;
	for (var n = 0; n < numGroundSprites; n++) {
		var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
		groundSprite.shapeColor = color(0, 0, 0);
		groundSprites.add(groundSprite);
	}
	
	/*numSkySprites = width/SKY_SPRITE_WIDTH + 1;
	for (var n = 0; n < numSkySprites; n++) {
		var skySprite = createSprite(n*50, 25, SKY_SPRITE_WIDTH, SKY_SPRITE_HEIGHT);
		skySprite.shapeColor = color(0, 0, 0);
		skySprites.add(skySprite);*/
	}

	player = createSprite(100, height-75, 50, 50);
	player.addImage(playerImage);
}

function draw() {
	if (isGameOver) {
		background(0);
    	fill(255);
    	textAlign(CENTER);
    	text("Your score was:" + score, camera.position.x, camera.position.y - 20);
    	text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
	} else {
	background(0, 0, 0);

	if (groundSprites.overlap(player)) {
		player.position.y = 0;
	}
		
	/*if (skySprites.overlap(player)) {
		player.position.y = 100;
	}*/

	if (keyDown(UP_ARROW)) {
		player.position.y = player.position.y + JUMP;
	}
		
	if (keyDown(DOWN_ARROW)) {
		player.position.y = player.position.y + FALL;
	}
		
	if (keyDown(RIGHT_ARROW)){
            player.position.x = player.position.x + 20;
            camera.position.x = player.position.x + (width/4);
        }else {
		player.position.x = player.position.x + 10;
		camera.position.x = player.position.x + (width/4);
	}

	var firstGroundSprite = groundSprites[0];

	if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
  		groundSprites.remove(firstGroundSprite);
  		firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
  		groundSprites.add(firstGroundSprite);
	}
		
	/*var firstSkySprite = skySprites[0];

	if (firstSkySprite.position.x <= camera.position.x - (width/2 + firstSkySprite.width/2)) {
  		skySprites.remove(firstSkySprite);
  		firstSkySprite.position.x = firstSkySprite.position.x + numSkySprites*firstSkySprite.width;
  		skySprites.add(firstSkySprite);
	}*/

	if (random() > 0.95) {
		obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
		obstacleSprites.add(obstacle);
		obstacle.rotationSpeed = 4.0;
		obstacle.addImage(obstacleImage);
	}
		
	if (random() > 0.95) {
		obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
		obstacleSprites.add(obstacle);
		obstacle.rotationSpeed = 4.0;
		obstacle.addImage(obstacleImage);
	}

	var firstObstacle = obstacleSprites[0];
	if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)){
		removeSprite(firstObstacle);
	}

	obstacleSprites.overlap(player, endGame);

	drawSprites();

	score = score + 1;
	textAlign(CENTER);
	text(score, camera.position.x, 10);
	}
}

function endGame() {
	isGameOver = true;	
}

function mouseClicked() {
  	if (isGameOver) {

    for (var n = 0; n < numGroundSprites; n++) {
    	var groundSprite = groundSprites[n];
    	groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();

    score = 0;

    isGameOver = false;
	}
}
