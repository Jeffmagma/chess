import { piece_id } from "./types";

export function in_bounds(coord: number): boolean {
	return 0 <= coord && coord < 8;
}

export function can_castle(p_id: piece_id): boolean {
	switch (p_id) {
		case piece_id.rook:
		// Add pieces with castling here
			return true;
		default: 
			return false;
	}
}
