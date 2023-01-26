import Image from "next/image";

import {board, move, move_type, piece_id, PieceInfo, PieceRenderProps, point} from "../types";

export const rook: PieceInfo = {
	render: (color) => <Rook color={color}/>,
	moves: moves_rook
}

function Rook({color}: PieceRenderProps) {
	return <Image src={"/rook_" + color + ".png"} alt={"rook"} width={50} height={50}/>;
}

function moves_rook(board: board, position: point): move[] {
	let moves: move[] = [];

	let pos_x = position.x - 1;
	while (pos_x >= 0 && board[pos_x][position.y].piece === piece_id.none) {
		moves.push({position: {x: pos_x, y: position.y}, type: move_type.move});
		pos_x--;
	}
	if (pos_x >= 0 && board[pos_x][position.y].color !== board[position.x][position.y].color) {
		moves.push({position: {x: pos_x, y: position.y}, type: move_type.capture});
	}

	pos_x = position.x + 1;
	while (pos_x <= 7 && board[pos_x][position.y].piece === piece_id.none) {
		moves.push({position: {x: pos_x, y: position.y}, type: move_type.move});
		pos_x++;
	}
	if (pos_x <= 7 && board[pos_x][position.y].color !== board[position.x][position.y].color) {
		moves.push({position: {x: pos_x, y: position.y}, type: move_type.capture});
	}

	let pos_y = position.y - 1;
	while (pos_y >= 0 && board[position.x][pos_y].piece === piece_id.none) {
		moves.push({position: {x: position.x, y: pos_y}, type: move_type.move});
		pos_y--;
	}
	if (pos_y >= 0 && board[position.x][pos_y].color !== board[position.x][position.y].color) {
		moves.push({position: {x: position.x, y: pos_y}, type: move_type.capture});
	}

	pos_y = position.y + 1;
	while (pos_y <= 7 && board[position.x][pos_y].piece === piece_id.none) {
		moves.push({position: {x: position.x, y: pos_y}, type: move_type.move});
		pos_y++;
	}
	if (pos_y <= 7 && board[position.x][pos_y].color !== board[position.x][position.y].color) {
		moves.push({position: {x: position.x, y: pos_y}, type: move_type.capture});
	}

	return moves;
}
