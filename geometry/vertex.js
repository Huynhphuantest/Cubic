export default class Vertex {
	static render(v, ctx, options) {
		ctx.lineWidth = 0;
		ctx.beginPath();
		ctx.moveTo(v[0].x, v[0].y);
		ctx.lineTo(v[1].x, v[1].y);
		ctx.lineTo(v[2].x, v[2].y);
		ctx.closePath();
		ctx.fill();
	}
}