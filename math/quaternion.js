export default class Quaternion {
	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.isQuaternion = true;
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		this.onChange = () => {};
	}
	set(x,y,z,w) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		return this;
	}
	copy(qua) {
		this._x = qua.x;
		this._y = qua.y;
		this._z = qua.z;
		this._w = qua.w;
		return this;
	}
	clone() {
		return new Quaternion(this._x, this._y, this._z, this._w);
	}
	get x() {
		return this._x;
	}
	set x(val) {
		this._x = val;
		if(this._x > 1) {this._x = -1};
		if(this._x < -1) {this._x = 1};
		this.normalize();
		this.onChange();
	}
	get y() {
		return this._y;
	}
	set y(val) {
		this._y = val;
		if(this._y > 1) {this._y = -1};
		if(this._y < -1) {this._y = 1};
		this.normalize();
		this.onChange();
	}
	get z() {
		return this._z;
	}
	set z(val) {
		this._z = val;
		if(this._z > 1) {this._z = -1};
		if(this._z < -1) {this._z = 1};
		this.normalize();
		this.onChange();
	}
	get w() {
		return this._w;
	}
	set w(val) {
		this._w = val;
		if(this._w > 1) {this._w = -1};
		if(this._w < -1) {this._w = 1};
		this.normalize()
		this.onChange();
	}
	
	normalize() {
		let l = this.length();
		if ( l === 0 ) {
			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;
		} else {
			this._x /= l;
			this._y /= l;
			this._z /= l;
			this._w /= l;
		}
		return this;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	
	mul(b) {
		const qax = this._x, qay = this._y, qaz = this._z, qaw = this._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChange();
		
		return this;
	}

	setFromEuler(x, y, z) {

		const 
			sx = Math.sin(x/2),
			cx = Math.cos(x/2),
			sy = Math.sin(y/2),
			cy = Math.cos(y/2),
			sz = Math.sin(z/2),
			cz = Math.cos(z/2);
        this._x = sx * cy * cz - cx * sy * sz
        this._y = cx * sy * cz + sx * cy * sz
        this._z = cx * cy * sz - sx * sy * cz
        this._w = cx * cy * cz + sx * sy * sz

		this.onChange();
        return this;
	}
	setFromAxisAngle(axis, angle) {
		const halfAngle = angle / 2, s = Math.sin( halfAngle );
		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );
		this.onChange();

		return this;
	}

	static apply(v, q) {
		//This is a mess ;-;
		var qw = q.w;
		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var vx = v.x;
		var vy = v.y;
		var vz = v.z;
		
		// t = 2q x v
		var tx = 2 * (qy * vz - qz * vy);
		var ty = 2 * (qz * vx - qx * vz);
		var tz = 2 * (qx * vy - qy * vx);
		
		// v + w t + q x t
		v.x += qw * tx + qy * tz - qz * ty,
		v.y += qw * ty + qz * tx - qx * tz,
		v.z += qw * tz + qx * ty - qy * tx
	}
}