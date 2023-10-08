export default class Geometry {
	static allGeometry = [];
	constructor() {
		this.isGeometry = true;
		this.vertices = [];
		this.points = [];

		Geometry.allGeometry.push(this);
	}
}