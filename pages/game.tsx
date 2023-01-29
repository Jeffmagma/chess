import Head from 'next/head'
import Link from "next/link";

import Board from "../components/board";
import {color_id} from "../chess/types";

export default function Game() {
	return (
		<>
			<Head>
				<title>chess test</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<Link href="/">back to home</Link>
			<div style={{display: "flex", gap: "10px"}}>
				<Board side={color_id.white}/>
				<Board side={color_id.black}/>
			</div>
			<a href={"https://github.com/Jeffmagma/chess"}>source code</a>
		</>
	)
}
