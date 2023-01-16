import {PieceInfoMap} from "./types";
import {testpiece} from "./pieces/test";
import {rook} from "./pieces/rook";

// names of pieces to be used in map
export enum piece_names {
	test = "test",
	pawn = "pawn",
	rook = "rook"
}

export const piece_info: PieceInfoMap = {
	test: testpiece,
	rook: rook,
}
