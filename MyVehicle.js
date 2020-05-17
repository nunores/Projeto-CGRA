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
		this.autoPilot = false;

		this.sphere = new MySphere(scene, 40, 40);
		this.cylinder = new MyCylinder(scene, 250);
		this.complementarySphere = new MySphere(scene, 40, 40);
		this.motorSphere = new MySphere(scene, 40, 40);
		this.propeller = new MyPropeller(scene);
		this.blade = new MyBlade(scene);
		this.flag = new MyPlaneFlag(scene, 20);
		this.connector = new MyCylinder(scene, 20);

		this.perpendicular = 0;
		this.direction_vector_x = 0;
		this.direction_vector_z = 0;

		this.center_x = 0;
		this.center_z = 0;

		this.pilotAngle = 0;
		this.angularSpeed = 360 / 5;

		this.time = 0;
		this.deltaTime = 0;

		this.initMaterials();
	}
	initMaterials() {
		this.ballonMaterial = new CGFappearance(this.scene);
		this.ballonMaterial.setAmbient(0.1, 0.1, 0.1, 1);
		this.ballonMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.ballonMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.ballonMaterial.setShininess(10.0);
		this.ballonMaterial.loadTexture('images/zeppelin/ballon_texture.jpg');
		this.ballonMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.propellerMaterial = new CGFappearance(this.scene);
		this.propellerMaterial.setAmbient(0.1, 0.1, 0.1, 1);
		this.propellerMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.propellerMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.propellerMaterial.setShininess(10.0);
		this.propellerMaterial.loadTexture('images/zeppelin/red_texture.jpg');
		this.propellerMaterial.setTextureWrap('REPEAT', 'REPEAT');


		this.cockpitMaterial = new CGFappearance(this.scene);
		this.cockpitMaterial.setAmbient(225 / 255, 198 / 255, 153 / 255, 1);
		this.cockpitMaterial.setDiffuse(225 / 1.4 / 255, 198 / 1.4 / 255, 153 / 1.4 / 255, 1);
		this.cockpitMaterial.setSpecular(225 / 1.4 / 255, 198 / 1.4 / 255, 153 / 1.4 / 255, 1);
		this.cockpitMaterial.setShininess(6.0);

		this.flagMaterial = new CGFtexture(this.scene, "images/flag.png");
		
		this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagShader.setUniformsValues({ flagMap: 5 })
        this.flagShader.setUniformsValues({ speedFactor: this.velocity });

	}
	turn(val) {
		this.orientationAngle += val;
	}
	accelerate(val) {
		this.velocity += val;
	}
	reset() {
		this.velocity = 0;
		this.orientationAngle = 0;
		this.position = {
			'x': 0, 'y': 0, 'z': 0
		}
	}
	display() {
		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		// Construção do dirgível

		// Sphere

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 2, this.scene.scaleFactor / 2, this.scene.scaleFactor);

		this.ballonMaterial.apply();
		this.sphere.display();

		this.scene.popMatrix();

		// Cylinder (cockpit)

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 8, this.scene.scaleFactor / 8, this.scene.scaleFactor / 1.5);

		this.scene.translate(0, 0, -0.5);

		this.scene.translate(0, -4, 0);

		this.scene.rotate(Math.PI / 2, 0, 0, 1);

		this.scene.rotate(Math.PI / 2, 1, 0, 0);

		this.cockpitMaterial.apply();
		this.cylinder.display();

		this.scene.popMatrix();

		// Complementary Spheres

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 8, this.scene.scaleFactor / 8, this.scene.scaleFactor / 8);

		this.scene.translate(0, 0, 2.5);
		this.scene.translate(0, -4, 0);

		this.complementarySphere.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 8, this.scene.scaleFactor / 8, this.scene.scaleFactor / 8);

		this.scene.translate(0, 0, -2.5);
		this.scene.translate(0, -4, 0);

		this.complementarySphere.display();

		this.scene.popMatrix();

		// Motor Spheres

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY


		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 18, this.scene.scaleFactor / 18, this.scene.scaleFactor / 9);

		this.scene.translate(2, 0, 0);
		this.scene.translate(0, 5, 0);
		this.scene.translate(0, 0, -3);
		this.scene.translate(0, -15, 0);

		this.ballonMaterial.apply();
		this.motorSphere.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 18, this.scene.scaleFactor / 18, this.scene.scaleFactor / 9);

		this.scene.translate(-2, 0, 0);
		this.scene.translate(0, 5, 0);
		this.scene.translate(0, 0, -3);
		this.scene.translate(0, -15, 0);

		this.ballonMaterial.apply();
		this.motorSphere.display();

		this.scene.popMatrix();

		//Propeller (horizontais)

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5);

		this.scene.translate(0.5, 0, -2);

		this.propellerMaterial.apply();
		this.propeller.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5);

		this.scene.translate(-0.5, 0, -2);

		this.scene.rotate(Math.PI, 0, 0, 1);

		this.propeller.display();

		this.scene.popMatrix();

		//Propeller (verticais)

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		if (this.scene.isMovingLeft) {
			this.scene.rotate(-Math.PI / 16, 0, 1, 0);
		}

		if (this.scene.isMovingRight) {
			this.scene.rotate(Math.PI / 16, 0, 1, 0);
		}

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5);

		this.scene.translate(0, 0.5, -2);

		this.scene.rotate(Math.PI / 2, 0, 0, 1);

		this.propeller.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		if (this.scene.isMovingLeft) {
			this.scene.rotate(-Math.PI / 16, 0, 1, 0);
		}

		if (this.scene.isMovingRight) {
			this.scene.rotate(Math.PI / 16, 0, 1, 0);
		}

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5, this.scene.scaleFactor / 2.5);

		this.scene.translate(0, -0.5, -2);

		this.scene.rotate(-Math.PI / 2, 0, 0, 1);

		this.propeller.display();

		this.scene.popMatrix();

		//Flag

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY
		
		this.scene.setActiveShader(this.flagShader);
		this.flagMaterial.bind(5);
		this.scene.translate(0,10,-3);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.75, 1, 1);
		this.flag.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);

		// Connectors





		// Motor Propeller

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		//this.scene.rotate(this.scene.motorAngle, 0, 0, 1) // Rotação do motor

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor / 30, this.scene.scaleFactor / 30, this.scene.scaleFactor / 30);

		this.scene.translate(1.5, 0, 0);
		this.scene.translate(0, 8, 0);
		this.scene.translate(0, 0, -13.5);
		this.scene.translate(0, -25, 0);


		this.scene.translate(2, 0.5, 0);
		this.scene.rotate(this.scene.motorAngle, 0, 0, 1) // Rotação do motor
		this.scene.translate(-2, -0.5, 0);

		this.blade.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientationAngle * Math.PI / 180, 0, 1, 0) // Ângulo referente ao eixo dos YY

		this.scene.translate(0, 10, 0);

		this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

		this.scene.scale(this.scene.scaleFactor / 30, this.scene.scaleFactor / 30, this.scene.scaleFactor / 30);

		this.scene.translate(-5.5, 0, 0);
		this.scene.translate(0, 10, 0);
		this.scene.translate(0, 0, -13.5);
		this.scene.translate(0, -25, 0);

		this.scene.translate(2, 0.5, 0);
		this.scene.rotate(this.scene.motorAngle, 0, 0, 1) // Rotação do motor
		this.scene.translate(-2, -0.5, 0);

		this.blade.display();

		this.scene.popMatrix();

	}
	calculateCenter() {

		this.perpendicular = this.orientationAngle + 90;

		this.direction_vector_x = Math.sin(this.perpendicular * Math.PI / 180);
		this.direction_vector_z = Math.cos(this.perpendicular * Math.PI / 180);

		this.center_x = this.position.x + this.direction_vector_x * 5;
		this.center_z = this.position.z + this.direction_vector_z * 5;
	}
	update(t) {
		this.scene.motorAngle += this.velocity * 6;
		this.flagShader.setUniformsValues({ timeFactor: this.deltaTime });
		if (this.autoPilot) {
			this.deltaTime = this.deltaTime / 1000;
			this.orientationAngle += this.deltaTime * this.angularSpeed;

			// Reposition

			this.position.x = this.center_x - 5 * Math.sin(this.orientationAngle * Math.PI / 180 - 3 * Math.PI / 2);
			this.position.z = this.center_z + 5 * Math.cos(this.orientationAngle * Math.PI / 180 - Math.PI / 2);

			this.time = t;
		}
		else {
			this.position.x += this.velocity * Math.sin(this.orientationAngle * Math.PI / 180);
			this.position.z += this.velocity * Math.cos(this.orientationAngle * Math.PI / 180);
		}

	}
}

