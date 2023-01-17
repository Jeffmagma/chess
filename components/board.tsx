import {useMemo, useRef, useState} from "react";

import {piece_info} from "../chess/piece_info";
import {board_state, color_id, empty_pie, pie, piece_id, point} from "../chess/types";
import Square from "./square";

function get_initial_board(): pie[][] {
	// TODO add colors
	return [
		[{piece: piece_id.test, color: color_id.white}, "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", {piece: piece_id.test, color: color_id.white}, "", "", "", "", ""],
		["", "", "", "", {piece: piece_id.rook, color: color_id.white}, "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
	].map(x => x.map(y => y === "" ? empty_pie : y as pie));
}

export default function Board() {
	const [positions, set_positions] = useState<pie[][]>(get_initial_board());
	const [selected, set_selected] = useState<point | null>(null);
	const board_ref = useRef<HTMLDivElement>(null);

	const moves = useMemo(() => {
		if (selected === null) {
			return [];
		} else {
			const piece = positions[selected.x][selected.y];
			return piece_info[piece.piece].moves(positions, selected);
		}
	}, [selected]);

	const state: board_state = {
		positions: positions,
		selected: selected,
		moves: moves,
		set_positions: set_positions,
		set_selected: set_selected,
	}

	return (
		<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}} ref={board_ref}>
			{positions.map((pieces, x) => pieces.map((piece, y) =>
				<Square key={"" + x + y} x={x} y={y} piece={piece} board={state} board_ref={board_ref}/>
			))}
		</div>
	)
}
