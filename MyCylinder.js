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

        console.log("AlphaAng: ", alphaAng);

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 0, -sa);     // 0
            this.vertices.push(caa, 0, -saa);   // 1
            this.vertices.push(ca, 1, -sa);     // 2
            
            this.vertices.push(ca, 0, -sa);     // 3
            this.vertices.push(caa, 0, -saa);   // 4
            this.vertices.push(caa, 1, -saa);   // 5

            // triangle normal computed by cross product of two edges

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

            var normal= [
                ca,
                0,
                sa
            ];


            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );

            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            //push normal once for each vertex of this triangle
            for(var i = 0; i < 6; i++){
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            }   

            this.indices.push(3*i, (3*i+1) , (3*i+2));
            this.indices.push((3*i+3), (3*i+4) , (3*i+5));

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(slices_to_update){
        this.slices = 3 + slices_to_update; //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
    }
}


