import React from 'react';
import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';
import useProductos from '../hooks/useProductos';

const Populares = () => {

  const content = useProductos("productos", ["votos", "desc"]);  
  console.log("Populares");

  return (
        <Layout> 
          {content}
        </Layout>
     );
}
   
  export default Populares;