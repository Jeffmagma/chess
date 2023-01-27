import {supabase} from "../chess/supabase";
import {useEffect, useState} from "react";

export function GameList() {
	const [payloads, set_payloads] = useState<string[]>([]);

	useEffect(() => {
		supabase.from("games").select().then(x => set_payloads(x.data!.map(x => JSON.stringify(x))));
	}, []);

	useEffect(() => {
		console.log("subscribe")
		const channel = supabase.channel("table-db-changes").on("postgres_changes", {event: "UPDATE", schema: "public", table: "games"}, (payload => set_payloads(cur => [...cur, JSON.stringify(payload)]))).subscribe();
		return () => {
			channel.unsubscribe().then(r => console.log("unsubscribed:" + r))
		};
	}, []);

	return <div>
		{payloads}
	</div>
}
