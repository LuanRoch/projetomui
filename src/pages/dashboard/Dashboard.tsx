import { Box, Button, Grid, Icon, Input, Paper, TextField, Typography, useTheme } from "@mui/material";
import { FerramentaDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layout";
import { useEffect, useState } from "react";
import axios from "axios";






export const Dashboard = () => {
const checkCNPJ = (e:any) => {
    if (!e.target.value){
        return;
    }
    const cnpj = e.target.value.replace(/[^\d]+/g,"")

}


    const [cnpj, SetCnpj] = useState([])
    const getPosts = async () => {

        try {
            const response = await axios.get("https://brasilapi.com.br/api/cnpj/v1/${cnpj}"

            );
            const data = response.data
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {

        getPosts()
    }, [])

    return (
        <LayoutBaseDePagina
            titulo="Consultar CNPJ"
            BarraDeFerramenta={(
                <FerramentaDeDetalhes mostrarBotaoSalvarEFechar mostrarBotaoNovo

                />


            )}>
            <Box
                gap={1}
                marginX={1}
                padding={1}
                paddingX={1}
                display='grid'
                alignItems='center'
                component={Paper}>

                <Box 
                flex={1} 
                display='flex' 
                justifyContent='start' 
                gap={1}
                component="form"
                    >
                    

                    {(
                        <TextField id="outlined-basic" label="CNPJ:" variant="outlined" value={cnpj} />


                    )}
                    {(
                        <Button
                            color="primary"
                            disableElevation
                            variant="contained"
                            onClick={checkCNPJ}
                            endIcon={<Icon>send</Icon>}>
                            Buscar
                        </Button>
                    )}

                </Box>


                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >


                    <div>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Nome"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Razão Social"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Data de Abertura"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Situação"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Atividade Principal"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Endereço Completo"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Telefone"
                            defaultValue=""
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="E-mail"
                            defaultValue=""
                        />
                    </div>



                </Box>


            </Box>

        </LayoutBaseDePagina>
    );
}