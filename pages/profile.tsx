import {supabase} from "../chess/supabase";
import {User, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

function Pro({user}: { user: User }) {
	const [username, set_username] = useState<string>("");
	const [image_link, set_image_link] = useState<string>("");
	const [username_input, set_username_input] = useState<string>("");
	const id = user.id;

	useEffect(() => {
		supabase.from("users").select().eq('id', id).single().then(x => {
			set_username(x.data.username);
			set_image_link(x.data.avatar_url);
		});
	}, [id]);

	useEffect(() => {

		console.log("sub");
		const channel = supabase.channel("table-db-changes").on("postgres_changes", {event: "UPDATE", schema: "public", table: "users"}, (payload => {
			console.log(payload);
			set_username(payload.new.username);
		})).subscribe();
		return () => {
			supabase.removeChannel(channel).then(r => console.log("unsub:" + r));
		};
	}, []);

	return (
		<>
			<input id={"username_input"} value={username_input} onChange={e => set_username_input(e.target.value)}/>
			<button onClick={() => {
				supabase.from("users").update({
					username: username_input,
					updated_at: new Date().toISOString()
				}).eq("id", user.id).then(_ => console.log("username updated!"));
			}}>update username
			</button>
			hello {username}
			<Image src={image_link} alt={"image link"} width={100} height={100}/>
			<Link href={"/game"}>go to game</Link>
			<Link href={"/"}>go to home</Link>
		</>
	)
}

export default function Profile() {
	const user = useUser();

	return user ? <Pro user={user}/> : <div>no user! wtf!</div>;
}
