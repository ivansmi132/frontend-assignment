import {useContext} from "react";
import {UserContext} from "../providers/auth-provider";
import {Link, Outlet} from "react-router-dom";
import {NavigationBar} from "../components/navigation-bar/navbar";


export function AdminPage() {
    const {user} = useContext(UserContext);
    return (
        <>
            <NavigationBar />
        {
            user ? (
                <div className={"main-section"}>
                    <div className={"admin-nav"}>
                        <Link className={"sign-button"} to={"/admin/new_post"}>New Post</Link>
                        <Link className={"sign-button"} to={"/admin/edit_post"}>Edit Post</Link>
                    </div>
                    <Outlet/>
                </div>
            ) : <div style={{textAlign: "center"}}><h2>You have to be logged in</h2></div>
        }
        </>
    )
}