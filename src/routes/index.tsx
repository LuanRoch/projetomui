import { Button, Icon } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { 
  ListaCnpj,
  Dashboard,

 } from '../pages';


export const AppRoutes = () => {
  const {setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      // {
      //   icon: 'home',
      //   path: '/pagina-inicial',
      //   label: 'Consulta de CNPJ',
      // },
      {
        icon: 'view_list',
        path: '/ListaCnpj',
        label: 'Consultar CNPJ',
      },
      
    ])
  });
  return (
    <Routes>
      {/* <Route path="/pagina-inicial" element={<Dashboard/>} /> */}
      <Route path="/ListaCnpj" element={<ListaCnpj/>} />
      {/* <Route path="/ListaCnpj/Detalhes/:id" element={<Dashboard/>} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />


      
    </Routes>
  )
}