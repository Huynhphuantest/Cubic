import Color from '../math/color.js';

export default class Material {
	constructor({color}) {
		this.color = new Color(color);
		this.finalColor = new Color(color);
	}
}