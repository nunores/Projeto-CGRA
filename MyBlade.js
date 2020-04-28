/**
* MyBlade
* @constructor
*/
class MyBlade extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

		this.vertices = [
            0,0,0, // 0
            4,0,0, // 1
            4,1,0, // 2
            0,1,0, // 3

            0,0,0, // 4
            4,0,0, // 5
            4,1,0, // 6
            0,1,0 // 7
		]

		this.indices = [
            0,1,2,
            2,1,0,
            0,3,2,
            2,3,0
        ];

        
        
        for(var i = 0; i < 4; i++)
            this.normals.push(0, 0, 1);

        
        for(var i = 0; i < 4; i++)
            this.normals.push(0, 0, -1);



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

