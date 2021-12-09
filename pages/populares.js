import React from 'react';
import Layout from '../components/layout/Layout';
import useProductos from '../hooks/useProductos';

const Populares = () => {

  const params = {
    "type": "list",
    "collectionName": "productos",
    "orderParams": ["votos", "desc"]
  };

  const content = useProductos(params);  

  return (
        <Layout> 
          {content}
        </Layout>
     );
}
   
  export default Populares;