import Geometry from './geometry.js';

export default class CubeGeo extends Geometry {
	constructor(w = 0, h, d) {
		super();
		h ||= w;
		d ||= w;
		
		const p1 = { x:-w/2, y:-h/2, z:-d/2 };
		const p2 = { x: w/2, y:-h/2, z:-d/2 };
		const p3 = { x: w/2, y:-h/2, z: d/2 };
		const p4 = { x:-w/2, y:-h/2, z: d/2 };
		
		const p5 = { x:-w/2, y: h/2, z:-d/2 };
		const p6 = { x: w/2, y: h/2, z:-d/2 };
		const p7 = { x: w/2, y: h/2, z: d/2 };
		const p8 = { x:-w/2, y: h/2, z: d/2 };

		function createFace(_p1, _p2, _p3, _p4) {
			return [[_p1, _p2, _p3], [_p1, _p4, _p3]];
		}

		const f1 = createFace(p5, p1, p2, p6);
		const f2 = createFace(p6, p2, p3, p7);
		const f3 = createFace(p7, p3, p4, p8);
		const f4 = createFace(p8, p4, p1, p5);
		const f5 = createFace(p1, p2, p3, p4);
		const f6 = createFace(p5, p6, p7, p8);

		this.vertices = [...f1, ...f2, ...f3, ...f4, ...f5, ...f6];
		this.points = [p1,p2,p3,p4,p5,p6,p7,p8]
		this.originVertex = structuredClone(this.vertices);
		this.originPoints = structuredClone(this.points);
	}
}