var m_topPipeImg, m_botPipeImg, m_bodyPipeImg, m_birdImg, m_backImg;
var m_music;
var m_backgroundCount = 0;
var m_pipeCount = 0;
var m_bird;
var m_lift = -5;
var m_gravity = 0.2;
var m_pipes = [];
var m_score = 0;
var m_pipeSpeed = 2;
var m_musicCheckbox;
var m_firstTime = true;
var m_difficultyRadio;
var m_started = false;

function preload() {
  m_topPipeImg = loadImage("TE.png");
  m_botPipeImg = loadImage("BE.png");
  m_bodyPipeImg = loadImage("body.png");
  m_birdImg = loadImage("bird.png");
  m_backImg = loadImage("backround.png");
  m_music = loadSound('Theme.mp3');
}

function setup() {
  createCanvas(550, 400);
  angleMode(DEGREES);
  m_backImg.resize(width, height);  // cannot be called in preload()
  m_birdImg.resize(m_birdImg.width/20, m_birdImg.height/20);  // cannot be called in preload()
  m_bird = new Bird(m_birdImg.height);
  m_pipes.push(new Pipe);
  m_musicCheckbox = createCheckbox('music', false);
  m_musicCheckbox.changed(audioChange);
  m_difficultyRadio = createRadio();
  m_difficultyRadio.option('2', 'Easy  ');
  m_difficultyRadio.option('3', 'Medium  ');
  m_difficultyRadio.option('4', 'Hard  ');
  m_difficultyRadio.option('5', 'Extreme  ');
  m_difficultyRadio.option('7', 'Ludicrous Speed');
  m_difficultyRadio.selected('3');
  createP("Select options, click in window, and then press space to begin (and to jump)");
}

function audioChange() {
  if (m_musicCheckbox.checked()) {
    m_music.loop();
    // console.log('checked');
  } else {
    m_music.stop();
    // console.log('unchecked');
  }
}

function draw() {
  background(0);
  if (m_firstTime) {
    m_firstTime = false;
    audioChange();
  }

  m_pipeSpeed = Number(m_difficultyRadio.value());

  if (1) {
    image(m_backImg, 0-m_backgroundCount, 0);
    // note sure why the -2 is necessary, but I see a faint line without it
    image(m_backImg, width-m_backgroundCount-2, 0);
    m_backgroundCount++;
    if (m_backgroundCount >= width) m_backgroundCount = 0;
  }

  fill(255);
  textSize(32);
  text(m_score, 0, 32);

  m_bird.update();
  m_bird.show();

  if (!m_started) {
    return;
  }

  if (m_pipeCount >= 300/m_pipeSpeed) {
    m_pipeCount = 0;
    m_pipes.push(new Pipe);
  }
  m_pipeCount++;

  for (let i = m_pipes.length-1; i >= 0; i--){
    m_pipes[i].update();
    m_pipes[i].show();
    if (m_pipes[i].x < -35) {
      m_pipes.splice(i, 1);
      m_score++;
    }
  }

  for (let p of m_pipes) {
    let gameOver = p.hitBird(m_bird);

    if (gameOver) {
      fill(255,0, 0);
      text('GAME OVER', 200, height/2);
      noLoop();
    }
  }

}

function keyPressed() {
  if (key == ' ') {
    m_bird.applyForce(m_lift);
    m_started = true;
  }
}