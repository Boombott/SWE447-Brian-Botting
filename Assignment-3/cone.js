var gl = null;
var cone = null; 

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    cone = new Cone(gl, 100);

    
    gl.clearColor( 0.5, 0.2, 0.5, 0.7 );
    
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

window.onload = init;
