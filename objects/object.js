import Quaternion from '../math/quaternion.js';
import BasicMaterial from '../material/basic.js';
import Body from './body.js';
import Collider from '../collider/collider.js';

export default class Object {
	static allObject = [];
	constructor({geometry, transform, body, type, material, collider}) {
		this.isObject = true;
		this.geometry = geometry;
		this.transform = transform;
		this.material = material ?? new BasicMaterial({color:'white'});
		this.body = body ?? new Body({
			collider: collider ?? new Collider(),
			mass: 1,
			transform: transform
		});
		this.children = [];

		if(type == 'camera') return this;
		this.transform.quaternion.onChange = () => {
			const orgPoints = this.geometry.originPoints;
			const points = this.geometry.points;
			points.forEach((point, i) => {
				const result = {
					x: orgPoints[i].x,
					y: orgPoints[i].y,
					z: orgPoints[i].z
				}
				Quaternion.apply(result, this.transform.quaternion);
				point.x = result.x;
				point.y = result.y;
				point.z = result.z;
			});
		}

		Object.allObject.push(this);
	}
	update(time) {
		this.body.update(time);
	}
}