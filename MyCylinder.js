/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var alphaAng2 = Math.PI/this.slices;

        // Vértices de cima e de baixo

        this.vertices.push(0, 0, 0);    //0
        this.vertices.push(0, 1, 0);    //1

        this.normals = [];
        this.normals.push(0,0,0);
        this.normals.push(0,0,0);

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);


            // Vértices laterais -----------------------------------------

            this.vertices.push(ca, 0, -sa);     // 12*i+2
            this.vertices.push(caa, 0, -saa);   // 12*i+3
            this.vertices.push(ca, 1, -sa);     // 12*i+4
            this.vertices.push(caa, 1, -saa);   // 12*i+5
            this.vertices.push(caa, 0, -saa);   // 12*i+6
            this.vertices.push(ca, 1, -sa);     // 12*i+7

            // ------------------------------------------------------------

            this.normals.push(Math.cos(2*Math.PI - (ang + alphaAng2)), 0, Math.sin(2*Math.PI - (ang + alphaAng2)));
            this.normals.push(Math.cos(2*Math.PI - (ang + alphaAng2)), 0, Math.sin(2*Math.PI - (ang + alphaAng2)));
            this.normals.push(Math.cos(2*Math.PI - (ang + alphaAng2)), 0, Math.sin(2*Math.PI - (ang + alphaAng2)));
            this.normals.push(Math.cos(2*Math.PI - (ang + alphaAng2)), 0, Math.sin(2*Math.PI - (ang + alphaAng2)));
            this.normals.push(0,-1,0);
            this.normals.push(0,1,0);
            
            // Índices de cima e de baixo ---------------------------------------

            this.indices.push(6*i+2, 0, 6*i+3);

            this.indices.push(6*i+5, 1, 6*i+4);

            // -------------------------------------------------------------------

            // Índices laterais --------------------------------------------------
            
            this.indices.push((6*i+2), (6*i+3), (6*i+4));
            this.indices.push((6*i+4), (6*i+3), (6*+2));

            this.indices.push((6*i+4), (6*i+3), (6*i+5));
            this.indices.push((6*i+5), (6*i+3), (6*i+4));

            // --------------------------------------------------------------------

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


