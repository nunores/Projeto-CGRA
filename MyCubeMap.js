/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
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
        this.mineTopMaterial = new CGFappearance(this.scene);
        this.mineTopMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTopMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineTopMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineTopMaterial.setShininess(10.0);
		this.mineTopMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineTopMaterial.loadTexture('images/split_cubemap/top.png');
        this.mineTopMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.mineBottomMaterial = new CGFappearance(this.scene);
        this.mineBottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineBottomMaterial.setShininess(10.0);
		this.mineBottomMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineBottomMaterial.loadTexture('images/split_cubemap/bottom.png');
		this.mineBottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.mineFrontMaterial = new CGFappearance(this.scene);
        this.mineFrontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineFrontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineFrontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineFrontMaterial.setShininess(10.0);
		this.mineFrontMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineFrontMaterial.loadTexture('images/split_cubemap/front.png');
		this.mineFrontMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.mineBackMaterial = new CGFappearance(this.scene);
        this.mineBackMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBackMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBackMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineBackMaterial.setShininess(10.0);
		this.mineBackMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineBackMaterial.loadTexture('images/split_cubemap/back.png');
        this.mineBackMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.mineLeftMaterial = new CGFappearance(this.scene);
        this.mineLeftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineLeftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineLeftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineLeftMaterial.setShininess(10.0);
		this.mineLeftMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineLeftMaterial.loadTexture('images/split_cubemap/left.png');
		this.mineLeftMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
		this.mineRightMaterial = new CGFappearance(this.scene);
        this.mineRightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineRightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineRightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.mineRightMaterial.setShininess(10.0);
		this.mineRightMaterial.setEmission(0.9, 0.9, 0.9, 1);
        this.mineRightMaterial.loadTexture('images/split_cubemap/right.png');
		this.mineRightMaterial.setTextureWrap('REPEAT', 'REPEAT');

	}

	display() {
		var scene = this.scene;

		scene.scale(50, 50, 50);

		// Top

		scene.pushMatrix();

		scene.translate(0, 0.5, 0);
		scene.rotate(-Math.PI/2, 1, 0, 0);
		this.mineTopMaterial.apply();
		
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		
		this.quad.display();
		
		scene.popMatrix();

		
		// Bottom

		scene.pushMatrix();

		scene.translate(0, -0.5, 0);
		scene.rotate(Math.PI/2, 1, 0, 0);
		this.mineBottomMaterial.apply();

		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);

		this.quad.display();
		
		scene.popMatrix();

		// Left

		scene.pushMatrix();

        scene.translate(-0.5, 0, 0);
		scene.rotate(-Math.PI/2, 0, 1, 0);
		this.mineLeftMaterial.apply();
		
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		
		this.quad.display();
		
		scene.popMatrix();

		// Right

		scene.pushMatrix();

        scene.translate(0.5, 0, 0);
		scene.rotate(Math.PI/2, 0, 1, 0);
		this.mineRightMaterial.apply();

		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		
		this.quad.display();
		
		scene.popMatrix();

		// Front

		scene.pushMatrix();

		scene.translate(0, 0, 0.5);
		this.mineFrontMaterial.apply();

		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		
		this.quad.display();
		
		scene.popMatrix();

		// Back

		scene.pushMatrix();

		scene.translate(0, 0, -0.5);
		scene.rotate(Math.PI, 0, 1, 0);
		this.mineBackMaterial.apply();
		
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);

			
		this.quad.display();
		
		scene.popMatrix();

	}
}
