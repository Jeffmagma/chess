import {useMemo, useRef, useState} from "react";

import {piece_info} from "../chess/piece_info";
import Square from "./square";
import {board, board_state, BoardProps, color_id, p, piece, point, white_pawn, white_rook} from "../chess/types";

function get_initial_board(): piece[][] {
	return [
		[white_rook, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[p, white_pawn, p, p, p, p, p, p],
		[white_rook, white_pawn, p, p, p, p, p, p],
	];
}

export default function Board({side}: BoardProps) {
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

	const board_squares = useMemo(() => {
		let sss: point[] = [];
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				if (side !== color_id.white) {
					sss.push({x: x, y: y});
				} else {
					sss.push({x: x, y: 8 - y - 1});
				}
			}
		}
		return sss;
	}, [side]);

	const state: board_state = {
		positions: positions,
		selected: selected,
		moves: moves,
		set_positions: set_positions,
		set_selected: set_selected,
	};

	const squares = board_squares.map(position => {
		const {x, y} = position;
		return <Square key={"" + x + y} x={x} y={y} piece={positions[x][y]} board={state} board_ref={board_ref}/>;
	})

	return (
		<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", userSelect: "none"}} ref={board_ref}>
			{squares}
		</div>
	);
}
