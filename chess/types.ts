import {Dispatch, RefObject, SetStateAction} from "react";

export interface point {
	x: number
	y: number
}

export enum piece_id {
	none = "none",
	test = "test",
	rook = "rook",
}

export enum color_id {
	none = "none",
	white = "white",
	black = "black",
}

export interface pie {
	piece: piece_id
	color: color_id
}

export const empty_pie: pie = {
	piece: piece_id.none,
	color: color_id.none,
}

export interface PieceInfo {
	render: JSX.Element;
	moves: (board: board, position: point) => point[];
}

export type PieceInfoMap = {
	[key in piece_id]: PieceInfo;
};

export type board = pie[][];

export interface board_state {
	positions: board
	selected: point | null;
	moves: point[];
	set_positions: Dispatch<SetStateAction<board>>;
	set_selected: Dispatch<SetStateAction<point | null>>;
}

export interface SquareProps {
	board: board_state;
	x: number;
	y: number;
	piece: pie;
	board_ref: RefObject<HTMLDivElement>;
}

export interface PieceProps extends SquareProps {
	end_move: (new_position: point) => void;
}
