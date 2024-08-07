import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


interface BarraDeFerramentasProps {

    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudartextoBusca?: (novoTexto: string) => void;

    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;

}

export const BarraDeFerramentas: React.FC<BarraDeFerramentasProps> = ({

    textoDaBusca = '',
    aoMudartextoBusca,
    mostrarInputBusca = false,

    aoClicarEmNovo,
    mostrarBotaoNovo = true,
    textoBotaoNovo = 'Novo',
}) => {
    const theme = useTheme();
    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={1}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}>

            {mostrarInputBusca && (
                <TextField
                    value={textoDaBusca}
                    onChange={(e) => aoMudartextoBusca?.(e.target.value)}
                    size="small"
                    placeholder="Pesquisando..."
                />
            )}
            <Box flex={1} display='flex' justifyContent='end'>

                {mostrarBotaoNovo &&(
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}>
                        {textoBotaoNovo}
                    </Button>
                )}

            </Box>
        </Box>
    );
}