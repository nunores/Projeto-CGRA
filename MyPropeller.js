/**
* MyPropeller
* @constructor
*/
class MyPropeller extends CGFobject {
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
            1,0,0, // 0
            0,0,0, // 1
            0,0,1, // 2
            1,0,-1, // 3
            0,0,-1, // 4

            1,0,0, // 5
            0,0,0, // 6
            0,0,1, // 7
            1,0,-1, // 8
            0,0,-1 // 9
		]

		this.indices = [
            0,1,2,
            2,1,0,
            0,1,3,
            3,1,0,
            4,3,1,
            1,3,4
        ];

        for(var i = 0; i < 5; i++)
            this.normals.push(0, 1, 0);

        
        for(var i = 0; i < 5; i++)
            this.normals.push(0, -1, 0);



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}




























