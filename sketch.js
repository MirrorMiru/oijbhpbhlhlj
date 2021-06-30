var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var gameState = "play"
var oof

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  oofI = loadImage("gameOver.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);







  // Moving background
  path = createSprite(width / 2, height / 2);
  path.addImage(pathImg);
  path.velocityY = 5;
  path.scale = 8


  //creating boy running
  boy = createSprite(70, windowHeight/2, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  oof = createSprite(camera.position.x,camera.position.y, 20, 20)
  oof.addImage(oofI)
  oof.scale = 0.80
  oof.visible = false

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  camera.position.x = boy.x
  oof.x = camera.position.x
  oof.y = camera.position.y


  edges = createEdgeSprites();
  boy.collide(edges);

  if (gameState === "play") {
    if (path.y > height) {
      path.y = height / 2;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 50
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50
    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = "end"
      }
    }







  }
  if (gameState === "end") {
    boy.visible = false
    cashG.destroyEach()
    diamondsG.destroyEach()
    jwelleryG.destroyEach()
    swordGroup.destroyEach()
    cashG.setLifetimeEach(-1)
    diamondsG.setLifetimeEach(-1)
    jwelleryG.setLifetimeEach(-1)
    swordGroup.setLifetimeEach(-1)
    path.velocityY = 0
    oof.visible = true

  }







  drawSprites();
  textSize(20);
  fill("black");
  text("Treasure: " + treasureCollection, camera.position.x -50, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 5;
    cash.lifetime = 450;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = 450;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 5;
    jwellery.lifetime = 450;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 5;
    sword.lifetime = 450;
    swordGroup.add(sword);
  }
}