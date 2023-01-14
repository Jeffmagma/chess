import Head from 'next/head'

import Board from "../components/board";

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
