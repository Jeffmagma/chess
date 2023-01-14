import {piece_names} from "../chess/pieces";
import React, {useState} from "react";
import {BoardState, point} from "../chess/types";
import Square from "./square";

function get_initial_board() {
	return [
		[piece_names.test, "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
	];
}

export default function Board() {
	const [positions, set_positions] = useState(get_initial_board());
	const [selected, set_selected] = useState<point | null>(null);
	const [moves, set_moves] = useState<point[]>([]);

	const board_sate: BoardState = {
		positions: positions,
		selected: selected,
		moves: moves,
		set_positions: set_positions,
		set_selected: set_selected,
		set_moves: set_moves,
	}

	return (
		<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
			{positions.map((pieces, x) => pieces.map((piece, y) =>
				<Square key={"" + x + y} x={x} y={y} piece={piece} board={board_sate}/>
			))}
		</div>
	)
}
