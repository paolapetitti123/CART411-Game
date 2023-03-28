// Variable Declarations
let canvas;
let screen = 0;

function preload(){
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
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text('Start', width/2.7, 200);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text('Quit', width/1.6, 200);
  pop();

  
}

function gameScreen(){

}

function gameOverScreen(){

}