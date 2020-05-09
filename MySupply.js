/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
    };

	constructor(scene) {
		super(scene);
        this.scene = scene;
        this.state = this.SupplyStates.INACTIVE;

        this.drop_position = {
			'x': 0, 'y': 0, 'z': 0
        }

        this.velocity = 11.3 / 3;
        this.time = 0;
        this.deltaTime = 0;
        

		this.initBuffers();
	}
	initBuffers() {
		var scene = this.scene;
        this.quadCrate = new MyQuadCrate(scene);
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
    
    update(t){
        this.deltaTime = this.deltaTime / 1000;
        if(this.drop_position.y > -13.6)// "Virtual floor" as we lowered the terrain
        {
            this.drop_position.y -= this.deltaTime * this.velocity;
            this.time = t;
            
        }
        else
        {
            this.land();
        }
        
            
    }

    drop(position){
        this.drop_position.x = position.x;
        this.drop_position.y = position.y;
        this.drop_position.z = position.z;

        this.state = this.SupplyStates.FALLING;

    }
    
	display() {
        var scene = this.scene;

        if (this.state == this.SupplyStates.FALLING)
        {
            // Top
            scene.pushMatrix();

            
            scene.translate(this.drop_position.x, this.drop_position.y + 9, this.drop_position.z);
            scene.scale(0.5,0.5,0.5);
            

            scene.pushMatrix();

            scene.translate(0, 0.5, 0);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            
            this.quadCrate.display();
            
            scene.popMatrix();

            
            // Bottom

            scene.pushMatrix();

            scene.translate(0, -0.5, 0);
            scene.rotate(Math.PI/2, 1, 0, 0);
            this.crate_side.apply();

            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);

            this.quadCrate.display();
            
            scene.popMatrix();

            // Left

            scene.pushMatrix();

            scene.translate(-0.5, 0, 0);
            scene.rotate(-Math.PI/2, 0, 1, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            
            this.quadCrate.display();
            
            scene.popMatrix();

            // Right

            scene.pushMatrix();

            scene.translate(0.5, 0, 0);
            scene.rotate(Math.PI/2, 0, 1, 0);
            this.crate_side.apply();

            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            
            this.quadCrate.display();
            
            scene.popMatrix();

            // Front

            scene.pushMatrix();

            scene.translate(0, 0, 0.5);
            this.crate_side.apply();

            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            
            this.quadCrate.display();
            
            scene.popMatrix();

            // Back

            scene.pushMatrix();

            scene.translate(0, 0, -0.5);
            scene.rotate(Math.PI, 0, 1, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();
            scene.popMatrix();
        }
        else if (this.state == this.SupplyStates.LANDED)
        {
            scene.pushMatrix();
            scene.translate(this.drop_position.x, this.drop_position.y + 9, this.drop_position.z);
            scene.scale(0.5,0.5,0.5);
            


            scene.pushMatrix();
            scene.translate(0, -0.25, 0);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();


            scene.pushMatrix();
            scene.translate(0, -0.25, 1);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(0, -0.25, -1);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(1, -0.25, 0);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(-1, -0.25, 0);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();

            scene.pushMatrix();
            scene.translate(-2, -0.25, 0);
            scene.rotate(-Math.PI/2, 1, 0, 0);
            this.crate_side.apply();
            
            scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
                
            this.quadCrate.display();
            scene.popMatrix();

            scene.popMatrix();
        }

    }
    land()
    {
        this.state = this.SupplyStates.LANDED;
    }
    reset(){
        this.state = this.SupplyStates.INACTIVE;
    }
}
