/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);

		this.orientationAngle = 0; // É 0 quando está virado para o eixo positivo dos ZZ
		this.velocity = 0;

		this.position = {
			'x': 0, 'y': 0, 'z': 0
		}

		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, Math.sqrt(2)/4,	//0
			Math.sqrt(2)/2, 0, -Math.sqrt(2)/4,	//1
			-Math.sqrt(2)/2, 0, -Math.sqrt(2)/4,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            2, 1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	turn(val){
		this.orientationAngle += val;
	}
	accelerate(val){
		this.velocity += val;
	}
	reset() {
		this.velocity = 0;
        this.orientationAngle = 0;
        resetPosition();
	}
	resetPosition(){
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;

	}
	display(){
		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

        super.display();
        this.scene.popMatrix();
	}
	update(){
		this.position.x += this.velocity * Math.sin(this.orientationAngle * Math.PI / 180);
		this.position.z += this.velocity * Math.cos(this.orientationAngle * Math.PI / 180);
	}
}

