attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D terrain;
uniform sampler2D heightmap;


void main() {

	vTextureCoord = aTextureCoord;

	vec3 offset = aVertexNormal * texture2D(heightmap, vTextureCoord).b ;

	
	gl_Position = uPMatrix * uMVMatrix * vec4(offset + aVertexPosition, 1.0);
}

