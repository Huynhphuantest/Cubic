export const getScreen = (window) => {
	return {
		width: window.innerWidth,
		height:window.innerHeight,
		aspect:window.innerWidth / window.innerHeight
	}
}