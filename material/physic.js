export default class PhysicMaterial {
	constructor({restitution}) {
		this.restitution = restitution ?? 0.5;
	}
}