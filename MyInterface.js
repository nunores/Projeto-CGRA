/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayIncompleteSphere').name('Display Sphere');

        this.gui.add(this.scene, 'displayCylinder').name('Display Cylinder');

        this.gui.add(this.scene, 'displayCubeMap').name('Display CubeMap');

        this.gui.add(this.scene, 'displayVehicle').name('Display Vehicle');

        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Map Texture').onChange(this.scene.updateTexture.bind(this.scene));

        

        return true;
    }
}