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

            ang+=alphaAng;

            // Vértices laterais -----------------------------------------

            this.vertices.push(ca, 0, -sa);     // 12*i+2
            this.vertices.push(caa, 0, -saa);   // 12*i+3
            this.vertices.push(ca, 1, -sa);     // 12*i+4       //X
            this.vertices.push(caa, 1, -saa);   // 12*i+5

            this.vertices.push(ca, 0, -sa);     // 12*i+6
            this.vertices.push(caa, 0, -saa);   // 12*i+7
            this.vertices.push(ca, 1, -sa);     // 12*i+8       //Y
            this.vertices.push(caa, 1, -saa);   // 12*i+9

            this.vertices.push(ca, 0, -sa);     // 12*i+10
            this.vertices.push(caa, 0, -saa);   // 12*i+11
            this.vertices.push(ca, 1, -sa);     // 12*i+12      //Z
            this.vertices.push(caa, 1, -saa);   // 12*i+13

            // ------------------------------------------------------------

            // for (var m = 0; m < 4; m++)
            // {
            //     this.normals.push(Math.cos(ang), 0, -Math.sin(ang+alphaAng));
            // }

            this.normals.push(Math.cos(ang),0,-Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang),0,-Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang),0,-Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang),0,-Math.sin(ang+alphaAng));

            for (var k=0; k<8; k++)
            {
                this.normals.push(0,0,0);
            }
            





            /*
            this.normals = [];
            for (int i = 0; i < 6; i++)
            {
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            }
            */

            /* var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ]; */

            // var normal= [
            //     ca,
            //     0,
            //     sa
            // ];


            // // normalization
            // var nsize=Math.sqrt(
            //     normal[0]*normal[0]+
            //     normal[1]*normal[1]+
            //     normal[2]*normal[2]
            //     );

            // normal[0]/=nsize;
            // normal[1]/=nsize;
            // normal[2]/=nsize;

            // //push normal once for each vertex of this triangle
            // for(var n = 0; n < 6; n++){
            //     this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            // }
            
            // Índices de cima e de baixo ---------------------------------------

            this.indices.push(12*i+2, 0, 12*i+3);

            this.indices.push(12*i+5, 1, 12*i+4);

            // -------------------------------------------------------------------

            // Índices laterais --------------------------------------------------
            
            this.indices.push((12*i+2), (12*i+3), (12*i+4));
            this.indices.push((12*i+4), (12*i+3), (12*+2));

            this.indices.push((12*i+4), (12*i+3), (12*i+5));
            this.indices.push((12*i+5), (12*i+3), (12*i+4));

            // --------------------------------------------------------------------

            //ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


