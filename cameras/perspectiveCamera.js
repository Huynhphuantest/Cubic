import Camera from './camera.js';
import Vertex from '../geometry/vertex.js';
import Object from '../objects/object.js';
import Color from '../math/color.js';

import Vector3 from '../math/vector3.js';
import Quaternion from '../math/quaternion.js';

export default class PerspectiveCamera extends Camera {
	constructor(params) {
		super(params);
		this.toRenderObject = [];
		this.toRenderVertex = [];
	}
	render(renderer, scene, ctx) {
		ctx.fillStyle = '#ffffff';
		this.toRenderObject = scene.objects;
		this.toRenderVertex = [];
		const cameraPos = this.transform.position;
		for(const object of this.toRenderObject) {
			const pos = object.transform.position;
			let red = 255;
			let green = 255;
			for(const vertex of object.geometry.vertices) {
				red -= 40;
				if(red < 40) red = 255;
				green -= 30;
				if(green < 30) green = 255;
				const points = [
					{
						x:vertex[0].x + pos.x - cameraPos.x,
						y:vertex[0].y + pos.y - cameraPos.y,
						z:vertex[0].z + pos.z - cameraPos.z
					},
					{
						x:vertex[1].x + pos.x - cameraPos.x,
						y:vertex[1].y + pos.y - cameraPos.y,
						z:vertex[1].z + pos.z - cameraPos.z
					},
					{
						x:vertex[2].x + pos.x - cameraPos.x,
						y:vertex[2].y + pos.y - cameraPos.y,
						z:vertex[2].z + pos.z - cameraPos.z
					},
					{
						//Only color, just temporary
						color: new Color(red, green, 0).toRgbStr()
					}
				];
				for(const point of points) Quaternion.apply(point, this.transform.quaternion);
				this.toRenderVertex.push(points);
			}
		}

		function averagePointToCam(a) {
			return {
				x: ( a[0].x + a[0].x + a[0].x ) / 3,
				y: ( a[1].y + a[1].y + a[1].y ) / 3,
				z: ( a[2].z + a[2].z + a[2].z ) / 3
			}
		}
		function averageDistanceOfVertex(a) {
			const ap = averagePointToCam(a);
			return Math.sqrt(
				ap.x * ap.x +
				ap.y * ap.y +
				ap.z * ap.z
			);
		}
		this.toRenderVertex.sort((a, b) => {
			return averageDistanceOfVertex(a) > averageDistanceOfVertex(b) ? -1 : 1;
		});

		for(const vertex of this.toRenderVertex) {
			
			//Handle render
			//if(vertex[0].z < 0 || vertex[1].z < 0 || vertex[2].z < 0) continue;
			
			const p1 = this.projection(renderer, {
				x:vertex[0].x,
				y:vertex[0].y,
				z:vertex[0].z
			});
			if(!p1.shouldRender) continue;
			const p2 = this.projection(renderer, {
				x:vertex[1].x,
				y:vertex[1].y,
				z:vertex[1].z
			});
			if(!p2.shouldRender) continue;
			const p3 = this.projection(renderer, {
				x:vertex[2].x,
				y:vertex[2].y,
				z:vertex[2].z
			});
			if(!p3.shouldRender) continue;
			
			if(
				(p1.x < 0 && p2.x < 0 && p3.x < 0) ||
				(p1.x > renderer.width && p2.x > renderer.width && p3.x > renderer.width) ||
				(p1.y < 0 && p2.y < 0 && p3.y < 0) ||
				(p1.y > renderer.height && p2.y > renderer.height && p3.y > renderer.height)
			) continue;

			ctx.fillStyle = vertex[3].color;
			Vertex.render([p1,p2,p3], ctx);
		}
	}
	projection(renderer, d) {
		//This is gonna be complicated hehe
		if(d.z < 0) return {
			x:0,
			y:0,
			shouldRender:false
		}
		//Position relative to camera thingy, basically your EYE
		//From WebGL
		const f = Math.tan(Math.PI * 0.5 - 0.5 * ((this.fov / 180)*Math.PI));
		const rangeInv = 1.0 / (this.near - this.far);
		const w = 2*rangeInv*f*this.near*d.z;
		
		const dis = new Vector3(
			(f * d.x * renderer.aspect * w),
			(f * d.y * renderer.aspect * w),
			(-w + rangeInv * f * d.z + rangeInv * this.near * d.z) * w
		);

		return {
			x: (dis.x/dis.z)+renderer.width/2,
			y: (dis.y/dis.z)+renderer.height/2,
			shouldRender: true
		}
	}
}