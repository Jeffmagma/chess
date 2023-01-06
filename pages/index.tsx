import Head from 'next/head'
import {motion} from 'framer-motion'
import React, {Dispatch, SetStateAction, useState} from "react";

interface PieceProps {
	set_selected: Dispatch<SetStateAction<point | null>>;
	row: number;
	col: number;
	piece: string;
	set_positions: Dispatch<SetStateAction<Array<Array<string>>>>;
}

function Piece({set_selected, row, piece, col, set_positions}: PieceProps) {
	const [position, set_position] = useState<point>({x: row, y: col});
	return (
		<motion.div drag style={{border: "1px solid green"}} dragSnapToOrigin={true} dragElastic={0} dragMomentum={false}
		            onDragStart={() => {
			            set_selected(position);
		            }
		            }
		            onDragEnd={(event: PointerEvent) => {
			            const x = document.elementsFromPoint(event.clientX, event.clientY)[1];
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
		            }
		            }>
			piece
		</motion.div>);
}

function Square({set_selected, row, piece, col, set_positions}: PieceProps) {
	return <div data-row={row} data-col={col} style={{width: "100px", height: "100px", border: "1px cyan solid"}}>
		{String.fromCharCode('A'.charCodeAt(0) + row) + (col + 1)}
		{piece ? <Piece set_selected={set_selected} piece={piece} row={row} col={col} set_positions={set_positions}/> : <></>}
	</div>
}

interface point {
	x: number
	y: number
}

const initial_board = [
	["test", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
]

function Board() {
	const [positions, set_positions] = useState(initial_board);
	const [_selected, set_selected] = useState<point | null>(null);

	return (
		<div style={{position: "absolute", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
			{positions.map((pieces, row) => pieces.map((piece, col) =>
				<Square key={"" + row + col} row={row} col={col} piece={piece} set_selected={set_selected} set_positions={set_positions}/>
			))}
		</div>)
}

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<Board/>
		</>
	)
}
