import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layout";


export const Dashboard = () => {
    return(
       <LayoutBaseDePagina 
       titulo="Pagina inicial" 
       BarraDeFerramenta = {(
        <BarraDeFerramentas
        mostrarInputBusca
        />
       )}>
        testando
       </LayoutBaseDePagina> 
    );
}