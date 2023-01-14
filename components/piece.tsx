import React, {useState} from "react";
import {motion} from "framer-motion";

import {PieceProps, point} from "../chess/types";
import {piece_info} from "../chess/pieces";

export default function Piece({x, y, piece, board}: PieceProps) {
	const {selected, set_selected, set_moves, positions, moves, set_positions} = board;

	// when this piece is clicked or a drag is started
	function start_move() {
		// set the currently selected piece, and highlight the moves that it can make
		set_selected(position);
		set_moves([...piece_info[piece].moves(positions, {x: x, y: y})]);
	}

	// if this piece is dragged or clicked onto a new square
	function end_move(new_position: point) {
		console.log(moves, new_position);
		// only if it's a valid move
		if (moves.some(position => position.x === new_position.x && position.y === new_position.y)) {
			// remove the piece from its current position and place it in the new position
			console.log(`${piece} ${position} -> ${new_position}`);
			set_positions(prev_board => {
				prev_board[new_position.x][new_position.y] = piece;
				prev_board[position.x][position.y] = "";
				return [...prev_board];
			})
			set_position(new_position);
		} else {
			console.log("invalid move!");
		}

		set_moves([]);
	}

	const [position, set_position] = useState<point>({x: x, y: y});
	return (
		<motion.div drag style={{border: "1px solid " + (selected == position ? "red" : "green")}} dragSnapToOrigin={true} dragElastic={0} dragMomentum={false}
		            onClick={() => {
			            if (selected == position) {
				            set_selected(null);
				            set_moves([]);
			            } else {
				            start_move();
			            }
		            }}
		            onDragStart={start_move}
		            onDragEnd={(event: PointerEvent) => {
			            // get the square under the mouse
			            const elements = document.elementsFromPoint(event.clientX, event.clientY);
			            const x = elements[elements.length - 3];
			            const new_position = {x: parseInt(x.getAttribute("data-x")!), y: parseInt(x.getAttribute("data-y")!)};

			            // if it's the same point, do nothing
			            if (position.x === new_position.x && position.y === new_position.y) return;

			            // end the move at this position
			            end_move(new_position);
		            }}>
			{piece_info[piece].render}
		</motion.div>);
}
