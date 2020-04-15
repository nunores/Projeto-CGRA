/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,	  //0
			0.5, 0.5, -0.5,	  //1
			-0.5, 0.5, 0.5,	  //2
            -0.5, 0.5, -0.5,  //3
            0.5, -0.5, 0.5,	  //4
			0.5, -0.5, -0.5,  //5
			-0.5, -0.5, 0.5,  //6
			-0.5, -0.5, -0.5, //7
			
			0.5, 0.5, 0.5,	  //8
			0.5, 0.5, -0.5,	  //9
			-0.5, 0.5, 0.5,	  //10
            -0.5, 0.5, -0.5,  //11
            0.5, -0.5, 0.5,	  //12
			0.5, -0.5, -0.5,  //13
			-0.5, -0.5, 0.5,  //14
			-0.5, -0.5, -0.5, //15
			
			0.5, 0.5, 0.5,	  //16
			0.5, 0.5, -0.5,	  //17
			-0.5, 0.5, 0.5,	  //18
            -0.5, 0.5, -0.5,  //19
            0.5, -0.5, 0.5,	  //20
			0.5, -0.5, -0.5,  //21
			-0.5, -0.5, 0.5,  //22
            -0.5, -0.5, -0.5  //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            5,6,7,
            7,6,5,
            6,5,4,
            4,5,6,

            // Ficam
            2,3,7,
            7,3,2, 
            7,6,2,
            2,6,7, 
            
            // Ficam
            7,3,1,
            1,3,7, 
            1,5,7,
            7,5,1
		];

		this.normals = [];

		// Desenha as normais no sentido dos zz
        for(var i = 0; i < 2; i++){
			for(var j = 0; j < 4; j++){
				if((j % 2) == 0){
					this.normals.push(0, 0, 1);
				}
				else{
					this.normals.push(0, 0, -1);
				}
			}
		}

		// Desenha no sentido dos yy
        for(var i = 0; i < 4; i++){
			this.normals.push(0, 1, 0);
		}

        for(var i = 0; i < 4; i++){
			this.normals.push(0, -1, 0);
		}

		// Desenha nos sentidos dos xx

		for(var j = 0; j < 2; j++){
			this.normals.push(1, 0, 0);
		}

		for(var k = 0; k < 2; k++){
			this.normals.push(-1, 0, 0);
		}

		for(var j = 0; j < 2; j++){
			this.normals.push(1, 0, 0);
		}

		for(var k = 0; k < 2; k++){
			this.normals.push(-1, 0, 0);
		}



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}


