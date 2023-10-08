import Vector3 from '../math/vector3.js';
import Quaternion from '../math/quaternion.js';

export default class Transform {
	constructor({position, scale, quaternion}) {
		this.position = position ?? new Vector3();
		this.scale = scale ?? new Vector3();
		this.quaternion = quaternion ?? new Quaternion();
	}
}