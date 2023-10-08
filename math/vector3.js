export default class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		this.isVector3 = true;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	set(x,y,z) {
		if(x.isVector3) {
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
			return this;
		}
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	copy(vec) {
		this.x = vec.x;
		this.y = vec.y;
		this.z = vec.z;
		return this;
	}
	clone() {
		return new Vector3(
			this.x,
			this.y,
			this.z
		);
	}
	add(x,y,z) {
		if(typeof x == 'object') {
			const vec = x;
			this.x += vec.x;
			this.y += vec.y;
			this.z += vec.z;
		} else if (!y) {
			this.x += x;
			this.y += x;
			this.z += x;
		} else {
			this.x += x;
			this.y += y;
			this.z += z;
		}
		return this;
	}
	sub(x,y,z) {
		if(typeof x == 'object') {
			const vec = x;
			this.x -= vec.x;
			this.y -= vec.y;
			this.z -= vec.z;
		} else if (!y) {
			this.x -= x;
			this.y -= x;
			this.z -= x;
		} else {
			this.x -= x;
			this.y -= y;
			this.z -= z;
		}
		return this;
	}
	mul(x,y,z) {
		if(typeof x == 'object') {
			const vec = x;
			this.x *= vec.x;
			this.y *= vec.y;
			this.z *= vec.z;
		} else if (!y) {
			this.x *= x;
			this.y *= x;
			this.z *= x;
		} else {
			this.x *= x;
			this.y *= y;
			this.z *= z;
		}
		return this;
	}
	div(x,y,z) {
		if(typeof x == 'object') {
			const vec = x;
			this.x /= vec.x;
			this.y /= vec.y;
			this.z /= vec.z;
		} else if (!y) {
			this.x /= x;
			this.y /= x;
			this.z /= x;
		} else {
			this.x /= x;
			this.y /= y;
			this.z /= z;
		}
		return this;
	}
	dot(vec) {
		return (
			this.x * vec.x +
			this.y * vec.y +
			this.z * vec.z
		);
	}
	crossed(vec) {
		const a = this;
		const b = vec;
		return new Vector3(
			a.y * b.z - a.z * b.y,
			a.z * b.x - a.x * b.z,
			a.x * b.y - a.y * b.x
		);
	}
	cross(vec) {
		const a = this;
		const b = vec;
		const x = a.y * b.z - a.z * b.y;
		const y = a.z * b.x - a.x * b.z;
		const z = a.x * b.y - a.y * b.x;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	normalize(length = 1) {
		const mag = this.length();
		//Divide by length work, trust me. If it doesn't work then math is broken
		this.x /= mag / length;
		this.y /= mag / length;
		this.z /= mag / length;
		return this;
	}
	normalized() {
		const l = this.length();
		return new Vector3(
			this.x / l,
			this.y / l,
			this.z / l
		);
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	distance(v) {
		const
			dx = this.x - v.x,
			dy = this.y - v.y,
			da = this.z - v.z;
		return Math.sqrt(
			dx * dx +
			dy * dy +
			dz * dz
		);
	}
	distanceSq(v) {
		const
			dx = this.x - v.x,
			dy = this.y - v.y,
			dz = this.z - v.z;
		return (
			dx * dx +
			dy * dy +
			dz * dz
		);
	}
	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}
	negated() {
		return new Vector3(
			-this.x,
			-this.y,
			-this.z
		);
	}
	manhattanLength() {
		
	}
}