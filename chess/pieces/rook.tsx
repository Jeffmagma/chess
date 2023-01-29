import Image from "next/image";

import {board, move, move_type, piece_id, PieceInfo, PieceRenderProps, point} from "../types";
import {edge_mover} from "./piece";

export const rook: PieceInfo = {
	render: (color) => <Rook color={color}/>,
	moves: moves_rook
}

function Rook({color}: PieceRenderProps) {
	return <Image src={`/rook_${color}.png`} alt={"rook"} width={50} height={50}/>;
}

function moves_rook(board: board, position: point): move[] {
	const directions = [
		{x: +1, y: 0},
		{x: -1, y: 0},
		{x: 0, y: +1},
		{x: 0, y: -1},
	];

	return edge_mover(board, position, directions);
}
