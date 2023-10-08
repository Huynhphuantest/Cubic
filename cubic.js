import { Renderer } from './render/renderer.js';
import { getScreen } from './utils/graphics.js';
import { memoize } from './utils/function.js';
import PerspectiveCamera from './cameras/perspectiveCamera.js';
import OrthographicCamera from './cameras/orthographicCamera.js';

import Vector3 from './math/vector3.js';
import Quaternion from './math/quaternion.js';

import Geometry from './geometry/geometry.js';
import Vertex from './geometry/vertex.js';
import CubeGeo from './geometry/cube.js';

import Material from './material/material.js';
import BasicMaterial from './material/basic.js';
import PhysicMaterial from './material/physic.js';

import Object from './objects/object.js';
import Body from './objects/body.js';
import Transform from './objects/transform.js';

import Collider from './collider/collider.js';
import CubeCollider from './collider/cube.js';

import Scene from './group/scene.js';
import World from './group/world.js';

export {
	Renderer,
	getScreen,
	memoize,
	PerspectiveCamera,
	OrthographicCamera,
	Vector3,
	Transform,
	Geometry,
	Vertex,
	CubeGeo,
	Object,
	Body,
	Quaternion,
	Material,
	BasicMaterial,
	PhysicMaterial,
	Scene,
	World,
	Collider,
	CubeCollider
};


var scene, world;
export function addObject(object) {
	if(!scene && ! world) new TypeError('CUBIC.default.addObject: Scene and World must be defined');
	if(scene) scene.add(object);
	if(world) world.add(object);
}
export function usingScene(s) {
	if(!s.isScene) new TypeError('CUBIC.default.usingScene: Scene inputed must be an instance of CUBIC.Scene');
	scene = s;
}
export function usingWorld(w) {
	if(!w.isWorld) new TypeError('CUBIC.default.usingWorld: Scene inputed must be an instance of CUBIC.World');
	world = w;
}