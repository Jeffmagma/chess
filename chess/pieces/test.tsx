import {PieceInfo, point} from "../types";
import Image from "next/image";

export const testpiece: PieceInfo = {
	render: <TestPiece/>,
	moves: moves_test
}

function TestPiece() {
	return <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none"}}><Image src={"thirteen.svg"} alt={"test"} width={20} height={20}/></div>
}

function moves_test(board: string[][], position: point): point[] {
	return [
		{x: position.x - 1, y: position.y},
		{x: position.x + 1, y: position.y},
		{x: position.x, y: position.y - 1},
		{x: position.x, y: position.y + 1},
	]
}
