// Setting Variables 
let canvas;
let screen = 0;
let timer = 6;
let glitchTimer = 2;
let loadingTimer = 6;

// Sound variables
let welcomeMessage;
let questMessage;
let txtSoundEffect;
let clickSoundEffect;
let assessmentBegin;

// Counter variables 
let messagePlayCount = 0;
let questCount = 0;
let txtPlayCount = 0;
let correctAns = 0;
let assessmentCounter = 0;

// Image variables
let startTextImg;
let quitTextImg;
let startImg;
let quitImg;
let contImg;
let trueImg;
let falseImg;
let yesImg;
let noImg;
let tryAgainImg;
let qTwoAImg, qTwoBImg, qTwoCImg;
let trust, dontTrust;

// Video variables
let vid;
let vidLoading;

// arrays
let imgArray = [];
let totalImgs = 16;
let gifArray = [];
let totalGifs = 7;
let imgObj = {};
let arrayObjs = [];

function preload(){
  // images
  startImg = createImg('./pictures/start.png');
  quitImg = createImg('./pictures/quit.png');
  contImg = createImg('./pictures/continue.png');
  trueImg = createImg('./pictures/true.png');
  falseImg = createImg('./pictures/false.png');
  yesImg = createImg('./pictures/yes.png');
  noImg = createImg('./pictures/no.png');
  tryAgainImg = createImg('./pictures/try-again.png');
  qTwoAImg = createImg('./pictures/q2-answer-a.png');
  qTwoBImg = createImg('./pictures/q2-answer-b.png');
  qTwoCImg = createImg('./pictures/q2-answer-c.png');
  trust = createImg('./pictures/trust.png');
  dontTrust = createImg('./pictures/dontTrust.png');

  // videos
  vid = createVideo(['./video/newworld_LogoSmall.mp4'],vidSettings);
  vidLoading = createVideo(['./video/loading.mp4'],vidSettings);

  // sounds
  welcomeMessage = loadSound('./audio/welcome_message.mp3');
  questMessage = loadSound('./audio/question_start.mp3');
  assessmentBegin = loadSound('./audio/assessment_start.mp3');
  txtSoundEffect = loadSound('./audio/text_transition.wav');
  clickSoundEffect = loadSound('./audio/button_click.wav');

  // assessment pics and gifs
  for (let i = 1; i < totalImgs; i++)
  {
    imgArray[i] = loadImage("./assessment-pics/" + i + ".png");

    arrayObjs[i] = imgObj = {
      image: imgArray[i],
      trust: true
    }
  }

  for (let i = 1; i < totalGifs; i++)
  {
    gifArray[i] = loadImage("./assessment-pics/gifs/" + i + ".gif");

    arrayObjs.push(imgObj = {
      image: gifArray[i],
      trust: false
    })
  }
}

function setup() {
  // put setup code here
  canvas = createCanvas(430, 300);
  
  vid.hide();
  vidLoading.hide();
  txtSoundEffect.setVolume(1);

  console.log(arrayObjs);

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
    questionnaireStart();
  }
  else if(screen == 3){
    questionTwo();
  }
  else if(screen == 4){
    questionThree();
  }
  else if(screen == 5){
    questionFour();
  }
  else if(screen == 6){
    questionFive();
  }
  else if(screen == 7){
    questionSix();
  }
  else if(screen == 8){
    flashMessage();
  }
  else if(screen == 9){
    assessmentOne();
  }
  else if(screen == 20){
    gameOverScreen();
  }
}

function menuScreen(){

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 10);
  fill(255,255,255);
  textFont("VT323");
  text('ASSESSMENT TEST',width/2,110);
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

  vidLoading.size(375,300);
  vidLoading.noLoop();
}

function vidLoad(){
  startImg.hide();
  quitImg.hide();
  image(vid,20,10);
  if(frameCount % 60 == 0 && timer > 0){
    vid.volume(1);
    vid.play();
    timer--;
  }
  else if(timer == 0)
  {
    vid.stop();
    vid.size(0,0);
    introGame(); 
    
  }
}

function introGame()
{ 
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`Hello and welcome to\nNew World Corporation.`,width/2,110);
  pop();


  if(!welcomeMessage.isPlaying() && messagePlayCount <= 1){
    
    welcomeMessage.play();
    messagePlayCount++;
  }
  else if(messagePlayCount == 2){
    welcomeMessage.stop();
    contImg.position(canvas.width / 3.01, canvas.height /1.5);
    contImg.mouseClicked(changeScene);
  }




}

function questionnaireStart(){
  contImg.hide();
  image(vidLoading,20,10);
    if(frameCount % 60 == 0 && loadingTimer > 0){
      vidLoading.play();
      loadingTimer--;
    }
    else if(loadingTimer == 0)
    {
      vidLoading.stop();
      vidLoading.size(0,0);
    }
  if(!questMessage.isPlaying() && questCount <= 1){
    questMessage.play();
    questCount++;
    console.log("Counter:" + questCount);
    
  }
  else if(questCount == 2){
    questMessage.stop();
    

    if(!txtSoundEffect.isPlaying() && txtPlayCount <= 1){
      txtSoundEffect.play();
      txtPlayCount++;
    }
    else if(txtPlayCount == 2){
      txtSoundEffect.stop();
    }

   

    push();
    textAlign(CENTER, CENTER);
    textSize(width / 15);
    fill(255,255,255);
    textFont("VT323");
    text(`1. Are you alone?`,width/2,110);
    pop();
  
    yesImg.position(canvas.width / 3.01, canvas.height /1.5);
    yesImg.mouseClicked(correctAnswer);
  
    noImg.position(canvas.width / 1.8, canvas.height /1.5);
    noImg.mouseClicked(changeScene);
  }

}

function questionTwo(){
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`2. Have you noticed less\ncrime lately?`,width/2,110);
  pop();

  yesImg.position(canvas.width / 3.01, canvas.height /1.5);
  yesImg.mouseClicked(correctAnswer);

  noImg.position(canvas.width / 1.8, canvas.height /1.5);
  noImg.mouseClicked(changeScene);
}

function questionThree(){
  yesImg.hide();
  noImg.hide();
  startImg.hide();
  contImg.hide();

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`3. Pain is ___`,width/2,110);
  pop();

  qTwoAImg.position(canvas.width / 3.5, canvas.height /1.8);
  qTwoAImg.mouseClicked(changeScene);

  qTwoBImg.position(canvas.width / 3.5, canvas.height /1.5);
  qTwoBImg.mouseClicked(correctAnswer);

  qTwoCImg.position(canvas.width / 3.5, canvas.height /1.29);
  qTwoCImg.mouseClicked(changeScene);
}

function questionFour(){
  startImg.hide();
  contImg.hide();
  qTwoAImg.hide();
  qTwoBImg.hide();
  qTwoCImg.hide();

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`4. Being perfect,\nour world is safe`,width/2,110);
  pop();

  trueImg.position(canvas.width / 3.01, canvas.height /1.5);
  trueImg.mouseClicked(correctAnswer);

  falseImg.position(canvas.width / 1.8, canvas.height /1.5);
  falseImg.mouseClicked(changeScene);

}

function questionFive(){
  trueImg.hide();
  falseImg.hide()

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`5. Do CCTVs make you feel safe?`,width/2,110);
  pop();

  yesImg.show();
  yesImg.mouseClicked(correctAnswer);

  noImg.show();
  noImg.mouseClicked(changeScene);
}

function questionSix(){
  console.log("Current Score:" + correctAns);
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255,255,255);
  textFont("VT323");
  text(`6. Do you doubt yourself?`,width/2,110);
  pop();

  yesImg.show();
  yesImg.mouseClicked(changeScene);

  noImg.show();
  noImg.mouseClicked(correctAnswer);
}

function flashMessage(){
  yesImg.hide();
  noImg.hide();

  if(correctAns > 3){
    if(frameCount % 60 == 0 && glitchTimer > 0){
      startImg.hide();
      qTwoAImg.hide();
      qTwoBImg.hide();
      qTwoCImg.hide();
      trueImg.hide();
      falseImg.hide();
      quitImg.hide();
      tryAgainImg.hide();
      push();
      textAlign(CENTER, CENTER);
      textSize(width / 15);
      fill(255,255,255);
      textFont("VT323");
      text(`YOU'RE ALWAYS RIGHT.`,width/2,110);
      pop();
      glitchTimer--;
    }
    else if(glitchTimer == 0)
    {
      startImg.hide();
      qTwoAImg.hide();
      qTwoBImg.hide();
      qTwoCImg.hide();
      trueImg.hide();
      falseImg.hide();
      quitImg.hide();
      tryAgainImg.hide();
      push();
      textAlign(CENTER, CENTER);
      textSize(width / 15);
      fill(255,255,255);
      textFont("VT323");
      text(`Authenticity Assessment\nTrial`,width/2,height/2.5);
      pop();

      if(!assessmentBegin.isPlaying() && assessmentCounter <= 1){
        assessmentBegin.play();
        assessmentCounter++;
      }
      else if(assessmentCounter == 2){
        assessmentBegin.stop();
        contImg.position(width/2.6, canvas.height /1.5);
        contImg.mouseClicked(changeScene);
      }

    }
  }
  else if(correctAns < 3){
    push();
    textAlign(CENTER, CENTER);
    textSize(width / 15);
    fill(255,255,255);
    textFont("VT323");
    text(`FAIL.`,width/2,110);
    pop();  
    tryAgainImg.position(canvas.width / 1.8, canvas.height /1.5);
    tryAgainImg.mouseClicked(tryAgain);
    
  }
}

function assessmentOne(){
  // load the trust/don't trust buttons
  trust.position(width / 1.45, height / 3);
  dontTrust.position(width / 1.45, height / 1.7);


  // access a random image/gif from arraysObj

  // write if-else statement for whether trust/don't trust is clicked
  
  // generate new image after button click

  // have this go until all 6 gifs have been clicked as don't trust 
}


function tryAgain(){
  
  tryAgainImg.hide();
  clickSoundEffect.play();
  location.reload();
  console.log(screen);
}

function changeScene(){
  clickSoundEffect.play();
  screen += 1;
}

function correctAnswer(){
  correctAns++;
  clickSoundEffect.play();
  screen += 1;
}

function appearSoundEffect(){
  clickSoundEffect.play();
}