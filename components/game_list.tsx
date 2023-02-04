import {useEffect, useState} from "react";

import {supabase} from "../chess/supabase";
import {piece} from "../chess/types";

type game = {
	id: string;
	created_at: string;
	board: piece[][];
	players: string[];
}

export function GameList() {
	const [games, set_games] = useState<game[]>([]);

	useEffect(() => {
		supabase.from("games").select().then(x => set_games(x.data as game[]));
	}, []);

	useEffect(() => {
		const channel = supabase.channel("table-db-changes").on("postgres_changes", {event: "*", schema: "public", table: "games"}, (payload => {
			if (payload.eventType === "INSERT") {
				set_games(games => [...games, payload.new as game]);
			} else if (payload.eventType === "UPDATE") {
				set_games(games => games.map(x => x.id === payload.new.id ? payload.new as game : x));
			} else if (payload.eventType === "DELETE") {
				set_games(games => games.filter(x => x.id !== payload.old.id));
			}
		})).subscribe();
		return () => {
			channel.unsubscribe().then(r => console.log("unsubscribed:" + r));
		};
	}, []);

	return <div>{games?.map(x => <div key={x.id}>{JSON.stringify(x)}<br/></div>)}</div>;
}
