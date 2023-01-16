import Image from "next/image";

import {PieceInfo, point} from "../types";

export const rook: PieceInfo = {
	render: <Rook/>,
	moves: moves_rook
}

function Rook() {
	return <Image src={"/rook.png"} alt={"rook"} width={50} height={50}/>;
}

function moves_rook(board: string[][], position: point): point[] {
	let moves: point[] = [];

	console.log(JSON.stringify(position));
	console.log(board);

	let pos_x = position.x - 1;
	while (pos_x >= 0 && board[pos_x][position.y] === "") {
		moves.push({x: pos_x, y: position.y});
		pos_x--;
	}

	pos_x = position.x + 1;
	while (pos_x < 8 && board[pos_x][position.y] === "") {
		moves.push({x: pos_x, y: position.y});
		pos_x++;
	}

	let pos_y = position.y - 1;
	while (pos_y >= 0 && board[position.x][pos_y] === "") {
		moves.push({x: position.x, y: pos_y});
		pos_y--;
	}

	pos_y = position.y + 1;
	while (pos_y < 8 && board[position.x][pos_y] === "") {
		moves.push({x: position.x, y: pos_y});
		pos_y++;
	}

	return moves;
}
