let words = [];
let waves =[];
let texts = [];
let file_words = ['COCKSUCKER','CUNT','FUCK','FUCK','FUCK','MOTHERFUCKER','SHIT','TITS','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','COCKSUCKER','CUNT','FUCK','FUCK','MOTHERFUCKER','PISS','SHIT','TITS','CUNT','FUCK','TITS'];
let loading_words = ['SH!T','PISS','F_CK','C*NT','C#CKSUCKER','MOTHERF_CKER','TITS']
let word;
let button;
let img;
let font;
let loading = 0;

p5.disableFriendlyErrors = true;

class Wave {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.stroke = 10;
    this.alpha = 100;
  }

  draw(){
    push();
    noFill();
    strokeWeight(this.stroke);
    stroke(0, 56, 214,this.alpha)
    circle(this.x, this.y, this.r);
    pop();
    this.update();
  }

  update(){
    this.r+= 10;
    this.stroke++;
    this.alpha -= .75;
  }

  updateCenter(x,y){
    this.x = x;
    this.y = y;
  }
}

class Word {
  constructor(x, y, word) {
    this.x = x;
    this.y = y;
    this.dx = random(0,2)-1;
    this.dy = random(0,2)-1;
    this.word = word;
    this.size = 18;
    this.alpha = 100;
  }

  draw(){
    push();
    translate(windowWidth/2, windowHeight/2);
    let text_color = color(255);
    text_color.setAlpha(this.alpha);
    fill(text_color);
    textSize(this.size);
    textFont(font);
    textAlign(CENTER, CENTER);
    text(this.word, this.x, this.y);
    pop();
    this.update();
  }

  update(){
    this.x -= (this.dx*10)+2;
    this.y -= (this.dy*10)+2;
    this.size ++;
    this.alpha -= .75;
  }
}


class Button {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.default_r = radius;
    this.r = radius;
    this.pressed = false;
  }

  draw(){
    this.update();
    push();
    noStroke();
    fill(0, 56, 214)
    imageMode(CENTER)
    circle(this.x, this.y, this.r);
    push();
      translate(this.x, this.y);
      tint(255, 127);
      image(img, 0, 0, this.r*.6, this.r*.6);
    pop();
    pop();
  }

  update(){
    if(this.pressed){
      if(this.r >= this.default_r*.9){
        this.r --;
      }
    }else{
      if(this.r < this.default_r){
        this.r++
      }else{
        this.pressed = false;
      }
    }
  }

  press(){
    this.pressed = true;
  }

  release(){
    this.pressed = false;
  }

  updateCenter(x,y){
    this.x = x;
    this.y = y;
    this.default_r = windowHeight*.4;
  }
}

function preload() {
  img = loadImage('assets/img/SevenDirty@0.5x.png');
  font = loadFont('assets/fonts/SharpGroteskSmBold18.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = new Button(windowWidth/2, windowHeight/2, windowHeight*.4);
  for(let i = 1; i < 82; i++){
    audio = new Howl({src:['assets/sevendirty/8A-01_632_0'+i+'_DirtyWords.wav'], onload: function(){loading++}})
    audio.text_word = file_words[i-1];
    words.push(audio);
  }
  shuffle(words, true);
}

function mousePressed() {
    word = words.shift();
    word.play();
    words.push(word);
    button.press();
    waves.push(new Wave(windowWidth/2, windowHeight/2, button.default_r));
    let limit = int(random(3,5));
    for(let i = 0; i<limit; i++){
      texts.push(new Word(0, 0, word.text_word));
    }
}

function mouseReleased(){
  button.release();
}


function draw() {
    clear();
    if(loading != file_words.length-1){
      drawLoadingWords();
    }else{
      drawWaves();
      drawWords();
      button.draw();
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.updateCenter(windowWidth/2,windowHeight/2);
  for (let i = waves.length-1; i >= 0; i--){
    let wave = waves[i];
    wave.updateCenter(windowWidth/2,windowHeight/2);
  }
}

function drawWaves(){
  push();
  for (let i = waves.length-1; i >= 0; i--){
    let wave = waves[i];
    wave.draw();
    if(wave.r > windowWidth*2){
      waves.splice(i,1);
    }
  }
  pop();
}

function drawWords(){
  push();
  for (let i = texts.length-1; i >= 0; i--){
    let word = texts[i];
    word.draw();
    if(word.x > windowWidth*2 || word.x < -windowWidth*2 &&  word.y > windowHeight*2 || word.y < -windowHeight*2){
      texts.splice(i,1);
    }
  }
  pop();
}

let current_word = loading_words[0];

function drawLoadingWords(){
  current_word = loading_words[floor(loading/12)];
  push()
  translate(windowWidth/2, windowHeight/2)
  let text_color = color(255);
  text_color.setAlpha(100);
  fill(text_color);
  textSize(18);
  textFont(font);
  textAlign(CENTER, CENTER);
  text("Loading Seven Dirty Words... \n\n" + current_word,0,0);
  pop();
}
