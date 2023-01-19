import Image from "next/image";

import {board, color_id, piece_id, PieceInfo, point} from "../types";
import {in_bounds} from "../utils";

export const pawn: PieceInfo = {
	render: () => <Pawn/>,
	moves: moves_pawn
}

function Pawn() {
	return <Image src={"thirteen.svg"} alt={"test"} width={50} height={50}/>;
}

function moves_pawn(board: board, position: point): point[] {
	const piece = board[position.x][position.y];
	const direction = (piece.color == color_id.white ? +1 : -1);

	let moves = [];

	// if not at edge of the board
	if (in_bounds(position.x + direction)) {
		// check if pawn can move forward
		if (board[position.x + direction][position.y].piece === piece_id.none) {
			moves.push({x: position.x + direction, y: position.y});
			// can move two spaces if it hasn't moved yet
			if (!piece.has_moved && in_bounds(position.x + direction * 2) && board[position.x + direction * 2][position.y].piece === piece_id.none) {
				moves.push({x: position.x + direction * 2, y: position.y});
			}
		}
		if (in_bounds(position.y + 1) && board[position.x + direction][position.y + 1].color !== piece.color) {
			moves.push({x: position.x + direction, y: position.y + 1});
		}
		if (in_bounds(position.y - 1) && board[position.x + direction][position.y - 1].color !== piece.color) {
			moves.push({x: position.x + direction, y: position.y - 1});
		}
	}

	return moves;
}
