import {useEffect, useReducer, useRef, useState} from "react";

import {piece_info, piece_names} from "../chess/piece_info";
import {board_state, point} from "../chess/types";
import Square from "./square";

function get_initial_board() {
	// TODO add colors
	return [
		[piece_names.test, "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", piece_names.test, "", "", "", "", ""],
		["", "", "", "", piece_names.rook, "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
	];
}

export default function Board() {
	const [positions, set_positions] = useState(get_initial_board());
	const [selected, set_selected] = useState<point | null>(null);
	const board_ref = useRef<HTMLDivElement>(null);
	//const [moves, set_moves] = useState<point[]>([]);

	const [moves, set_moves] = useReducer((_state: point[], _action: null) => {
		if (selected === null) {
			return [];
		} else {
			const piece = positions[selected.x][selected.y];
			console.log(piece);
			return piece_info[piece].moves(positions, selected);
		}
	}, [])

	// update the available moves when
	useEffect(() => {
		console.log("s:" + JSON.stringify(selected));
		set_moves(null);
	}, [selected]);

	const state: board_state = {
		positions: positions,
		selected: selected,
		moves: moves,
		set_positions: set_positions,
		set_selected: set_selected,
		set_moves: set_moves,
	}

	return (
		<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}} ref={board_ref}>
			{positions.map((pieces, x) => pieces.map((piece, y) =>
				<Square key={"" + x + y} x={x} y={y} piece={piece} board={state} board_ref={board_ref}/>
			))}
		</div>
	)
}
