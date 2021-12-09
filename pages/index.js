import React from 'react';
import Layout from '../components/layout/Layout';
import useProductos from '../hooks/useProductos';
const Index = () => {

  const params = {
    "type": "list",
    "collectionName": "productos",
    "orderParams": ["creado", "desc"]
  };
  
  const content = useProductos(params);  

  return (
        <Layout> 
          {content}
        </Layout>
     );
}
 
export default Index;