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

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            // console.log("SA: ", sa);
            // console.log("SAA: ", saa);
            // console.log("CA: ", ca);
            // console.log("CAA: ", caa);

            // Vértices laterais -----------------------------------------

            this.vertices.push(ca, 0, -sa);     // 8*i
            this.vertices.push(caa, 0, -saa);   // 8*i+1
            this.vertices.push(ca, 1, -sa);     // 8*i+2
            
            this.vertices.push(ca, 1, -sa);     // 8*i+3
            this.vertices.push(caa, 0, -saa);   // 8*i+4
            this.vertices.push(caa, 1, -saa);   // 8*i+5

            this.vertices.push(0, 0, 0);        // 8*i+6
            this.vertices.push(0, 1, 0);        // 8*i+7

            // ------------------------------------------------------------


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

            this.indices.push(8*i, 8*i+6, 8*i+1);
            //this.indices.push(8*i+1, 8*i+6, 8*i);

            // Índices laterais --------------------------------------------------
            
            this.indices.push(8*i, (8*i+1), (8*i+2));
            this.indices.push((8*i+2), (8*i+1), (8*i));

            this.indices.push((8*i+3), (8*i+4), (8*i+5));
            this.indices.push((8*i+5), (8*i+4), (8*i+3));

            // --------------------------------------------------------------------

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


