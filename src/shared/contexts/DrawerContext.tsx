import { createContext,useState, useCallback, useContext } from "react";




interface IDrawerContextdata {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextdata);


export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

interface IAppthemeProvider {
    children: React.ReactNode
}

export const DrawerProvider: React.FC<IAppthemeProvider> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState (false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);
    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    )
}