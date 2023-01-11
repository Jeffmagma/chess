import Head from 'next/head'
import {motion} from 'framer-motion'
import React, {Dispatch, SetStateAction, useState} from "react";

interface PieceProps {
	row: number;
	col: number;
	piece: string;
	board: string[][];
	selected: point | null;
	set_selected: Dispatch<SetStateAction<point | null>>;
	set_positions: Dispatch<SetStateAction<string[][]>>;
	moves: point[];
	set_moves: Dispatch<SetStateAction<point[]>>;
}

enum piece_names {
	test = "test",
	pawn = "pawn",
}

function pawn_moves(board: string[][], position: point): point[] {
	const direction = 1;
	let r: point[] = [];
	if (board[position.x][position.y + direction] === "") {
		r.push({x: position.x, y: position.y + direction});
	}
	if (board[position.x][position.y + direction * 2] === "") {
		r.push({x: position.x, y: position.y + direction * 2});
	}
	return r;
}

const pieces: { [key: string]: { render: JSX.Element, moves: (board: string[][], position: point) => point[] } } = {
	test: {
		render: <div>test piece</div>,
		moves: (board, position) => {
			return [{x: position.x - 1, y: position.y},
				{x: position.x + 1, y: position.y},
				{x: position.x, y: position.y - 1},
				{x: position.x, y: position.y + 1},
			]
		}
	},
	pawn: {
		render: <div>pawn</div>,
		moves: pawn_moves
	}
}

function Piece({selected, set_selected, row, piece, col, set_positions, set_moves, board}: PieceProps) {
	const [position, set_position] = useState<point>({x: row, y: col});
	return (
		<motion.div drag style={{border: "1px solid " + (selected == position ? "red" : "green")}} dragSnapToOrigin={true} dragElastic={0} dragMomentum={false}
		            onClick={() => {
			            if (selected == position) {
				            set_selected(null);
				            set_moves([]);
			            } else {
				            set_selected(position);
				            set_moves([...pieces[piece].moves(board, {x: row, y: col})]);
			            }
		            }}
		            onDragStart={() => {
			            set_selected(position);
			            set_moves([...pieces[piece].moves(board, {x: row, y: col})]);
		            }}
		            onDragEnd={(event: PointerEvent) => {
			            set_moves([]);
			            const elements = document.elementsFromPoint(event.clientX, event.clientY);
			            const x = elements[elements.length - 3];
			            console.log(elements);
			            const new_position = {x: parseInt(x.getAttribute("data-row")!), y: parseInt(x.getAttribute("data-col")!)};
			            set_positions(prev_position => {
				            if (position.x == new_position.x && position.y == new_position.y) {
					            return prev_position;
				            }
				            const prev = [...prev_position];
				            console.log(new_position);
				            prev[new_position.x][new_position.y] = piece;
				            prev[position.x][position.y] = "";
				            return prev;
			            })
			            set_position(new_position);
			            console.log(x.getAttribute("data-row"), x.getAttribute("data-col"));
		            }}>
			{pieces[piece].render}
		</motion.div>);
}

function Square({selected, set_selected, row, piece, col, set_positions, set_moves, moves, board}: PieceProps) {
	let color = "cyan";
	if (moves.some(position => position.x === row && position.y === col)) {
		color = "pink";
	}
	return <div data-row={row} data-col={col} style={{width: "100px", height: "100px", border: "1px solid " + color}}>
		{String.fromCharCode('A'.charCodeAt(0) + row) + (col + 1)}
		{piece !== "" ? <Piece selected={selected} set_selected={set_selected} piece={piece} row={row} col={col} set_positions={set_positions} set_moves={set_moves} board={board} moves={moves}/> : <></>}
	</div>
}

interface point {
	x: number
	y: number
}

const initial_board = [
	[piece_names.test, "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
]

function Board() {
	const [positions, set_positions] = useState(initial_board);
	const [selected, set_selected] = useState<point | null>(null);
	const [moves, set_moves] = useState<point[]>([]);

	return (
		<div>
			<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
				{positions.map((pieces, row) => pieces.map((piece, col) =>
					<Square selected={selected} key={"" + row + col} row={row} col={col} piece={piece} set_selected={set_selected} set_positions={set_positions} set_moves={set_moves} moves={moves} board={positions}/>
				))}
			</div>
		</div>
	)
}

export default function Home() {
	return (
		<>
			<Head>
				<title>chess test</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<Board/>
			<a href={"https://github.com/Jeffmagma/chess"}>source code</a>
		</>
	)
}
