import {Dispatch, RefObject, SetStateAction} from "react";

export interface point {
	x: number
	y: number
}

export enum piece_id {
	none = "none",
	test = "test",
	rook = "rook",
	pawn = "pawn",
	knight = "knight",
	bishop = "bishop",
	queen = "queen",
	king = "king"
}

export enum color_id {
	none = "none",
	white = "white",
	black = "black",
}

export enum move_type {
	capture,
	move,
	special
}

export interface move {
	position: point;
	type: move_type;
}

export interface special_move extends move {
	targets: point[];
}

export class piece {
	piece: piece_id = piece_id.none
	color: color_id = color_id.none
	has_moved: boolean = false

	constructor(piece: piece_id = piece_id.none, color: color_id = color_id.none, has_moved: boolean = false) {
		return {piece: piece, color: color, has_moved: has_moved};
	}
}

export const p = new piece();
export const white_pawn = () => new piece(piece_id.pawn, color_id.white);
export const black_pawn = () => new piece(piece_id.pawn, color_id.black);
export const white_rook = () => new piece(piece_id.rook, color_id.white);
export const black_rook = () => new piece(piece_id.rook, color_id.black);
export const white_knight = () => new piece(piece_id.knight, color_id.white);
export const black_knight = () => new piece(piece_id.knight, color_id.black);
export const white_bishop = () => new piece(piece_id.bishop, color_id.white);
export const black_bishop = () => new piece(piece_id.bishop, color_id.black);
export const white_queen = () => new piece(piece_id.queen, color_id.white);
export const black_queen = () => new piece(piece_id.queen, color_id.black);
export const white_king = () => new piece(piece_id.king, color_id.white);
export const black_king = () => new piece(piece_id.king, color_id.black);

export interface PieceInfo {
	render: (color: color_id) => JSX.Element;
	moves: (board: board, position: point) => move[];
	do_special?: (board: board, position: point, mov: special_move) => board;
}

export interface PieceRenderProps {
	color: color_id;
}

export type PieceInfoMap = {
	[key in piece_id]: PieceInfo;
};

export type board = piece[][];

export interface board_state {
	positions: board
	selected: point | null;
	moves: move[];
	side: color_id;
	set_positions: Dispatch<SetStateAction<board>>;
	set_selected: Dispatch<SetStateAction<point | null>>;
}

export interface SquareProps {
	board: board_state;
	x: number;
	y: number;
	piece: piece;
	board_ref: RefObject<HTMLDivElement>;
}

export interface BoardProps {
	side: color_id;
}

export interface PieceProps extends SquareProps {
	end_move: (new_position: point) => void;
}
