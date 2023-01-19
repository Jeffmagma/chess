import {useMemo, useRef, useState} from "react";

import {piece_info} from "../chess/piece_info";
import Square from "./square";
import {board, board_state, color_id, p, piece, piece_id, point} from "../chess/types";

function get_initial_board(): piece[][] {
	return [
		[new piece(piece_id.rook, color_id.white), p, p, p, p, p, p, p],
		[p, p, p, p, p, p, p, p],
		[p, p, new piece(piece_id.rook, color_id.white), p, p, p, p, p],
		[p, p, p, p, new piece(piece_id.rook, color_id.white), p, p, p],
		[p, p, p, p, p, p, new piece(piece_id.pawn, color_id.white), p],
		[p, p, p, p, p, new piece(piece_id.rook, color_id.black), p, p],
		[p, p, p, p, p, p, p, p],
		[p, p, p, p, p, p, new piece(piece_id.pawn, color_id.white), p],
	];
}

export default function Board() {
	const [positions, set_positions] = useState<piece[][]>(get_initial_board());
	const [selected, set_selected] = useState<point | null>(null);
	const board_ref = useRef<HTMLDivElement>(null);
	const positions_ref = useRef<board>(positions);

	function calculate_moves() {
		if (selected === null) {
			return [];
		} else {
			const piece = positions_ref.current[selected.x][selected.y];
			return piece_info[piece.piece].moves(positions_ref.current, selected);
		}
	}

	const moves = useMemo(calculate_moves, [selected]);

	const state: board_state = {
		positions: positions,
		selected: selected,
		moves: moves,
		set_positions: set_positions,
		set_selected: set_selected,
	};

	return (
		<div
			style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}
			ref={board_ref}
		>
			{positions.map((pieces, x) =>
				pieces.map((piece, y) => (
					<Square key={x + x + y} x={x} y={y} piece={piece} board={state} board_ref={board_ref}/>
				))
			)}
		</div>
	);
}
