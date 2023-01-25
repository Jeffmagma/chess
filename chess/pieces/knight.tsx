import Image from "next/image";

import {board, PieceInfo, PieceRenderProps, point} from "../types";
import {in_bounds} from "../utils";

export const knight: PieceInfo = {
	render: (color) => <Knight color={color}/>,
	moves: moves_knight
}

function Knight({color}: PieceRenderProps) {
	return <Image src={"/knight_" + color + ".png"} alt={"knight"} width={50} height={50}/>;
}

function moves_knight(board: board, position: point): point[] {
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

	let moves: point[] = [];

	// if not at edge of the board
	knight_moves.forEach(move => {
		if (in_bounds(position.x + move.x) && in_bounds(position.y + move.y)) {
			moves.push({x: position.x + move.x, y: position.y + move.y});
		}
	})

	return moves;
}
