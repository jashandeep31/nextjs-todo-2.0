import "@/styles/globals.scss";
import AuthState from "../context/AuthState";
export default function App({ Component, pageProps }) {
    return (
        <AuthState>
            <Component {...pageProps} />
        </AuthState>
    );
}
