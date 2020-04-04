let farts = [];
let waves =[];
let fart;
let button;
let img;

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
    stroke(255, 66, 0,this.alpha)
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
    fill(255, 66, 0);
    imageMode(CENTER)
    circle(this.x, this.y, this.r);
    push();
    translate(this.x, this.y);
    rotate(.5);
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
  img = loadImage('assets/img/Whoopie@0.5x.png');
  //soundFormats('mp3','wav');
  for(let i = 1; i < 10; i++){
    farts.push(new Howl({src:['assets/farts/4A-03_638_00'+i+'_PrankSeat_FartSFX_0'+i+'_042718.mp3']}));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = new Button(windowWidth/2, windowHeight/2, windowHeight*.4);
  shuffle(farts, true);
}

function mousePressed() {
    fart = farts.shift();

    fart.play();

    farts.push(fart);
    console.log(farts);
    button.press();
    waves.push(new Wave(windowWidth/2, windowHeight/2, button.default_r));
}

function mouseReleased(){
  button.release();
}


function draw() {
    clear();
    // put drawing code here
    drawWaves();
    button.draw();
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
  for (let i = waves.length-1; i >= 0; i--){
    let wave = waves[i];
    wave.draw();
    if(wave.r > windowWidth*2){
      waves.splice(i,1);
    }
  }
}
