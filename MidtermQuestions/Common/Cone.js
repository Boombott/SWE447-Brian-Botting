const DefaultNumSides = 8;

function Cone( gl, numSides, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cone-vertex-shader";
    var fragShdr = fragmentShaderId || "Cone-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cone shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    
	this.count = 24;
	this.positions = {
		values : new Float32Array([
			//Face 1
			-1.0, -1.0, -1.0,
			0.0, 0.0, 1.0,
			0.0, -1.5, -1.0,
			
			//Face 2
			0.0, -1.5, -1.0,
			0.0, 0.0, 1.0,
			1.0, -1.0, -1.0,
			
			//Face 3
			1.0, -1.0, -1.0,
			0.0, 0.0, 1.0,
			1.5, 0.0, -1.0,
			
			//Face 4
			1.5, 0.0, -1.0,
			0.0, 0.0, 1.0,
			1.0, 1.0, -1.0,
			
			//Face 5
			1.0, 1.0, -1.0,
			0.0, 0.0, 1.0,
			0.0, 1.5, -1.0,
			
			//Face 6
			0.0, 1.5, -1.0,
			0.0, 0.0, 1.0,
			-1.0, 1.0, -1.0,
			
			//Face 7
			-1.0, 1.0, -1.0,
			0.0, 0.0, 1.0,
			-1.5, 0.0, -1.0,
			
			//Face 8
			-1.5, 0.0, -1.0,
			0.0, 0.0, 1.0,
			-1.0, -1.0, -1.0
			
		]),
		numComponents : 3 // 3 components for each
		// position (3D coords)
	};
	
     	this.colors = {
		values : new Float32Array([
		    1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,
			
			1.0, 0.0, 0.0, 1.0,   
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0,    
		    1.0, 0.0, 0.0, 1.0
		]),
		numComponents : 4 
	};
	this.indices = {
		values : new Uint16Array([
			0, 1, 2,
			3, 4, 5,
			6, 7, 8,
			9, 10, 11,
			12, 13, 14,
			15, 16,17,
			18, 19, 20,
			21, 22, 23
		])
	};
	// positions
    	this.positions.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.positions.values), gl.STATIC_DRAW );
	gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
    	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    	gl.enableVertexAttribArray( this.positions.attributeLoc );

		// colors
    	this.colors.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.colors.values), gl.STATIC_DRAW );
	gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );

    	this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    	gl.enableVertexAttribArray( this.colors.attributeLoc );


	// indices
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

	this.uniforms = {
	  MV : undefined,
	  P : undefined
	}; 

	this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");

  	this.MV = mat4(); // or undefined
  	this.P = mat4();

	
    this.render = function () {
        	gl.useProgram( this.program );
        	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );

       
        	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
        	gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );


        	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

		gl.uniformMatrix4fv( this.uniforms.MV, gl.FALSE, flatten(this.MV) );
		gl.uniformMatrix4fv( this.uniforms.P, gl.FALSE, flatten(this.P) );


		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);

	};
};
