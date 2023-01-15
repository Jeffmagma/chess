import {useState} from "react";
import {motion} from "framer-motion";

import {PieceProps, point} from "../chess/types";
import {piece_info} from "../chess/piece_info";

export default function Piece({x, y, piece, board, end_move}: PieceProps) {
	const {selected, set_selected, set_moves, positions} = board;

	const [position, set_position] = useState<point>({x: x, y: y});

	// when this piece is clicked or a drag is started
	function start_move() {
		// set the currently selected piece, and highlight the moves that it can make
		set_selected(position);
		set_moves([...piece_info[piece].moves(positions, {x: x, y: y})]);
	}

	return (
		<motion.div drag style={{width: "100%", height: "100%", border: "1px solid " + (selected == position ? "red" : "green"), position: "absolute"}} dragSnapToOrigin={true} dragElastic={0} dragMomentum={false}
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
			            console.log(elements);
			            const x = elements[0];
			            const new_position = {x: parseInt(x.getAttribute("data-x")!), y: parseInt(x.getAttribute("data-y")!)};

			            // if it's the same point, do nothing
			            if (position.x === new_position.x && position.y === new_position.y) return;

			            // end the move at this position
			            end_move(new_position);

			            set_position(new_position);
		            }}>
			{piece_info[piece].render}
		</motion.div>);
}
