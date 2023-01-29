import Image from "next/image";

import {board, color_id, move, move_type, piece, PieceInfo, PieceRenderProps, point} from "../types";
import {in_bounds} from "../utils";
import {edge_mover} from "./piece";

export const bishop: PieceInfo = {
	render: (color) => <Bishop color={color}/>,
	moves: moves_bishop
}

function Bishop({color}: PieceRenderProps) {
	return <Image src={`/bishop_${color}.png`} alt={"bishop"} width={50} height={50}/>;
}

function moves_bishop(board: board, position: point): move[] {
	const directions = [
		{x: -1, y: -1},
		{x: -1, y: +1},
		{x: +1, y: -1},
		{x: +1, y: +1}
	];

	return edge_mover(board, position, directions);
}
