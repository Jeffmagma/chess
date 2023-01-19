import {piece_id, PieceInfoMap} from "./types";

import {testpiece} from "./pieces/test";
import {rook} from "./pieces/rook";
import {pawn} from "./pieces/pawn";

export const piece_info: PieceInfoMap = {
	[piece_id.none]: {render: <></>, moves: () => []},
	[piece_id.test]: testpiece,
	[piece_id.rook]: rook,
	[piece_id.pawn]: pawn,
}
