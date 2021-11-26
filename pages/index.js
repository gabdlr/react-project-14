import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Layout from '../components/layout/Layout';

export default function Home() {
  
  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(()=> {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', )
    }
    obtenerProductos()
  })
  return (
    <div>
        
        <Layout>

        </Layout>
    </div>
  )
}
