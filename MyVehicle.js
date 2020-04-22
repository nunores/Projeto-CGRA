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
		var scene = this.scene;

		this.sphere = new MySphere(scene, 40, 40);
		this.cylinder = new MyCylinder(scene, 250);
		this.complementarySphere = new MySphere(scene, 40, 40);
		this.motorSphere = new MySphere(scene, 40, 40); 

		this.propeller = new MyPropeller(scene);
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
		this.position = {
			'x': 0, 'y': 0, 'z': 0
		}
	}
	display(){
		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		// Construção do dirgível

		// Sphere

		//this.scene.translate(0, 10, 0); ///////////////////////////////////////////////

		this.scene.scale(this.scene.scaleFactor/2, this.scene.scaleFactor/2, this.scene.scaleFactor);
				
		this.sphere.display();

		this.scene.popMatrix();

		// Cylinder (cockpit)

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);

		this.scene.scale(this.scene.scaleFactor /8, this.scene.scaleFactor / 8, this.scene.scaleFactor /1.5);

		this.scene.translate(0, 0, -0.5);

		this.scene.translate(0, -4, 0);

		this.scene.rotate(Math.PI/2, 1, 0, 0);
		
		this.cylinder.display();

		this.scene.popMatrix();

		// Complementary Spheres

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor /8, this.scene.scaleFactor/8, this.scene.scaleFactor/8);

		this.scene.translate(0, 0, 2.5);
		this.scene.translate(0, -4, 0);
		
		this.complementarySphere.display();

		this.scene.popMatrix();
		
		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor /8, this.scene.scaleFactor/8, this.scene.scaleFactor/8);

		this.scene.translate(0, 0, -2.5);
		this.scene.translate(0, -4, 0);
		
		this.complementarySphere.display();

		this.scene.popMatrix();
		
		// Motor Spheres

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		//this.scene.translate(0, 10, 0); ///////////////////////////////////////////////

		this.scene.scale(this.scene.scaleFactor/18, this.scene.scaleFactor/18, this.scene.scaleFactor/9);

		this.scene.translate(2,0,0);
		this.scene.translate(0, 5, 0);
		this.scene.translate(0,0,-3);
		this.scene.translate(0,-15,0);

		this.motorSphere.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		//this.scene.translate(0, 10, 0); ///////////////////////////////////////////////

		this.scene.scale(this.scene.scaleFactor/18, this.scene.scaleFactor/18, this.scene.scaleFactor/9);

		this.scene.translate(-2,0,0);
		this.scene.translate(0,5,0);
		this.scene.translate(0,0,-3);
		this.scene.translate(0,-15,0);

		this.motorSphere.display();

		this.scene.popMatrix();

		//Propeller (horizontais)
		
		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5);
		
		this.scene.translate(0.5,0,-2);

		this.propeller.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5);
		
		this.scene.translate(-0.5,0,-2);
		
		this.scene.rotate(Math.PI, 0,0, 1);

		this.propeller.display();

		this.scene.popMatrix();

		//Propeller (verticais)

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5);
		
		this.scene.translate(0,0.5,-2);
		
		this.scene.rotate(Math.PI/2, 0,0, 1);

		this.propeller.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0);
		
		this.scene.scale(this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5, this.scene.scaleFactor/2.5);
		
		this.scene.translate(0,-0.5,-2);
		
		this.scene.rotate(-Math.PI/2, 0,0, 1);

		this.propeller.display();

		this.scene.popMatrix();

	}
	update(){
		this.position.x += this.velocity * Math.sin(this.orientationAngle * Math.PI / 180);
		this.position.z += this.velocity * Math.cos(this.orientationAngle * Math.PI / 180);
	}
}

