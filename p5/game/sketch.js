// Variable Declarations
let canvas;
let screen = 0;
let startTextImg;
let quitTextImg;

function preload(){
  startTextImg = loadImage('./pictures/start.png');
  quitTextImg = loadImage('./pictures/quit.png');
}

function setup() {
  // put setup code here
  canvas = createCanvas(430, 300);
}

function draw() {
  // put drawing code here
  background(0,0,0);
  if(screen == 0){
    menuScreen();
  }
  else if(screen == 1)
  {
    gameScreen();
  }
  else if(screen == 2){
    gameOverScreen();
  }
}

function menuScreen(){
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 10);
  fill(255,255,255);
  textFont("VT323");
  text('ASSESMENT TEST',width/2,110);
  pop();
  
  push();
  image(startTextImg, width/3.2, 189, 50, 25)
  pop();

  push();
  image(quitTextImg, width/1.8, 189, 50, 25)
  pop();
}

function gameScreen(){

}

function gameOverScreen(){

}


function changeScene(){
  screen += 1;
}