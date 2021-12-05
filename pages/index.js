import React from 'react';
import Layout from '../components/layout/Layout';
import useProductos from '../hooks/useProductos';
const Index = () => {

  const content = useProductos("productos", ["creado", "desc"]);  
  console.log("Index");

  return (
        <Layout> 
          {content}
        </Layout>
     );
}
 
export default Index;