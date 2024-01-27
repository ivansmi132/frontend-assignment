import {createContext, useLayoutEffect, useState} from "react";

// UserContext context is used to share user state with the whole app. The functionality is currently limited to a single user, the admin.
export const UserContext = createContext(null);

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/login`, {credentials: "include"})
            .then(data => data.json())
            .then(json => {
                if (!json) {return}
                console.log("user info", json);
                setUser({name: json.name, id: 1, picture_url: json.picture_url});
            }).finally(() => setLoading(false));
    }, [])

    function signIn() {
        setUser({name: "admin", id: 1});
    }

    function signOut() {
        setUser(null);
    }

    const value = {user, signIn, signOut, loading};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}