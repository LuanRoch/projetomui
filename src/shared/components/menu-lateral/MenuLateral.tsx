import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Box } from '@mui/system';
import { useAppContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { DarkMode } from "@mui/icons-material";

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
};

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();

    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>

    );
};




interface IMenuLateralProps {
    children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const { toggleTheme } = useAppContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width='100%' height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="data:image/jpeg;base64,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" />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    key={drawerOptions.path}
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    to={drawerOptions.path}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    <Box >
                        <List component="nav">
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Alternar tema' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};