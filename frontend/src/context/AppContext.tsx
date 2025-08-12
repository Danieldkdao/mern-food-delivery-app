import { createContext, type ReactNode, useState, useContext } from 'react';

type UserInfo = {
    id: string
    name: string
    accessToken: string
}

type AppContextType = {
    loginShown: boolean
    toggleLoginShown: (bool: boolean) => void
    showSearchbar: boolean
    toggleShowSearchbar: (bool: boolean) => void
    isLoggedIn: boolean
    toggleIsLoggedIn: (bool: boolean) => void
    userInfo: UserInfo
    setUserInfo: (arg: UserInfo) => void
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({children}: {children: ReactNode}){
    const [ loginShown, setLoginShown ] = useState(false);
    const [ showSearchbar, setShowSearchbar ] = useState(false);
    const [ isLoggedIn, setisLoggedIn ] = useState(false);
    const [ userInfo, setUserInfo ] = useState<UserInfo>({id: "", name: "", accessToken: ""});

    const toggleLoginShown = (bool: boolean) => 
        setLoginShown(bool);
    const toggleShowSearchbar = (bool: boolean) => 
        setShowSearchbar(bool);
    const toggleIsLoggedIn = (bool: boolean) => 
        setisLoggedIn(bool);

    return(
        <AppContext.Provider value={{loginShown, toggleLoginShown, showSearchbar, toggleShowSearchbar, isLoggedIn, toggleIsLoggedIn, userInfo, setUserInfo}}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp(){
    const context = useContext(AppContext);
    if(!context){
        throw new Error("Context must be used inside the provider.");
    }
    return context;
}