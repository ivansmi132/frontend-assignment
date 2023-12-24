import {createContext, useState} from "react";

// UserContext context is used to share user state with the whole app. The functionality is currently limited to a single user, the admin.
export const UserContext = createContext(null);

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    function signIn() {
        setUser({name: "admin"});
    }

    function signOut() {
        setUser(null);
    }

    const value = {user, signIn, signOut};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}