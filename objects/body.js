import Collider from '../collider/collider.js';
import Transform from './transform.js';
import Vector3 from '../math/vector3.js';
import PhysicMaterial from '../material/physic.js';

export default class Body {
	constructor({collider, mass, transform, material}) {
		this.mass = mass ?? 1; //KG
		this.collider = collider ?? new Collider();
		this.transform = transform ?? new Transform();
		this.velocity = new Vector3();
		this.material = material ?? new PhysicMaterial({restitution:0});
		this.type = 'dynamic';
	}
	update(deltaTime, world, objects) {
		
		objects.forEach(o => {
			if(o.body == this) return;
			const e = o.body;
			if(this.collider.isColliding(e.collider, this.transform.position, e.transform.position)) Body.applyImpulse(this, e);
		});
		if(this.type == 'static') return;
		const mass = this.mass;
		const gravity = world.gravity.clone().mul(deltaTime).mul(mass);
		this.velocity.add(gravity);
		
		

		
		this.transform.position.add(this.velocity);
	}
	static applyImpulse(b1, b2) {
        //Normal (Using a weird method but cheap and also make no sense)
        const n = new Vector3(0,-1,0);
        //Restitution
        const e = b1.material.restitution * b2.material.restitution;
        //Relative Velocity
        const Vr = b1.velocity.clone().sub(b2.velocity);
		if(Vr.lengthSq() != 0) Vr.normalize();
        //Total velocity (force) has created in the collision
        const Vj = -(1 + e) * Vr.dot(n);
        //Impulse
        const j = Vj / (1 / b1.mass + 1 / b2.mass);
		console.log(j)
        b1.velocity.add(n.clone().mul(1 / b1.mass * j));
        b2.velocity.sub(n.clone().mul(1 / b2.mass * j));
    }
}