import React from 'react';
import { useLayoutEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';

const Index = () => {
    const [productos, guardarProductos] = useState([]);
    const { firebase } = useContext(FirebaseContext);


    useLayoutEffect(()=>{
      let productosFetch = true;
      firebase.getAll("productos", ["creado", "desc"]).then( response => {
        if(productosFetch){
          guardarProductos(response);
        }
        });
        return () => { productosFetch = false }
    },[firebase]);

    return (
        <Layout> 
            <div className="listado-productos">
            <div className="contenedor">
                <ul className="bg-white">
                {            
                productos.map(producto =>                
                    (<DetalleProducto
                      key={producto.id}
                      producto={producto}
                    />)
                )
                }

                </ul>
            </div>
            </div> 
        </Layout>
     );
}
 
export default Index;