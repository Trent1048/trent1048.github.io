var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  fill(0);
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  pointsData.on("child_removed", function () {
    points = [];
  });
  canvas.mousePressed(drawPoint);
 
  canvas.mouseMoved(function () {
    if (mouseIsPressed) {
      drawPoint();
    }
  });
 
}

function draw() {
  background(255);
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 5, 5);
  }
}

function drawPoint() {

  pointsData.push({x: mouseX, y: mouseY});
  return false;
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas("Painter Orpheus");
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
 
  pointsData.remove();
  points = [];
 
}
