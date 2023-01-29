import {move_type, p, piece_id, point, special_move, SquareProps} from "../chess/types";
import Piece from "./piece";
import styles from "./../styles/square.module.css"
import { piece_info } from "../chess/piece_info";

export default function Square({x, y, piece, board, board_ref}: SquareProps) {
	const {moves, selected, set_selected, set_positions} = board;

	const ss = moves.find(move => move.position.x === x && move.position.y === y);

	// if this piece is dragged or clicked onto a new square
	function end_move(new_position: point) {
		if (selected === null) return;
		const current_piece = board.positions[selected.x][selected.y];

		// only if it's a valid move
		const select_move = moves.find(move => move.position.x === new_position.x && move.position.y === new_position.y)
		if (select_move !== undefined) {
			// remove the piece from its current position and place it in the new position
			console.log(`${current_piece} ${JSON.stringify(selected)} -> ${JSON.stringify(new_position)}`);
			set_positions(prev_board => {
				if (select_move.type === move_type.special) {
					const res_board = piece_info[piece.piece].do_special?.(prev_board, selected, select_move as special_move);
					if (res_board) { // Getting the typechecker happy
						return [...res_board];
					} else {
						// assert(false);
						return prev_board;
					}
				} else {
					current_piece.has_moved = true;
					prev_board[new_position.x][new_position.y] = current_piece;
					prev_board[selected.x][selected.y] = p;
				}
				return [...prev_board];
			})
		} else {
			console.log("invalid move!");
		}

		set_selected(null);
	}

	function move_type_color(type: move_type): string {
		switch(type) {
			case move_type.move: return "blue";
			case move_type.capture: return "red";
			case move_type.special: return "green";
		}
	}

	return <div data-x={x} data-y={y} className={styles.square + " " + (y % 2 === x % 2 ? styles.light : styles.dark)} onClick={() => {
		if (selected !== null) {
			if (selected.x === x && selected.y === y) {
				set_selected(null);
			} else {
				end_move({x: x, y: y});
			}
		}
	}}>
		{/*<div style={{position: "absolute"}}>{String.fromCharCode('A'.charCodeAt(0) + x) + (y + 1)}</div>*/}
		<div style={{position: "absolute"}}>{x + " " + y}</div>
		{piece.piece !== piece_id.none ? <Piece piece={piece} x={x} y={y} board={board} end_move={end_move} board_ref={board_ref}/> : <></>}
		{ss !== undefined ? <div style={{width: "100%", height: "100%", position: "absolute", zIndex: "2"}}>
			<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none", color: move_type_color(ss.type)}}>x</div>
		</div> : <></>}
	</div>
}
