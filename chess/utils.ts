export function in_bounds(coord: number): boolean {
	return 0 <= coord && coord < 8;
}

export function transpose(matrix: any[][]) {
	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < x; y++) {
			const temp = matrix[x][y];
			matrix[x][y] = matrix[y][x];
			matrix[y][x] = temp;
		}
	}
	return matrix;
}

export function flip_vertical(matrix: any[][]) {
	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[x].length / 2; y++) {
			const temp = matrix[x][y];
			matrix[x][y] = matrix[x][matrix[x].length - 1 - y];
			matrix[x][matrix[x].length - 1 - y] = temp;
		}
	}
	return matrix;
}
