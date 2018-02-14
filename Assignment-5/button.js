var rotationAxis;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];

function init() {
  document.getElementById("xButton").onclick = function() {
    console.log("Someone pressed this button");
  }
}

function render() {
  ms.rotate(speed * angle, rotationAxis);
}
