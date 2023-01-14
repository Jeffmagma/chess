import React from "react";
import {SquareProps} from "../chess/types";
import Piece from "./piece";

export default function Square({x, y, piece, board}: SquareProps) {
	const {moves, selected, set_selected, set_moves} = board;
	let color = "cyan";
	if (moves.some(position => position.x === x && position.y === y)) {
		color = "pink";
	}

	return <div data-x={x} data-y={y} style={{width: "100px", height: "100px", border: "1px solid " + color}} onClick={() => {
		if (selected) {
			if (selected.x === x && selected.y === y) {
				set_selected(null);
				set_moves([]);
			} else {

			}
		}
	}}>
		{String.fromCharCode('A'.charCodeAt(0) + x) + (y + 1)}
		{piece !== "" ? <Piece piece={piece} x={x} y={y} board={board}/> : <></>}
	</div>
}
