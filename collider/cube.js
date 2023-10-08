import Collider from './collider.js';

export default class CubeCollider extends Collider {
    constructor(w, h, l) {
        super([
			{x:-w / 2, y:-h / 2, z:-l / 2},
			{x: w / 2, y:-h / 2, z:-l / 2},
			{x: w / 2, y:-h / 2, z: l / 2},
			{x:-w / 2, y:-h / 2, z: l / 2},
			{x:-w / 2, y: h / 2, z:-l / 2},
			{x: w / 2, y: h / 2, z:-l / 2},
			{x: w / 2, y: h / 2, z: l / 2},
			{x:-w / 2, y: h / 2, z: l / 2}
        ]);
        this.parameters = {
			shape:'cube',
            width: w,
            height: h,
            length: l
        };
    }
}