#ifdef GL_ES
precision highp float;
#endif

varying vec4 vTextureCoord;
uniform int counter;

void main() {
    float limit = -0.5 + (1.0 / 5.0) * float(counter);
    //float limit = -0.55 + (1.1 / 5.0) * float(counter);



    if (vTextureCoord.x <= limit)
    {
        gl_FragColor.rgb =  vec3(1.0 - (0.5 + vTextureCoord.x / 0.5), 0.5 + vTextureCoord.x / 0.5, 0);
        gl_FragColor.a = 1.0;
    }
    else 
    {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1);
    }
}