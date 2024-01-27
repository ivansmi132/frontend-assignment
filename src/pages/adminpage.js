import {useContext} from "react";
import {UserContext} from "../providers/auth-provider";
import {Outlet} from "react-router-dom";
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
                            <h1>Admin</h1>
                        </div>

                        <Outlet/>

                    </div>
                ) : <div style={{textAlign: "center"}}><h2>You have to be logged in</h2></div>
            }
        </>
    )
}