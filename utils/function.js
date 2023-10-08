export const memoize = (fn) => {
	const memo = {};
	return function(...args) {
		const argsStr = args.toString();
		if(memo[argsStr]) return memo[argsStr];
		const res = fn.apply(this, args);
		memo[argsStr] = res;
		return res;
	}
}