import {motion} from "framer-motion";

import {PieceProps} from "../chess/types";
import {piece_info} from "../chess/piece_info";

export default function Piece({x, y, piece, board, end_move, board_ref}: PieceProps) {
	const {selected, set_selected} = board;

	// when this piece is clicked or a drag is started
	function start_move() {
		// set the currently selected piece, and highlight the moves that it can make
		set_selected({x: x, y: y});
	}

	return (
		<motion.div drag style={{zIndex: 1, width: "100%", height: "100%", border: "1px solid " + (selected != null && selected.x === x && selected.y === y ? "red" : "green"), position: "absolute"}} dragSnapToOrigin={true} dragElastic={0} dragMomentum={false}
		            onClick={() => {
			            if (selected !== null && selected.x === x && selected.y === y) {
				            set_selected(null);
			            } else {
				            start_move();
			            }
		            }}
		            onDragStart={start_move}
		            onDragEnd={(event: PointerEvent) => {
			            // get the square under the mouse
			            const elements = document.elementsFromPoint(event.clientX, event.clientY);
			            const square = elements.find(element => element.parentNode === board_ref.current);

			            // if it's not on the board, do nothing
			            if (square === undefined) return;

			            const new_position = {x: parseInt(square.getAttribute("data-x")!), y: parseInt(square.getAttribute("data-y")!)};

			            // if it's the same point, do nothing
			            if (x === new_position.x && y === new_position.y) return;

			            // end the move at this position
			            end_move(new_position);
		            }}>
			<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none"}}>{piece_info[piece].render}</div>
		</motion.div>);
}
