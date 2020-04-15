/**
* MyCubeMap
* @constructor
*/
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


