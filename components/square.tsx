import {point, SquareProps} from "../chess/types";
import Piece from "./piece";

export default function Square({x, y, piece, board}: SquareProps) {
	const {moves, selected, set_selected, set_moves, set_positions} = board;
	let color = "cyan";
	if (moves.some(position => position.x === x && position.y === y)) {
		color = "pink";
	}

	// if this piece is dragged or clicked onto a new square
	function end_move(new_position: point) {
		if (selected === null) return;
		const piece = board.positions[selected.x][selected.y];
		// only if it's a valid move
		if (moves.some(position => position.x === new_position.x && position.y === new_position.y)) {
			// remove the piece from its current position and place it in the new position
			console.log(`${piece} ${JSON.stringify(selected)} -> ${JSON.stringify(new_position)}`);
			set_positions(prev_board => {
				prev_board[new_position.x][new_position.y] = piece;
				prev_board[selected.x][selected.y] = "";
				return [...prev_board];
			})
		} else {
			console.log("invalid move!");
		}

		set_moves([]);
		set_selected(null);
	}

	return <div data-x={x} data-y={y} style={{position: "relative", width: "100px", height: "100px", border: "1px solid " + color}} onClick={() => {
		if (selected !== null) {
			if (selected.x === x && selected.y === y) {
				set_selected(null);
				set_moves([]);
			} else {
				end_move({x: x, y: y});
			}
		}
	}}>
		<div style={{position: "absolute"}}>{String.fromCharCode('A'.charCodeAt(0) + x) + (y + 1)}</div>
		{piece !== "" ? <Piece piece={piece} x={x} y={y} board={board} end_move={end_move}/> : <></>}
	</div>
}
