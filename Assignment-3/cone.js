var gl = null;
var cone = null; 

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    cone = new Cone();

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    gl.clearColor( 0.5, 0.2, 0.5, 0.7 );
    
    render();
}

function render() {
    cone.render();
}

window.onload = init;
