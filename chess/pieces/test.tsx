import {PieceInfo, point} from "../types";

export const testpiece: PieceInfo = {
	render: <TestPiece/>,
	moves: moves_test
}

function TestPiece() {
	return <div>test piece</div>
}

function moves_test(board: string[][], position: point): point[] {
	return [{x: position.x - 1, y: position.y},
		{x: position.x + 1, y: position.y},
		{x: position.x, y: position.y - 1},
		{x: position.x, y: position.y + 1},
	]
}
