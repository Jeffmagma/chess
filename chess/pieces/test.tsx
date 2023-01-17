import Image from "next/image";

import {board, PieceInfo, point} from "../types";

export const testpiece: PieceInfo = {
	render: <TestPiece/>,
	moves: moves_test
}

function TestPiece() {
	return <Image src={"thirteen.svg"} alt={"test"} width={50} height={50}/>;
}

function moves_test(board: board, position: point): point[] {
	return [
		{x: position.x - 1, y: position.y},
		{x: position.x + 1, y: position.y},
		{x: position.x, y: position.y - 1},
		{x: position.x, y: position.y + 1},
	]
}
