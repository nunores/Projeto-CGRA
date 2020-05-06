/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {
        this.plane = new MyPlane(this.scene, 20);

        this.initMaterials();
    }
    initMaterials() {
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainVert = new CGFtexture(this.scene, "images/terrain/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "images/terrain/heightmap.jpg");

        this.terrainShader.setUniformsValues({ terrain: 0 });
        this.terrainShader.setUniformsValues({ heightmap: 1 });
    }
    display() {

        this.scene.setActiveShader(this.terrainShader);
        this.terrainVert.bind(0);
        this.terrainMap.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0, -5, 0);
        this.scene.scale(50, 8, 50);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);


    }
}

