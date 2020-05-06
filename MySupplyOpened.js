/**
 * MySupplyOpened
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupplyOpened extends CGFobject {
    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
    };

	constructor(scene) {
		super(scene);
        this.scene = scene;
        


		this.initBuffers();
	}
	initBuffers() {
		var scene = this.scene;
		this.quad = new MyQuad(scene);
		this.initMaterials();
	}

	initMaterials() {
        this.crate_side = new CGFappearance(this.scene);
        this.crate_side.setAmbient(0.1, 0.1, 0.1, 1);
        this.crate_side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.crate_side.setSpecular(0.1, 0.1, 0.1, 1);
        this.crate_side.setShininess(10.0);
        this.crate_side.loadTexture('images/crate/crate_side.jpg');
        this.crate_side.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
		var scene = this.scene;

		// Top

		scene.pushMatrix();

		scene.translate(0, 0.5, 0);
		scene.rotate(-Math.PI/2, 1, 0, 0);
		this.mineTopMaterial.apply();
		
		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
		
		this.quad.display();
		
		scene.popMatrix();

		
		// Bottom

		scene.pushMatrix();

		scene.translate(0, -0.5, 0);
		scene.rotate(Math.PI/2, 1, 0, 0);
		this.mineBottomMaterial.apply();

		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);

		this.quad.display();
		
		scene.popMatrix();

		// Left

		scene.pushMatrix();

        scene.translate(-0.5, 0, 0);
		scene.rotate(-Math.PI/2, 0, 1, 0);
		this.mineSideMaterial.apply();
		
		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
		
		this.quad.display();
		
		scene.popMatrix();

		// Right

		scene.pushMatrix();

        scene.translate(0.5, 0, 0);
		scene.rotate(Math.PI/2, 0, 1, 0);
		this.mineSideMaterial.apply();

		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
		
		this.quad.display();
		
		scene.popMatrix();

		// Front

		scene.pushMatrix();

		scene.translate(0, 0, 0.5);
		this.mineSideMaterial.apply();

		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
		
		this.quad.display();
		
		scene.popMatrix();

		// Back

		scene.pushMatrix();

		scene.translate(0, 0, -0.5);
		scene.rotate(Math.PI, 0, 1, 0);
		this.mineSideMaterial.apply();
		
		if(scene.betterRes)
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		else
			scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
			
		this.quad.display();
		
		scene.popMatrix();

	}
}
