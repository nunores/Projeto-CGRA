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

            
            // for (var m = 0; m < 4; m++)
            // {
            //     this.normals.push(Math.cos(ang), 0, -Math.sin(ang+alphaAng));
            // }

            /*if (i < this.slices/2)
                this.normals.push(Math.cos(alphaAng2), 0, -Math.sin(alphaAng2));
            else
            {
                    
                
                this.normals.push(Math.cos(alphaAng2 + Math.PI), 0, Math.sin(alphaAng2));
            }
            
            console.log("ANG: ", ang);
            
            console.log("X: ", Math.cos(ang));
            console.log("Y: ", 0);
            console.log("Z: ", -Math.sin(alphaAng));*/

            //this.normals.push(Math.cos(alphaAng),0,-Math.sin(alphaAng));
            //this.normals.push(Math.cos(alphaAng),0,-Math.sin(alphaAng));
            //this.normals.push(Math.cos(alphaAng),0,-Math.sin(alphaAng));
            
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


