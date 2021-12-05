import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import DetalleProducto from '../components/layout/DetalleProducto';  

const useProductos =  (collectionName, orderParams) => {
    const { firebase } = useContext(FirebaseContext);
    const [productos, guardarProductos] = useState([]);
    const [productosFetch, guardarProductosFetch] = useState(true);

    useEffect(()=>{
        if(productosFetch){
          firebase.getAll(collectionName, orderParams).then( response => {  
            guardarProductos(response);
              guardarProductosFetch(false);
            console.log("productos...");
          })
        }; 
      },[firebase, productosFetch, guardarProductos])
    
    return (<div className="listado-productos">
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
</div>);
}

export default useProductos;

