import {point} from "./types";
import {testpiece} from "./pieces/test";

// names of pieces to be used in map
export enum piece_names {
	test = "test",
	pawn = "pawn",
}

interface PieceInfoMap {
	[key: string]: { render: JSX.Element, moves: (board: string[][], position: point) => point[] }
}

export const piece_info: PieceInfoMap = {
	test: testpiece
}
