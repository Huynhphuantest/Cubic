export default class Control {
	constructor(keys) {
		this.keys = {};
		for(const [key, value] of Object.entries(keys)) {
			this.keys[key] = [value[0], value[1], false];
		}

		window.addEventListener('keydown', e => {
			for(const key in this.keys) {
				if(this.keys[key][0] === e.key) this.keys[key][2] = true;
			}
		});

		window.addEventListener('keyup', e => {
			for(const key in this.keys) {
				if(this.keys[key][0] === e.key) this.keys[key][2] = false;
			}
		});
	}
	setKey(key, fn, value) {
		this.keys[key] = [value, fn, false];
	}
	update() {
		for(const [key, value] of Object.entries(this.keys)) {
			if(value[2]) value[1]();
		}
	}
}