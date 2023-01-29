import {Session, SessionContextProvider} from '@supabase/auth-helpers-react'
import {AppProps} from 'next/app'

import '../styles/globals.css'
import {supabase} from "../chess/supabase";

export default function App({Component, pageProps}: AppProps<{ initialSession: Session }>) {
	return (
		<SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
			<Component {...pageProps} />
		</SessionContextProvider>
	)
}
