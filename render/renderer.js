import Color from '../math/color.js';
import Vertex from '../geometry/vertex.js';

export class Renderer {
	constructor({width, height, aspect, clearColor}) {
		this.DOMElement = document.createElement('canvas');
		this.width  = width;
		this.height = height;
		this.aspect = aspect;
		this.clearColor = new Color(clearColor);
		
		this.DOMElement.width  = width;
		this.DOMElement.height = height;
	}
	render(camera, scene) {
		const canvas = this.DOMElement;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = this.clearColor.toRgbStr();
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = new Color(255,255,255).toRgbStr();
		
		camera.render(this, scene, ctx);
	}
}