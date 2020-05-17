#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D flagMap;

uniform float timeFactor;

void main() {
	vec4 color = texture2D(flagMap, vTextureCoord);
	
	gl_FragColor = color;
}