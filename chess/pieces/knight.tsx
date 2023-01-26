import Image from "next/image";

import {board, color_id, move, move_type, PieceInfo, PieceRenderProps, point} from "../types";
import {in_bounds} from "../utils";

export const knight: PieceInfo = {
	render: (color) => <Knight color={color}/>,
	moves: moves_knight
}

function Knight({color}: PieceRenderProps) {
	return <Image src={"/knight_" + color + ".png"} alt={"knight"} width={50} height={50}/>;
}

function moves_knight(board: board, position: point): move[] {
	const piece = board[position.x][position.y];

	const knight_moves = [
		{x: -2, y: -1},
		{x: -1, y: -2},
		{x: +1, y: -2},
		{x: +2, y: -1},
		{x: +2, y: +1},
		{x: +1, y: +2},
		{x: -1, y: +2},
		{x: -2, y: +1},
	]

	let moves: move[] = [];

	// if not at edge of the board
	knight_moves.forEach(move => {
		if (in_bounds(position.x + move.x) && in_bounds(position.y + move.y)) {
			const new_pos = {x: position.x + move.x, y: position.y + move.y};
			if (board[new_pos.x][new_pos.y].color === color_id.none) {
				moves.push({position: new_pos, type: move_type.move});
			} else if (board[new_pos.x][new_pos.y].color !== piece.color) {
				moves.push({position: new_pos, type: move_type.capture});
			}
		}
	})

	return moves;
}
