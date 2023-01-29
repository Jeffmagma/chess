import Image from "next/image";

import {board, color_id, move, move_type, piece_id, PieceInfo, PieceRenderProps, point} from "../types";
import {in_bounds} from "../utils";

export const pawn: PieceInfo = {
	render: (color) => <Pawn color={color}/>,
	moves: moves_pawn
}

function Pawn({color}: PieceRenderProps) {
	return <Image src={`/pawn_${color}.png`} alt={"pawn"} width={50} height={50}/>;
}

function moves_pawn(board: board, position: point): move[] {
	const piece = board[position.x][position.y];
	const direction = (piece.color === color_id.white ? +1 : -1);

	let moves: move[] = [];

	// if not at edge of the board
	if (in_bounds(position.y + direction)) {
		// check if pawn can move forward
		if (board[position.x][position.y + direction].piece === piece_id.none) {
			moves.push({position: {x: position.x, y: position.y + direction}, type: move_type.move});
			// can move two spaces if it hasn't moved yet
			if (!piece.has_moved && in_bounds(position.y + direction * 2) && board[position.x][position.y + direction * 2].piece === piece_id.none) {
				moves.push({position: {x: position.x, y: position.y + direction * 2}, type: move_type.move});
			}
		}
		if (in_bounds(position.x + 1) && board[position.x + 1][position.y + direction].color !== piece.color) {
			moves.push({position: {x: position.x + 1, y: position.y + direction}, type: move_type.capture});
		}
		if (in_bounds(position.x - 1) && board[position.x - 1][position.y + direction].color !== piece.color) {
			moves.push({position: {x: position.x - 1, y: position.y + direction}, type: move_type.capture});
		}
	}

	return moves;
}
