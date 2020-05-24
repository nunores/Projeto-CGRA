/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 4);
        this.cubemap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this, 20);
        this.billboard = new MyBillboard(this);

        //this.flag = new MyPlane(this.scene, 20);

        this.supply1 = new MySupply(this);
        this.supply2 = new MySupply(this);
        this.supply3 = new MySupply(this);
        this.supply4 = new MySupply(this);
        this.supply5 = new MySupply(this);

        this.supplies = [this.supply1, this.supply2, this.supply3, this.supply4, this.supply5];
        this.nSuppliesDelivered = 0;

        // Textures and Materials
        this.incompleteSphereMaterial = new CGFappearance(this);
        this.incompleteSphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.incompleteSphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1); // Setting default values from other exercises
        this.incompleteSphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.incompleteSphereMaterial.setShininess(10.0);
        this.incompleteSphereMaterial.loadTexture("images/earth.jpg");
        this.incompleteSphereMaterial.setTextureWrap('REPEAT', 'REPEAT');


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayIncompleteSphere = false;
        this.displayCylinder = false;
        this.displayCubeMap = true;
        this.displayVehicle = true;
        this.displayTerrain = true;
        this.displaySupply = true;
        this.displayBillboard = true;

        this.selectedTexture = 0;
        this.textureIds = { 'Default': 0, 'Volcano': 1 };

        this.speedFactor = 1;
        this.scaleFactor = 1;

        this.isMovingLeft = false;
        this.isMovingRight = false;

        this.motorAngle = 0;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 40, 50), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if (this.vehicle.time == 0) {
            this.vehicle.deltaTime = 0;
            this.vehicle.time = t;
        }
        else {
            this.vehicle.deltaTime = t - this.vehicle.time;
            this.vehicle.time = t;
        }
        
        for(var i = 0; i < 5; i++){
            if(this.supplies[i].time == 0){
                this.supplies[i].deltaTime = 0;
                this.supplies.time = t;
            }
            else{
                this.supplies[i].deltaTime = t - this.supplies[i].time;
                this.supplies[i].time = t;            
            }
        }

        this.checkKeys();
        this.vehicle.update(t);

        for(var i = 0; i < 5; i++){
            if(this.supplies[i].state == this.supplies[i].SupplyStates.FALLING)
                this.supplies[i].update(t);
        }

        this.billboard.update();
        
    }

    updateTexture() {
        this.cubemap.updateTexture();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        if (this.displayCylinder) {
            // Testing purposes
            this.incompleteSphereMaterial.apply();
            this.cylinder.display();
        }

        //This sphere does not have defined texture coordinates
        if (this.displayIncompleteSphere) {
            this.incompleteSphereMaterial.apply();
            this.incompleteSphere.display();
        }

        if (this.displayCubeMap) {
            this.cubemap.display();
        }

        if (this.displayVehicle) {
            this.vehicle.display();
        }

        if (this.displayTerrain) {
            this.terrain.display();
        }

        if(this.displayBillboard){
            this.billboard.display();
        }
        
        for (var i = 0; i < 5; i++)
        {
            this.supplies[i].display();
        }

        

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        this.isMovingLeft = false;
        this.isMovingRight = false;


        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.autoPilot) {
            text += " W ";
            keysPressed = true;

            this.vehicle.accelerate(this.speedFactor * 0.01);
        }
        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.autoPilot) {
            text += " A ";
            keysPressed = true;
            this.isMovingLeft = true;
            this.isMovingRight = false;

            var temp = this.vehicle.velocity;

            this.vehicle.velocity = 0;
            this.vehicle.turn(5);

            this.vehicle.velocity = temp;
        }

        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.autoPilot) {
            text += " S ";
            keysPressed = true;

            this.vehicle.accelerate(-this.speedFactor * 0.01);
        }

        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.autoPilot) {

            text += " D ";
            keysPressed = true;
            this.isMovingLeft = false;
            this.isMovingRight = true;

            var temp = this.vehicle.velocity;

            this.vehicle.velocity = 0;
            this.vehicle.turn(-5);

            this.vehicle.velocity = temp;

        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;

            this.vehicle.autoPilot = false;
            this.vehicle.deltaTime = 0;
            for (var i = 0; i < 5; i++){
                this.supplies[i].deltaTime = 0;
                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;

            this.vehicle.reset();
        }

        if (this.gui.isKeyPressed("KeyP") && this.vehicle.autoPilot) {
            text += " P ";
            keysPressed = true;

            this.vehicle.autoPilot = false;
            this.vehicle.velocity = 0;
        }
        else{

        if (this.gui.isKeyPressed("KeyP") && !this.vehicle.autoPilot) {
            text += " P ";
            keysPressed = true;

            this.vehicle.autoPilot = true;
            this.vehicle.calculateCenter();

        }
    }

        

        if(this.gui.isKeyPressed("KeyL") && !this.vehicle.autoPilot && this.nSuppliesDelivered < 5){
            text += " L ";
            keysPressed = true;

            //this.supply.drop(this.vehicle.position);
            this.supplies[this.nSuppliesDelivered].drop(this.vehicle.position);
            this.nSuppliesDelivered++;
        }

        if (keysPressed) {
            console.log(text);
        }
    }
}