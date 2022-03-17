import { useContext, createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

const UserContext = createContext({ user: undefined });

export function UserContextProvider(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({})
    const router = useRouter()

    const verify = async () => {
        const token = await Cookies.get('token');
        const jwt = `${token}`;

        if (token) {
            const decoded = jwt_decode(jwt);
            setUser(decoded);
            setAuthenticated(true)
        } else {
            router.push('/login');
        }
    }

    const logout = () => {
        setAuthenticated(false)
        Cookies.remove('token')
        router.push('/login')
    }

    useEffect(() => {
        if (authenticated === false) {
            verify()
        }
    }, [])


    return (
        <UserContext.Provider value={{user, logout, verify}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}