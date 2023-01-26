import Image from "next/image";

import {board, move, move_type, PieceInfo, point} from "../types";

export const testpiece: PieceInfo = {
	render: () => <TestPiece/>,
	moves: moves_test
}

function TestPiece() {
	return <Image src={"thirteen.svg"} alt={"test"} width={50} height={50}/>;
}

function moves_test(board: board, position: point): move[] {
	return [
		{position: {x: position.x - 1, y: position.y}, type: move_type.move},
		{position: {x: position.x + 1, y: position.y}, type: move_type.move},
		{position: {x: position.x, y: position.y - 1}, type: move_type.move},
		{position: {x: position.x, y: position.y + 1}, type: move_type.move},
	]
}
