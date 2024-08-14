import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layout";


export const Dashboard = () => {
    return(
       <LayoutBaseDePagina 
       titulo="Pagina inicial" 
       BarraDeFerramenta = {(
        <FerramentasDaListagem
        mostrarInputBusca
        textoBotaoNovo="Novo"
        />
       )}>
        testando
       </LayoutBaseDePagina> 
    );
}