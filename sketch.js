var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var db;
var pos;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  db=firebase.database();
  createCanvas(windowWidth-20,windowHeight-20);

  balloon=createSprite(250,height-200,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;

  textSize(20);

  var loc=db.ref("balloon/position");
  loc.on("value",setP,showError);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    changeP(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    changeP(5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    changeP(0,-5);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    changeP(0,5);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("*Use arrow keys to move Hot Air Balloon!*",40,40);
}

function setP(value) {
  pos=value.val();

  balloon.position.x=pos.x;
  balloon.position.y=pos.y;
}

function changeP(x,y) {
  db.ref("balloon/position").set({
    x:pos.x+x,
    y:pos.y+y
  })
}

function showError() {
  console.error("Some error!");
}