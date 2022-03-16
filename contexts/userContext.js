import { useContext, createContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';


const UserContext = createContext(null);

export function UserContextProvider(props) {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;