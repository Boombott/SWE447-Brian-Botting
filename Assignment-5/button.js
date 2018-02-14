var rotationAxis;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];

function init() {
  document.getElementById("slider").onchange = function() {
    speed = 100 - event.srcElement.value;
  }
}

function render() {
  ms.rotate(speed * angle, rotationAxis);
}
