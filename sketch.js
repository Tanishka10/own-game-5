var car ;
PLAY=1;
END=0;
var dis=0;
var gameState=PLAY;
function preload(){

  cari=loadImage("mainCar.png");
  track=loadImage("track2.png");
  opponent1=loadImage("o1.png");
  opponent2=loadImage("police1.png");
  opponent3=loadImage("police2.png");
  opponent4=loadImage("o4.png");
  opponent5=loadImage("o5.png");
  opponent6=loadImage("o6.png");
  checkImg=loadImage("chkPnt.png");
  sound=loadSound("music.mp3");
  checksound=loadSound("checkpoint.mp3");
  crashsound=loadSound("car crash.mp3");
  goImg=loadImage("Go.png");
  sound2=loadSound("win_tone.mp3");
  treasure=loadImage("treasure.jpg");

}

function setup(){
createCanvas(1200,900);

  car= createSprite(100,800,100,20);
  car.addImage("pc",cari);
  car.scale=0.5;

  ground=createSprite(60,600,1200,50);
  ground.x=ground.width/2;
  ground.addImage("track",track);
  ground.velocityX=-5;
  ground.depth=car.depth;
  ground.scale=2.5;
  car.depth+=1;
  car.setCollider("circle",0,-70,50);
  car.debug=true;
   opponentsGroup=new Group();
   checkpointsGroup=new Group();
   sound.play();
   gameover=createSprite(560,600,1200,50);
   gameover.addImage("over",goImg);
   gameover.scale=1.2;
   g1=createSprite(60,950,1200,20);
    g2=createSprite(60,660,1200,20);
     g1.visible=false;
      g2.visible=false;

      win=createSprite(2500,600,1200,50);
   win.addImage("over",treasure);
   win.visible=false;
   win.scale=0.8;
   win.velocityX=-5;

}

function draw(){

  background(255);
  if(gameState===PLAY)
  {
    gameover.visible=false;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
    if(keyDown("up"))
    {
      car.y-=5
    }
    if(keyDown("down"))
    {
      car.y+=5
    }

    if(opponentsGroup.isTouching(car))
    {
      gameover.visible=true;
      gameState=END;
      crashsound.play();
    }

    if(checkpointsGroup.isTouching(car))
    {
      checksound.play();
      dis=dis+1;
      checkpointsGroup.destroyEach();
    }
    
    if( car.isTouching(win)){

      sound2.play();
      win.visible=true;
      win.velocityX=0
      gameState=END;
    }
    opponents();
    checkPoints()
  }
  if(gameState===END)
  {
    
    
    opponentsGroup.setVelocityXEach(0);
    opponentsGroup.setLifetimeEach(-1);
    checkpointsGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    car.velocityX=0;
    car.velocityY=0;
    checkpointsGroup.velocityX=0;
  }

  
car.bounceOff(g1)
car.bounceOff(g2)
  drawSprites();
}

function opponents(){
  if(frameCount%150===0){
var opponent=createSprite(1200,random(700,900),100,20);
opponent.scale=0.4;
opponent.velocityX=-6;
var ran=Math.round(random(1,6))
switch(ran){

  case 1: opponent.addImage("o1",opponent1);
  break;
  case 2: opponent.addImage("o2",opponent2);
  break;
  case 3: opponent.addImage("o3",opponent3);
  break;
  case 4: opponent.addImage("o4",opponent4);
  break;
  case 5: opponent.addImage("o5",opponent5);
  break;
  case 6: opponent.addImage("o6",opponent6);
  break;
  default:break;

}
opponentsGroup.add(opponent)
opponent.lifetime=1000;


  }
}

function checkPoints()
{
  if(frameCount%500===0)
  {
    var check=createSprite(1200,800,50,50)
    check.addImage("checkpoint",checkImg)
    check.velocityX=-6;
    check.scale=0.3;
    check.lifetime=1000;
    checkpointsGroup.add(check);
  }
  
}