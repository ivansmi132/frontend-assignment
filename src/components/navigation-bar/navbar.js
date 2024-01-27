import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../providers/auth-provider";
import {Logo} from "./logo";
import "./navbar_styles.css";
import googleButton from '../../assets/google-signin-buttons/web/png@1x/dark/web_dark_rd_ctn@1x.png';

function navigate(url) {
    window.location.href = url;
}

async function auth() {
    const response = await fetch('http://127.0.0.1:3001/request', {
        method: "POST"
    });
    const data = await response.json();
    navigate(data.url);
}
export function NavigationLinks() {
    const {user} = useContext(UserContext);
    return (
        <div className={"navigation-links"}>
            <Link className={"nav-link"} to={'/'}>homepage</Link>
            <Link className={"nav-link"} to={'/posts'}>posts</Link>
            {!user && (<button style={{background: 'transparent', border: 'none'}} onClick={() => auth()}>
                <img src={googleButton} alt="google sign in"/>
            </button>)}
            {user && <Link className={"nav-link"} to={'/admin'}>admin</Link>}
        </div>
    )
}

export function SignButton() {
    const {user, signIn, signOut} = useContext(UserContext);
    return (
        user ? <button className={"sign-button"} onClick={signOut}>sign out</button> : <button className={"sign-button"} onClick={signIn}>sign in</button>
    )
}

export function NavigationBar() {
    return (
        <div className={"navigation-header"}>
            <div className={"navigation-bar"}>
                <div>
                    <Logo />
                </div>

                <div className={"navigation-items"}>
                    <NavigationLinks />
                    <SignButton />
                </div>
            </div>
        </div>
    )
}