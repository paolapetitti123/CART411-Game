// Setting Variables 
let canvas;
let screen = 0;
let glitchScreens = true;
let gameStatus;

// Timer variables
let timer = 6;
let glitchTimer = 2;
let loadingTimer = 6;
let footageTimer = 30;
let textTimer = 20;

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
let finalCorrectAnswer = 0;
let assessPoints = 0;
let assessmentCounter = 0;
let assessGifCounter = 1;

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
let foundfootage;
let vhsOverlay;

// arrays
let imgArray = [];
let totalImgs = 16;
let gifArray = [];
let totalGifs = 27;
let imgObj = {};
let arrayObjs = [];

// Game State Bools
let gamePlaying;  // IF this becomes FALSE, the game is over 
let answer = 1;
let wrongAns = -1;

function preload() {
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
  vid = createVideo(['./video/newworld_LogoSmall.mp4'], vidSettings);
  vidLoading = createVideo(['./video/loading.mp4'], vidSettings);
  foundfootage = createVideo(['./video/found-footage.mp4'], vidSettings);

  // sounds
  welcomeMessage = loadSound('./audio/welcome_message.mp3');
  questMessage = loadSound('./audio/question_start.mp3');
  assessmentBegin = loadSound('./audio/assessment_start.mp3');
  txtSoundEffect = loadSound('./audio/text_transition.wav');
  clickSoundEffect = loadSound('./audio/button_click.wav');

  // assessment pics and gifs
  for (let i = 1; i < totalGifs; i++) {
    gifArray[i] = createImg("./assessment-pics/gifs/" + i + ".gif", 'gif');

    arrayObjs[i] = imgObj = {
      image: gifArray[i]
    }
  }
}

// window.parent.postMessage(['gamePlaying', gamePlaying], '*');

function setup() {
  // put setup code here
  canvas = createCanvas(430, 300);
  vid.hide();
  vidLoading.hide();
  foundfootage.hide();


  txtSoundEffect.setVolume(1);

  console.log(arrayObjs);
  contImg.hide();
  trueImg.hide();
  falseImg.hide();
  yesImg.hide();
  noImg.hide();
  tryAgainImg.hide();
  qTwoAImg.hide();
  qTwoBImg.hide();
  qTwoCImg.hide();
  trust.hide();
  dontTrust.hide();
  for (let i = 1; i < 27; i++) {
    arrayObjs[i].image.hide();
  }

}

function draw() {
  background(15, 15, 15);
  
  if (screen == 0) {
    menuScreen();
  }
  else if (screen == 1) {
    gameScreen();
  }
  else if (screen == 2) {
    questionnaireStart();
  }
  else if (screen == 3) {
    questionTwo();
  }
  else if (screen == 4) {
    questionThree();
  }
  else if (screen == 5) {
    questionFour();
  }
  else if (screen == 6) {
    questionFive();
  }
  else if (screen == 7) {
    questionSix();
  }
  else if (screen == 8) {
    flashMessage();
  }
  else if (screen == 9) {
    assessmentOne();
  }
  else if(screen == 10){
    foundFootagePlay();
  }
  else if(screen == 11){
    assesFail();
  }
  else if (screen == 20) {
    gameOverScreen();
  }
}

function mouseClicked(){
  if(screen == -1){
    screen +=1;
  }
}

function turnOn(){

}

function menuScreen() {
  gamePlaying = true;

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 10);
  fill(255, 255, 255);
  textFont("VT323");
  text('ASSESSMENT TEST', width / 2, 110);
  pop();

  startImg.mouseClicked(changeScene);
  startImg.position(canvas.width / 3.01, canvas.height / 1.5);

  // putting in a quit button but it won't do anything
  quitImg.position(canvas.width / 1.8, canvas.height / 1.5);

}

function gameScreen() {
  vidLoad();
  startImg.hide();
  quitImg.hide();
}




function vidSettings() {
  vid.size(375, 300);
  vid.volume(0);
  vid.noLoop();

  vidLoading.size(375, 300);
  vidLoading.noLoop();

  foundfootage.size(375, 300);
  foundfootage.noLoop();

}

function vidLoad() {
  startImg.hide();
  quitImg.hide();
  image(vid, 20, 10);
  if (frameCount % 60 == 0 && timer > 0) {
    vid.volume(1);
    vid.play();
    timer--;
  }
  else if (timer == 0) {
    vid.stop();
    vid.size(0, 0);
    introGame();

  }
}

function introGame() {
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`Hello and welcome to\nNew World Corporation.`, width / 2, 110);
  pop();


  if (!welcomeMessage.isPlaying() && messagePlayCount <= 1) {

    welcomeMessage.play();
    messagePlayCount++;
  }
  else if (messagePlayCount == 2) {
    welcomeMessage.stop();
    contImg.show();
    contImg.position(canvas.width / 3.01, canvas.height / 1.5);
    contImg.mouseClicked(changeScene);
  }




}

function questionnaireStart() {
  contImg.hide();
  image(vidLoading, 20, 10);
  if (frameCount % 60 == 0 && loadingTimer > 0) {
    vidLoading.play();
    loadingTimer--;
  }
  else if (loadingTimer == 0) {
    vidLoading.stop();
    vidLoading.size(0, 0);
  }
  if (!questMessage.isPlaying() && questCount <= 1) {
    questMessage.play();
    questCount++;
    console.log("Counter:" + questCount);

  }
  else if (questCount == 2) {
    questMessage.stop();


    if (!txtSoundEffect.isPlaying() && txtPlayCount <= 1) {
      txtSoundEffect.play();
      txtPlayCount++;
    }
    else if (txtPlayCount == 2) {
      txtSoundEffect.stop();
    }

    // gamePlaying == false;

    

    push();
    textAlign(CENTER, CENTER);
    textSize(width / 15);
    fill(255, 255, 255);
    textFont("VT323");
    text(`1. Are you alone?`, width / 2, 110);
    pop();
    yesImg.show();
    yesImg.position(canvas.width / 3.01, canvas.height / 1.5);
    yesImg.mouseClicked(correctAnswer);

    noImg.show();
    noImg.position(canvas.width / 1.8, canvas.height / 1.5);
    noImg.mouseClicked(changeScene);
  }

}

function questionTwo() {
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`2. Have you noticed less\ncrime lately?`, width / 2, 110);
  pop();

  yesImg.position(canvas.width / 3.01, canvas.height / 1.5);
  yesImg.mouseClicked(correctAnswer);

  noImg.position(canvas.width / 1.8, canvas.height / 1.5);
  noImg.mouseClicked(changeScene);
}

function questionThree() {
  yesImg.hide();
  noImg.hide();
  startImg.hide();
  contImg.hide();

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`3. Pain is ___`, width / 2, 110);
  pop();

  qTwoAImg.show();
  qTwoAImg.position(canvas.width / 3.5, canvas.height / 1.8);
  qTwoAImg.mouseClicked(changeScene);

  qTwoBImg.show();
  qTwoBImg.position(canvas.width / 3.5, canvas.height / 1.5);
  qTwoBImg.mouseClicked(correctAnswer);

  qTwoCImg.show();
  qTwoCImg.position(canvas.width / 3.5, canvas.height / 1.29);
  qTwoCImg.mouseClicked(changeScene);
}

function questionFour() {
  startImg.hide();
  contImg.hide();
  qTwoAImg.hide();
  qTwoBImg.hide();
  qTwoCImg.hide();

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`4. Being perfect,\nour world is safe`, width / 2, 110);
  pop();

  trueImg.show();
  trueImg.position(canvas.width / 3.01, canvas.height / 1.5);
  trueImg.mouseClicked(correctAnswer);

  falseImg.show();
  falseImg.position(canvas.width / 1.8, canvas.height / 1.5);
  falseImg.mouseClicked(changeScene);

}

function questionFive() {
  trueImg.hide();
  falseImg.hide()

  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`5. Do CCTVs make you feel safe?`, width / 2, 110);
  pop();

  yesImg.show();
  yesImg.mouseClicked(correctAnswer);

  noImg.show();
  noImg.mouseClicked(changeScene);
}

function questionSix() {
  console.log("Current Score:" + correctAns);
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  fill(255, 255, 255);
  textFont("VT323");
  text(`6. Do you doubt yourself?`, width / 2, 110);
  pop();

  yesImg.show();
  yesImg.mouseClicked(changeScene);

  noImg.show();
  noImg.mouseClicked(correctAnswer);
}

function flashMessage() {
  yesImg.hide();
  noImg.hide();

  if (correctAns > 3) {
    if (frameCount % 60 == 0 && glitchTimer > 0) {
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
      fill(255, 255, 255);
      textFont("VT323");
      text(`YOU'RE ALWAYS RIGHT.`, width / 2, 110);
      pop();
      glitchTimer--;
    }
    else if (glitchTimer == 0) {
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
      fill(255, 255, 255);
      textFont("VT323");
      text(`Authenticity Assessment\nTrial`, width / 2, height / 2.5);
      pop();

      if (!assessmentBegin.isPlaying() && assessmentCounter <= 1) {
        assessmentBegin.play();
        assessmentCounter++;
      }
      else if (assessmentCounter == 2) {
        assessmentBegin.stop();
        contImg.show();
        contImg.position(width / 2.6, canvas.height / 1.5);
        contImg.mouseClicked(changeScene);
      }

    }
  }
  else if (correctAns < 3) {
    push();
    textAlign(CENTER, CENTER);
    textSize(width / 15);
    fill(255, 255, 255);
    textFont("VT323");
    text(`FAIL.`, width / 2, 110);
    pop();
    tryAgainImg.show();
    tryAgainImg.position(canvas.width / 1.8, canvas.height / 1.5);
    tryAgainImg.mouseClicked(tryAgain);

  }
}

function assessmentOne() {
  // making sure that all the old buttons are hidden
  startImg.hide();
  quitImg.hide();
  contImg.hide();
  trueImg.hide();
  falseImg.hide();
  yesImg.hide();
  noImg.hide();
  tryAgainImg.hide();
  qTwoAImg.hide();
  qTwoBImg.hide();
  qTwoCImg.hide();


  // load the trust/don't trust buttons
  trust.show();
  dontTrust.show();
  dontTrust.position(width / 1.45, height / 1.7);
  trust.position(width / 1.45, height / 3);

  if (assessGifCounter < 27) {
    let i = assessGifCounter;
    arrayObjs[i].image.show();
    arrayObjs[i].image.position(width / 6, height / 4);
    if (i == 8 || i == 11 || i == 15 || i == 16 || i == 21 || i == 22 || i == 23 ||
      i == 25 || i == 26 || i == 27) {
      trust.mouseClicked(badAns);
      dontTrust.mouseClicked(corrAns);
    }
    else if(assessGifCounter == 4){
      trust.mouseClicked(corrAns);
      dontTrust.mouseClicked(badAns);
      if (frameCount % 60 == 0 && textTimer > 0) {
        console.log("in here");
        textAlign(CENTER, CENTER);
        textSize(width / 5);
        fill(196, 26, 18);
        textFont("VT323");
        text(`WAKE UP`, width / 2, height/2);
        footageTimer--;
      }
      else if (textTimer == 0) {
        textAlign(CENTER, CENTER);
        textSize(width / 5);
        fill(255, 255, 255);
        textFont("VT323");
        text(` `, width / 2, height/2);
      }
    }
    else {
      trust.mouseClicked(corrAns);
      dontTrust.mouseClicked(badAns);
    }

  }
}

function corrAns() {
  if (assessGifCounter >= 26 && assessPoints >= 6) {
    console.log(assessGifCounter);
    changeScene();
  }
  else if (assessGifCounter >= 26 && assessPoints <= 5) {
    console.log(assessGifCounter);
    changeSceneDouble();
  }
  else {
    arrayObjs[assessGifCounter].image.hide();
    assessGifCounter++;
    assessPoints += 1;
  }

  clickSoundEffect.play();


}

function badAns() {
  if (assessGifCounter >= 26 && assessPoints >= 6) {
    console.log('good ending');
    changeScene();
  }
  else if (assessGifCounter >= 26 && assessPoints < 6) {
    console.log('bad ending');
    console.log(assessGifCounter);
    changeSceneDouble();
  }
  else {
    arrayObjs[assessGifCounter].image.hide();
    assessGifCounter++;
  }
  clickSoundEffect.play();
}

function foundFootagePlay(){
  trust.hide();
  dontTrust.hide();
  for (let i = 1; i < 27; i++) {
    arrayObjs[i].image.hide();
  }
  image(foundfootage, 20, 10);
  if (frameCount % 60 == 0 && footageTimer > 0) {
    foundfootage.volume(1);
    foundfootage.play();
    footageTimer--;
  }
  else if (footageTimer == 0) {
    foundfootage.stop();
    foundfootage.size(0, 0);
    gameStatus = 1;
    window.parent.postMessage(['gamePlaying', gamePlaying == false], '*');
    gameOverScreen(gameStatus);
  }
}

function assesFail(){
  trust.hide();
  dontTrust.hide();
  for (let i = 1; i < 27; i++) {
    arrayObjs[i].image.hide();
  }
  gameStatus = 0;
  gameOverScreen(gameStatus);
}


function changeSceneDouble(){
  clickSoundEffect.play();
  screen += 2;
}

function gameOverScreen(gameStatus) {
  if(gameStatus ==  1){
    push();
    textAlign(CENTER, CENTER);
    textSize(width / 10);
    fill(255, 255, 255);
    textFont("VT323");
    text(`WAKE UP`, width / 2, height/2);
  pop();
  }
  else if(gameStatus == 0){
    push();
    textAlign(CENTER, CENTER);
    textSize(width / 15);
    fill(255, 255, 255);
    textFont("VT323");
    text(`FAIL.`, width / 2, 110);
    pop();
    tryAgainImg.show();
    tryAgainImg.position(canvas.width / 1.8, canvas.height / 1.5);
    tryAgainImg.mouseClicked(tryAgain);
  }

  
    

}

function tryAgain() {

  tryAgainImg.hide();
  clickSoundEffect.play();
  location.reload();
  console.log(screen);
}

function changeScene() {
  clickSoundEffect.play();
  screen += 1;
}

function correctAnswer() {
  correctAns++;
  clickSoundEffect.play();
  screen += 1;
}

function appearSoundEffect() {
  clickSoundEffect.play();
}



/**
 *  Code below comes from here
 * https://codepen.io/pbitos/pen/zypwVr?editors=1111
 */
  
/* COUNTER */
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

var totalSeconds = 0;

setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  document.getElementById("seconds").innerHTML = pad(totalSeconds % 60);
  document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60));
}

/* TIME IN FORMAT HH:MM:SS */
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

setInterval(getTime, 1000);

function getTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers < 10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function() {
    getTime()
  }, 500);
}