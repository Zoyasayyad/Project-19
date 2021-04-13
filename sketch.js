
var monkey, monkeyrunning;
var bg, bgImage;
var food, foodImage, foodGroup;
var obstacle, obastacleImage, obstacleGroup;
var ground;
var score=0;

function preload(){
  monkeyrunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bgImage=loadImage("jungle.jpg");
  foodImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");

}

function setup() {
  createCanvas(600,400)
  
  monkey=createSprite(70,330,10,10);
  monkey.addAnimation("monkeyrunning",monkeyrunning);
  monkey.scale=0.15;
  monkey.setCollider("circle",0,0,250);
  
  
  bg=createSprite(300,200,600,400);
  bg.addImage("jungle",bgImage);
  bg.x=bg.width/2;
  bg.velocityX=-4;
  monkey.depth=bg.depth;
  monkey.depth=monkey.depth+1;
  
  ground=createSprite(300,380,600,10);
  ground.visible=false;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
 
}

function draw() {
  background("white");
  
  if(keyDown("space")&&monkey.y>200){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);

  if(bg.x<100){
    bg.x=bg.width/2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
    score=score-2;
    obstacleGroup.destroyEach();
  }
  
  if(foodGroup.isTouching(monkey)){
    monkey.scale=0.15;
    score=score+2;
    foodGroup.destroyEach();
  }
  
  createFood();
  createObstacle();
  drawSprites();
  textSize(20);
  textFont("Times New Roman")
  fill("white");
  text("Score : "+score,450,50);
}

function makeFood(){
  food=createSprite(600,150,20,20);
  food.addImage("banana",foodImage);
  food.scale=0.05;
  food.velocityX=-5;
  foodGroup.add(food);
}

function createFood(){
  if(frameCount%300===0){
    makeFood();
  }
}

function makeObstacle(){
  obstacle=createSprite(600,335,10,10);
  obstacle.addImage("stone",obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-5;
  obstacle.setCollider("circle",0,0,200);
  obstacleGroup.add(obstacle);
}

function createObstacle(){
  if(frameCount%230===0){
    makeObstacle();
  }
}