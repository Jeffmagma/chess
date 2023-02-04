import {GameList} from "../components/game_list";
import Link from "next/link";

export default function Play() {
	return <>
		<Link href="/">home</Link><GameList/></>;
}
