export default class Scene {
	constructor() {
		this.isScene = true;
		this.objects = [];
	}
	add(object) {
		if(!object.isObject) return new TypeError('CUBIC.Scene.add: object inputed must be an instance of CUBIC.Object');
		this.objects.push(object);
	}
	step(time) {
		for(const object of this.objects) {
			object.update(time);
		}
	}
}