import {PieceInfoMap} from "./types";
import {testpiece} from "./pieces/test";

// names of pieces to be used in map
export enum piece_names {
	test = "test",
	pawn = "pawn",
}

export const piece_info: PieceInfoMap = {
	test: testpiece
}
