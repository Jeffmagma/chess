import Image from "next/image";

import {board, piece_id, PieceInfo, point} from "../types";

export const rook: PieceInfo = {
	render: <Rook/>,
	moves: moves_rook
}

function Rook() {
	return <Image src={"/rook_white.png"} alt={"rook"} width={50} height={50}/>;
}

function moves_rook(board: board, position: point): point[] {
	let moves: point[] = [];

	let pos_x = position.x - 1;
	while (pos_x >= 0 && board[pos_x][position.y].piece === piece_id.none) {
		moves.push({x: pos_x, y: position.y});
		pos_x--;
	}
	if (pos_x >= 0 && board[pos_x][position.y].color !== board[position.x][position.y].color) {
		moves.push({x: pos_x, y: position.y});
	}

	pos_x = position.x + 1;
	while (pos_x <= 7 && board[pos_x][position.y].piece === piece_id.none) {
		moves.push({x: pos_x, y: position.y});
		pos_x++;
	}
	if (pos_x <= 7 && board[pos_x][position.y].color !== board[position.x][position.y].color) {
		moves.push({x: pos_x, y: position.y});
	}

	let pos_y = position.y - 1;
	while (pos_y >= 0 && board[position.x][pos_y].piece === piece_id.none) {
		moves.push({x: position.x, y: pos_y});
		pos_y--;
	}
	if (pos_y >= 0 && board[position.x][pos_y].color !== board[position.x][position.y].color) {
		moves.push({x: position.x, y: pos_y});
	}

	pos_y = position.y + 1;
	while (pos_y <= 7 && board[position.x][pos_y].piece === piece_id.none) {
		moves.push({x: position.x, y: pos_y});
		pos_y++;
	}
	if (pos_y <= 7 && board[position.x][pos_y].color !== board[position.x][position.y].color) {
		moves.push({x: position.x, y: pos_y});
	}

	return moves;
}
