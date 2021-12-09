import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import DetalleProducto from '../components/layout/DetalleProducto';  

const useProductos =  (params) => {
    const { firebase } = useContext(FirebaseContext);
    const [productos, guardarProductos] = useState([]);
    const [productosFetch, guardarProductosFetch] = useState(true);
    const { type } = params;
    useEffect(()=>{
        if(productosFetch||params.reopen){
          switch(type){
            case "list":
              firebase.getAll(params.collectionName, params.orderParams).then( response => {  
                guardarProductos(response);
                guardarProductosFetch(false);
              });
            break;
            case "search":
              firebase.findDoc(params.collectionName, params.field, params.itemName).then( response => { 
                guardarProductos(response);
                guardarProductosFetch(false);
              });
            break;
          } 
        }
    },[params, type, firebase, productosFetch, guardarProductos])

    
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

