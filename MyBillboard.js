/**
* MyBlade
* @constructor
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlaneFlag(this.scene, 20);
        this.pole = new MyPlaneFlag(this.scene, 20);

        this.Billboardshader = new CGFshader(scene.gl,'shaders/billboard.vert','shaders/billboard.frag');
        this.Billboardshader.setUniformsValues({counter: this.scene.nSuppliesDelivered})


        this.initBuffers();
        this.initMaterials();
    }
    initBuffers(){

    }
    initMaterials() {
        this.textAppearence = new CGFappearance(this.scene);
        this.textAppearence.setAmbient(1, 1, 1, 1);
        this.textAppearence.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textAppearence.setSpecular(0.9, 0.9, 0.9, 1);
        this.textAppearence.setShininess(10.0);
        this.textAppearence.loadTexture('images/supplies_delivered.jpg');
        this.textAppearence.setTextureWrap('REPEAT', 'REPEAT');

        this.grayAppearence = new CGFappearance(this.scene);
        this.grayAppearence.setAmbient(128/255, 128/255, 128/255, 1);
        this.grayAppearence.setDiffuse(128/255, 128/255, 128/255, 1);
        this.grayAppearence.setShininess(10.0);
        this.grayAppearence.setTextureWrap('REPEAT', 'REPEAT');
    }
    update(){
        this.Billboardshader.setUniformsValues({ counter: this.scene.nSuppliesDelivered});
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0,-2,0);    
        
        // Parte de cima
        this.scene.pushMatrix();
        this.scene.translate(-8,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.scale(2,2,2);
        this.scene.scale(2,1,1);
        this.textAppearence.apply();
        this.plane.display();
        this.scene.popMatrix();


        // Postes
        this.scene.pushMatrix();
        this.scene.translate(-8,-2,1.75);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.scale(0.2,1,1);
        this.scene.scale(2,2,2);
        this.grayAppearence.apply();
        this.pole.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-8,-2,-1.75);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.scale(0.2,1,1);
        this.scene.scale(2,2,2);
        this.grayAppearence.apply();
        this.pole.display();
        this.scene.popMatrix();
        this.scene.popMatrix();


        // Barra
        this.scene.setActiveShader(this.Billboardshader);
        this.scene.pushMatrix();
        this.scene.translate(0,-2.25,-7.99);
        this.scene.scale(1.5,0.2,1);
        this.scene.scale(2,2,2);
        this.pole.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);


        /*        
        this.scene.setActiveShader(this.Billboardshader);
        push()
        // mete no sítio
        pop()
        this.scene.setActiveShader(this.scene.defaultShader);*/

    }

}














