import { Avatar, Divider, Drawer, List, ListItemButton, useTheme } from "@mui/material";
import { Box } from '@mui/system';


interface IMenuLateralProps {
    children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            <Drawer variant='permanent'>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width='100%' height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://media.licdn.com/dms/image/D4D03AQFJecZ5QB3h9Q/profile-displayphoto-shrink_200_200/0/1712581249909?e=1726704000&v=beta&t=5O-SGeRh7boL_ksS5aGkNBMt6tlX7GxXiEvlVjvmlV8" />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                        <ListItemButton>
                            Sobre
                        </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
}