import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


import { Environment } from "../../environment";


interface IFerramentasDaListagemProps {

    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudartextoBusca?: (novoTexto: string) => void;

    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;

}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({

    textoDaBusca = '',
    aoMudartextoBusca,
    mostrarInputBusca = true,

    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
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
                    placeholder={Environment.INPUT_DE_BUSCA}
                />
            )}
            <Box flex={1} display='flex' justifyContent='start'>

                {mostrarBotaoNovo &&(
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        startIcon={<Icon>send</Icon>}>
                        {textoBotaoNovo}
                    </Button>
                )}

            </Box>
        </Box>
    );
}