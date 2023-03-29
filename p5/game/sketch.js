// Variable Declarations
let canvas;
let screen = 0;
let startTextImg;
let quitTextImg;
let startImg;
let quitImg;
let vid;
let vidPlaying = true;
let timer = 10;


function preload(){
  startImg = createImg('./pictures/start.png');
  quitImg = createImg('./pictures/quit.png');
  vid = createVideo(['./video/newworld_Logo.mp4'],vidSettings);
}

function setup() {
  // put setup code here
  canvas = createCanvas(430, 300);
  vid.hide();
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

  // putting in a quit button but it won't do anything
  quitImg.position(canvas.width / 1.8, canvas.height /1.5);

}

function gameScreen(){
  vidLoad();
 
}

function gameOverScreen(){

}

function vidSettings(){
  vid.size(375,300);
  vid.volume(0);
  vid.noLoop();
}

function vidLoad(){
  image(vid,10,10);
  if(frameCount % 60 == 0 && timer > 0){
    vid.play();
    timer--;
  }
  else if(timer == 0)
  {
    vid.stop();
    vid.size(0,0);
    
    push();
    textAlign(CENTER, CENTER);
    textSize(width / 10);
    fill(255,255,255);
    textFont("VT323");
    text('TEST',width/2,110);
    pop();
  }
  
}

function changeScene(){
  removeElements();
  screen += 1;
}
