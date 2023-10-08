import Vector3 from '../math/vector3.js';
export default class World {
	static CONFIG = {
		DEFAULT: {
			GRAVITY: 9.81
		}
	}
	constructor({gravity}) {
		this.gravity = gravity ?? new Vector3(0,-World.CONFIG.DEFAULT.GRAVITY,0);
		this.objects = [];
	}
	update(timeSecond) {
		this.objects.forEach(e => {
			e.body.update(timeSecond, this, this.objects);
		});
	}
	add(body) {
		this.objects.push(body);
	}
}