import { Button, TextField } from "@mui/material";
import {FerramentaDeDetalhes} from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layout";
import { Typography } from "@mui/material/styles/createTypography";


export const Dashboard = () => {


    return(
       <LayoutBaseDePagina 
       titulo="Pagina inicial" 
       BarraDeFerramenta = {(
        <FerramentaDeDetalhes mostrarBotaoSalvarEFechar mostrarBotaoNovo 
        
        />
       )}>
        <TextField
                    placeholder=""
                />
      
      </LayoutBaseDePagina> 
    );
}