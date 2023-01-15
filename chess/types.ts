import {Dispatch, Reducer, ReducerAction, RefObject, SetStateAction} from "react";

export interface point {
	x: number
	y: number
}

export interface PieceInfo {
	render: JSX.Element;
	moves: (board: string[][], position: point) => point[];
}

export interface PieceInfoMap {
	[key: string]: PieceInfo
}

export interface board_state {
	positions: string[][]
	selected: point | null;
	moves: point[];
	set_positions: Dispatch<SetStateAction<string[][]>>;
	set_selected: Dispatch<SetStateAction<point | null>>;
	//set_moves: Dispatch<SetStateAction<point[]>>;
	set_moves: Dispatch<ReducerAction<Reducer<point[], any>>>;
}

export interface SquareProps {
	board: board_state;
	x: number;
	y: number;
	piece: string;
	board_ref: RefObject<HTMLDivElement>;
}

export interface PieceProps extends SquareProps {
	end_move: (new_position: point) => void;
}
