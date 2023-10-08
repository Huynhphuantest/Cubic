import Object from '../objects/object.js';
import Transform from '../objects/transform.js';

export default class Camera extends Object {
	constructor({fov, far, near, position, quaternion, scale}) {
		super({type:'camera', transform: new Transform({position, quaternion, scale})});
		this.fov    = fov ?? 70;
		this.far    = far ?? 1000;
		this.near   = near?? 0.1;
	}
	render() {
		new Error('Render function not implemented');
	}
}