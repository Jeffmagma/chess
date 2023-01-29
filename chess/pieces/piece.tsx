import Image from "next/image";

import {board, color_id, move, move_type, PieceInfo, point} from "../types";
import {in_bounds} from "../utils";

export const testpiece: PieceInfo = {
	render: () => <TestPiece/>,
	moves: moves_test
}

function TestPiece() {
	return <Image src={"thirteen.svg"} alt={"test"} width={50} height={50}/>;
}

function moves_test(board: board, position: point): move[] {
	return [
		{position: {x: position.x - 1, y: position.y}, type: move_type.move},
		{position: {x: position.x + 1, y: position.y}, type: move_type.move},
		{position: {x: position.x, y: position.y - 1}, type: move_type.move},
		{position: {x: position.x, y: position.y + 1}, type: move_type.move},
	]
}

export function edge_mover(board: board, position: point, directions: point[]): move[] {
	const piece = board[position.x][position.y];
	let moves: move[] = [];

	directions.forEach(direction => {
		let current_pos = position;
		while (true) {
			if (!in_bounds(current_pos.x + direction.x) || !in_bounds(current_pos.y + direction.y) || board[current_pos.x + direction.x][current_pos.y + direction.y].color === piece.color) {
				break;
			}
			if (board[current_pos.x + direction.x][current_pos.y + direction.y].color !== color_id.none) {
				moves.push({ position: {x: current_pos.x + direction.x, y: current_pos.y + direction.y}, type: move_type.capture });
				break;
			}
			moves.push({ position: {x: current_pos.x + direction.x, y: current_pos.y + direction.y}, type: move_type.move });
			current_pos = {x: current_pos.x + direction.x, y: current_pos.y + direction.y};
		}
	})

	return moves;
}
