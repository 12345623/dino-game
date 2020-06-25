
var obstaclegroup
var cloudgroup
var trex, trex_running,trex_collided;
var ground,ground_image,invisible_ground;
var play=1
var end=2
var gamestate=play
var clound_image
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var gameover
var Reset
var checkpoint
var die
var jump
var score
score=0;

function preload(){
trex_running=loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation ("trex_collided.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameover=loadImage("gameOver.png")
  Reset=loadImage("restart.png")
  checkpoint=loadSound("checkPoint[1].mp3")
  die=loadSound("die[1].mp3")
  jump=loadSound("jump[1].mp3")
}

function setup() {
  createCanvas(600, 200);
  trex= createSprite(20,180);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  trex.addAnimation("collided",trex_collided);
  
  ground=createSprite(200,190)
  ground.addImage("ground",ground_image)
  ground.velocityX=-(12+3*score/100);
  if (ground.x<100)
  ground.x=200
    
  invisiground=createSprite(200,195,400,10);
  invisiground.visible=false;
  trex.collide(invisiground);
  cloudgroup=new Group();
  obstaclegroup=new Group();
  trex.setCollider("circle",0,0,40);
 //    trex.debug=true;
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameover);
  
  reset=createSprite(300,130);
  reset.addImage(Reset);
}

function draw() {
  background(250);
  if (ground.x<100)
  ground.x=1000
  
  if (gamestate===play){
   if (keyDown("space")&&trex.y>160){
    trex.velocityY=-12  
     jump.play();
   }
    trex.velocityY=trex.velocityY+0.8
    spawnclouds();
    spawnobstacles();
    if (obstaclegroup.isTouching(trex)){
      die.play();
      gamestate=end
    }
    gameOver.visible=false;
    reset.visible=false;
    if(frameCount%5===0)
    score=score+1;
    text("SCORE "+score,430,50,textSize(15))
    if(score%100===0&&score>1){
    checkpoint.play();
    }
  }
  else
  {
    ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY=0;
    gameOver.visible=true;
    gameOver.scale=0.8;
    reset.visible=true;
    reset.scale=0.5;
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    
    if (mousePressedOver(reset)){
     gamestate=play;
     gameOver.visible=false;
     reset.visible=false;
     obstaclegroup.destroyEach();
     cloudgroup.destroyEach();
     trex.changeAnimation("running",trex_running);
     ground.velocityX=-12;
      score=0;
    }
    
  }
  //console.log(trex.y)
  trex.collide(invisiground)
  drawSprites();
  
  
}

function spawnclouds() {
  if (frameCount%50===0){
  var cloud=createSprite (600,Math.round (random (1,160) ))
  cloud.addImage(cloud_image)
    cloud.velocityX=-8;
    cloud.scale=0.8;
    cloud.lifetime=150;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
   cloudgroup.add(cloud);   
  }
}

function spawnobstacles(){
  if (frameCount%60===0){
  var obstacle=createSprite(600,170)
  obstacle.scale=0.6;
  obstacle.lifetime=150;
    
  var rand=Math.round(random (1,6))
  obstacle.velocityX=-12;
  switch (rand){
    case 1:obstacle.addImage(obstacle1);
    break;
    
    case 2:obstacle.addImage(obstacle2);
    break;
    
    case 3:obstacle.addImage(obstacle3);
    break;
    
    case 4:obstacle.addImage(obstacle4);
    break;
    
    case 5:obstacle.addImage(obstacle5);
    break;
    
    case 6:obstacle.addImage(obstacle6);
    break;
  }
    obstaclegroup.add(obstacle);
}
}