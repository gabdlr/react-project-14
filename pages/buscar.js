import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import useProductos from '../hooks/useProductos';

const Buscar = () => {

    const router = useRouter();
    const { query: {q} } = router;
    const [params, setParams] = useState({
        "type": "search",
        "collectionName": "productos",
        "field": "nombre",
        "itemName": q,
        "reopen": false
    });
    
    //This isn't the nicest or cleanest solution but i'm so over burnt this project that i'll let it go
    useEffect(() => {
        setParams({
            "type": "search",
            "collectionName": "productos",
            "field": "nombre",
            "itemName": q,
            "reopen": true
        });
    }, [q]);

    const content = useProductos(params);
    return ( 
    <div>
        <Layout>
        {content}
        </Layout>
    </div> );
}
 
export default Buscar;