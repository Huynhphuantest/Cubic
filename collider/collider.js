import Vector3 from '../math/vector3.js'

export var algorithim;
export function setColliderAlgorithm(a) {
    algorithim = a;
}
export default class Collider {
    constructor(polygons) {
        this.polygons = polygons ?? [];
    }
	isColliding(t1, p1, p2) {
		p1 = p1 ?? new Vector3();
		p2 = p2 ?? new Vector3();
		return Collider.checkCollide(this, t1, p1, p2);
	}
    static checkCollide(t1, t2, p1, p2) {
		p1 = p1 ?? new Vector3();
		p2 = p2 ?? new Vector3();
		if(!t1.polygons[0] || !t2.polygons[0]) return false;
		const poly1 = Collider.applyTranslation(t1.polygons, p1);
		const poly2 = Collider.applyTranslation(t2.polygons, p2);
        return algorithim.intersect(poly1, poly2, p1, p2);
    }
	static applyTranslation(poly, pos) {
		const res = [];
	    for (const point of poly) {
	        res.push({
	            x: point.x + pos.x,
	            y: point.y + pos.y,
	            z: point.z + pos.z
	        });
	    }
	    return res;
	}
}
/*-------------------------Default Algorithim-------------------------*/

//Source : https://github.com/RayzRazko/gjk-js
var inv3 = 1.0 / 3.0;
var origin = new Vector3();
// tolerance for number comparison
var tolerance = .0001;
//the iterations count after which the result will be 0;
var defaultLoopIterations = 30;
var GJK = {};
GJK.convertToPolygons = (polygons) => {
    const res = [];
    for (const point of polygons) {
        res.push({
            x: point[0],
            y: point[1],
            z: point[2]
        });
    }
    return res;
};
GJK.isEqual = (number1, number2, tolerance) => {
    tolerance = tolerance || 0;
    return Math.abs(number1 - number2) < Math.abs(tolerance);
};
GJK.isZero = function (number, tolerance) {
    return GJK.isEqual(number, 0, tolerance);
},
    GJK.clamp = function (value, min, max) {
        if (value > min) {
            return value < max ? value : max;
        }
        else {
            return min;
        }
    };
GJK.getAreaWeightedCenter = (polygon) => {
    var ac = new Vector3();
    polygon.forEach(vector => {
        ac.add(vector.x, vector.y, vector.z);
    });
    ac.mul(1 / polygon.length);
    var center = new Vector3();
    var area = .0;
    polygon.forEach((vector, index) => {
        var p1 = new Vector3(vector.x, vector.y, vector.z);
        const p2V = index + 1 === polygon.length ? polygon[0] : polygon[index + 1];
        var p2 = new Vector3(p2V.x, p2V.y, p2V.z);
        p1.add(new Vector3(-ac.x, -ac.y, -ac.z));
        p2.add(new Vector3(-ac.x, -ac.y, -ac.z));
        var triangleArea = 0.5 * (p1.x * p2.y - p1.y * p2.x);
        area += triangleArea;
        p1.add(p2).mul(inv3).mul(triangleArea);
        center.add(p1);
    });
    if (GJK.isZero(area, tolerance)) {
        // zero area can only happen if all the points are the same point
        // in which case just return a copy of the first
        return center.set(polygon[0].x, polygon[0].y, polygon[0].z);
    }
    // return the center
    return center.mul(1 / area).add(ac);
};
GJK.getFarthestPointInDirection = (polygon, direction) => {
    var farthestPoint = polygon[0];
    var farthestDistance = direction.dot(new Vector3(polygon[0].x, polygon[0].y, polygon[0].z));
    var tempDist = 0;
    for (var i = 1; i < polygon.length; i++) {
        tempDist = direction.dot(new Vector3(polygon[i].x, polygon[i].y, polygon[i].z));
        if (tempDist > farthestDistance) {
            farthestDistance = tempDist;
            farthestPoint = polygon[i];
        }
    }
    return new Vector3(farthestPoint.x, farthestPoint.y, farthestPoint.z);
};
GJK.support = (polygon1, polygon2, direction) => {
    var point1 = GJK.getFarthestPointInDirection(polygon1, direction);
    var point2 = GJK.getFarthestPointInDirection(polygon2, direction.negated());
    return new Vector3(
		point1.x - point2.x,
		point1.y - point2.y,
		point1.z - point2.z
	);
};
GJK.closestPointOnSegmentToOrigin = (vector1, vector2) => {
    var closest = new Vector3();
    //vector from point to the origin
    var vector1ToOrigin = vector1.negated();
    //vector representing the line
    var lineVector1Vector2 = vector2.clone().sub(vector1);
    // get the length squared of the line
    var lineV1V2Dot = lineVector1Vector2.dot(lineVector1Vector2);
    //if a == b
    if (GJK.isZero(lineV1V2Dot, tolerance)) {
        return closest.copy(vector1);
    }
    //projection of aToOrigin on lineAB
    var v1ToOrigin_V1V2 = vector1ToOrigin.dot(lineVector1Vector2);
    // get the position from the first line point to the projection
    var t = v1ToOrigin_V1V2 / lineV1V2Dot;
    // make sure t is in between 0.0 and 1.0
    t = GJK.clamp(t, .0, 1.0);
    return closest.copy(lineVector1Vector2.mul(t).add(vector1));
};
GJK.distance = (polygon1, polygon2, pos1, pos2) => {
    /*var centerP1 = GJK.getAreaWeightedCenter(polygon1);
    var centerP2 = GJK.getAreaWeightedCenter(polygon2);*/
    var centerP1 = new Vector3(pos1.x,pos1.y,pos1.z);
    var centerP2 = new Vector3(pos2.x,pos2.y,pos2.z);
    var direction = centerP2.add(centerP1.negated());
    var a, b, c;
    a = GJK.support(polygon1, polygon2, direction);
    b = GJK.support(polygon1, polygon2, direction.negated());
    for (var i = 0; i < defaultLoopIterations; i++) {
        var p = GJK.closestPointOnSegmentToOrigin(a, b);
        if (GJK.isZero(p.length(), tolerance)) {
            // the origin is on the Minkowski Difference
            // I consider this touching/collision
            return .0;
        }
        // p.to(origin) is the new direction
        // we normalize here because we need to check the
        // projections along this vector later
        direction.copy(p.negated().normalize());
        c = GJK.support(polygon1, polygon2, direction);
        // is the point we obtained making progress
        // towards the goal (to get the closest points
        // to the origin)
        var dc = c.dot(direction);
        // you can use a or b here it doesn't matter
        var da = a.dot(direction);
        if (GJK.isZero(dc - da, tolerance)) {
            return dc;
        }
        // if we are still getting closer then only keep
        // the points in the simplex that are closest to
        // the origin (we already know that c is closer
        // than both a and b)
        if (a.distanceSq(origin) < b.distanceSq(origin)) {
            b = c;
        }
        else {
            a = c;
        }
    }
    return .0;
};
//MOST IMPORTANT THING
GJK.intersect = (polygon1, polygon2, pos1, pos2) => {
    return GJK.isZero(GJK.distance(polygon1, polygon2, pos1, pos2), tolerance);
},
algorithim = GJK; //DEFAULT