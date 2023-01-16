import {point, SquareProps} from "../chess/types";
import Piece from "./piece";

import styles from "./../styles/square.module.css"

export default function Square({x, y, piece, board, board_ref}: SquareProps) {
	const {moves, selected, set_selected, set_positions} = board;

	const square_is_move = moves.some(position => position.x === x && position.y === y);

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

		set_selected(null);
	}

	return <div data-x={x} data-y={y} className={styles.square + " " + (y % 2 == x % 2 ? styles.light : styles.dark)} onClick={() => {
		if (selected !== null) {
			if (selected.x === x && selected.y === y) {
				set_selected(null);
			} else {
				end_move({x: x, y: y});
			}
		}
	}}>
		<div style={{position: "absolute"}}>{String.fromCharCode('A'.charCodeAt(0) + x) + (y + 1)}</div>
		{square_is_move ? <div style={{width: "100%", height: "100%", position: "absolute"}}>
			<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none"}}>x</div>
		</div> : <></>}
		{piece !== "" ? <Piece piece={piece} x={x} y={y} board={board} end_move={end_move} board_ref={board_ref}/> : <></>}
	</div>
}
