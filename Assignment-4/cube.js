
var cube = undefined;
var gl = undefined;
var angle = 0;

var rotationAxis;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];

function init() {
  var canvas = document.getElementById( "webgl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );

  if ( !gl ) {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Cube();
  
  document.getElementById("slider").onchange = function() {
    speed = 100 - event.srcElement.value;
  };

  render();
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 2.0; // degrees

  cube.MV = rotate( angle, [1, 1, 0] );

  cube.render();

  ms.rotate(speed * angle, rotationAxis);
  requestAnimationFrame( render ); // schedule another call to render()
}

window.onload = init;
