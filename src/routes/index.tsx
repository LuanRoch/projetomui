
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { 
  ListaCnpj,
  

 } from '../pages';


export const AppRoutes = () => {
  const {setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
    
      {
        icon: 'view_list',
        path: '/ListaCnpj',
        label: 'Consultar CNPJ',
      },
      
    ])
  });
  return (
    <Routes>
      <Route path="/ListaCnpj" element={<ListaCnpj/>} />
      <Route path="*" element={<Navigate to="/ListaCnpj" />} />


      
    </Routes>
  )
}