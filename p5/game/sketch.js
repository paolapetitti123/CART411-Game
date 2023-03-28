// Variable Declarations
let canvas;
let screen = 0;
let startTextImg;
let quitTextImg;
let startImg;
let quitImg;
let selection = 0;


function preload(){
  startTextImg = loadImage('./pictures/start.png');
  quitTextImg = loadImage('./pictures/quit.png');
}

function setup() {
  // put setup code here
  canvas = createCanvas(430, 300);
  startImg = createImg('./pictures/start.png');
  quitImg = createImg('./pictures/quit.png');
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
  

  startImg.mouseClicked(changeScene);
  startImg.position(canvas.width / 3.01, canvas.height /1.5);

  // quitImg.mouseClicked(changeScene);
  quitImg.position(canvas.width / 1.8, canvas.height /1.5);

}

function gameScreen(){

}

function gameOverScreen(){

}


function changeScene(){
  removeElements();
  screen += 1;
}
