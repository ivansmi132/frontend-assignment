import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../providers/auth-provider";
import {Logo} from "./logo";
import "./navbar_styles.css";

export function NavigationLinks() {
    const {user} = useContext(UserContext);
    return (
        <div className={"navigation-links"}>
            <Link className={"nav-link"} to={'/'}>homepage</Link>
            <Link className={"nav-link"} to={'/posts'}>posts</Link>
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