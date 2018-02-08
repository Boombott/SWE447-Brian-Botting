
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
		//Front
		-0.5, -0.5, -0.5, //Vertex 0
		0.5, -0.5, -0.5, //Vertex 1
		0.5, 0.5, -0.5, //Vertex 2
		-0.5, 0.5, -0.5, //Vertex 3
		//Left
		-0.5, -0.5, 0.5, //Vertex 4
		-0.5, -0.5, -0.5, //Vertex 5
		-0.5, 0.5, -0.5, //Vertex 6
		-0.5, 0.5, 0.5, //Vertex 7
		//Bottom
		-0.5, -0.5, -0.5, //Vertex 8
		0.5, -0.5, -0.5, //Vertex 9
		0.5, -0.5, 0.5, //Vertex 10
		-0.5, -0.5, 0.5, //Vertex 11
		//Back
		-0.5, -0.5, 0.5, //Vertex 12
		0.5, -0.5, 0.5, //Vertex 13
		0.5, 0.5, 0.5, //Vertex 14
		-0.5, 0.5, 0.5, //Vertex 15
		//Top
		-0.5, 0.5, -0.5, //Vertex 16
		0.5, 0.5, -0.5, //Vertex 17
		0.5, 0.5, 0.5, //Vertex 18
		-0.5, 0.5, 0.5, //Vertex 19
		//Right
		0.5, -0.5, -0.5, //Vertex 20
		0.5, -0.5, 0.5, //Vertex 21
		0.5, 0.5, 0.5, //Vertex 22
		0.5, 0.5, -0.5  //Vertex 23
            ]),
        numComponents : 3
    };
  
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
		0, 2, 3,
		0, 1, 2,
		4, 6, 7,
		4, 5, 6,
		10, 8, 11,
		10, 9, 8,
		12, 14, 15,
		12, 13, 14,
		16, 18, 19,
		16, 17, 18,
		20, 22, 23,
		20, 21, 22
        ])
    };
    this.indices.count = this.indices.values.length;

	
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
