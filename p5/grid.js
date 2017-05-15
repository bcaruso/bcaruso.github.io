var side = 25;
var spot;

var off1 = 1;
var off2 = 100;

var canvas;
function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
  noFill();
  stroke("#ffffff");
  strokeWeight(.5);
  spot = createVector(random(0,windowWidth),random(0,windowHeight));
  for(var i = 0; i<windowWidth; i+= side+2) {
    for (var j = 0; j<windowHeight; j+= side+2){
      rect(i, j, side, side);
    }
  }
  colorMode(HSB,255);
  frameRate(20);
  rectMode(CENTER);
}

function draw(){
  clear();
  stroke("#ffffff");
  for(var i = 0; i<windowWidth; i+= side+2) {
    for (var j = 0; j<windowHeight; j+= side+2){
      var d = dist(spot.x, spot.y, i, j);
      c = color(0, d*(noise(off2)*4), 255);
      var s = saturation(c);
      stroke(s,60);
      rect(i, j, map(d,0,300,side/3,0), map(d,0,300,side/3,0));

      d = dist(windowWidth-spot.x, windowHeight-spot.y, i, j);
      c = color(0, d*(noise(off2)*4), 255);
      s = saturation(c);
      stroke(s,60);
      rect(i, j, map(d,0,300,side/2,0), map(d,0,300,side/2,0));
    }
  }
  spot.x = noise(off1) * windowWidth/2;
  spot.y = noise(off2) * windowHeight;
  off1+= .003;
  off2+= .003;
  //fill("#00FF00");
//rect(spot.x,  spot.y,side, side);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
