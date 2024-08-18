import { createContext, useMemo, useState, useCallback, useContext} from "react";
import { Box } from '@mui/system';
import { ThemeProvider } from '@mui/material';
import { darkTheme, LigthTheme } from "../themes";


interface IThemeContextdata {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextdata);


export const useAppContext = () => {
    return useContext(ThemeContext);
}

interface IAppthemeProvider {
children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppthemeProvider> = ({ children }) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);
    const theme = useMemo(() => {
        if (themeName === 'light') return LigthTheme;

        return darkTheme;
    }, [themeName]);
    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}