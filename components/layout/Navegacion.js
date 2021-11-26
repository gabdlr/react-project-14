import React, { useContext } from 'react';
import Link from 'next/dist/client/link';
import styled from 'styled-components';
import { FirebaseContext } from '../../firebase';

const Nav = styled.nav`
    padding-left: 2rem;
    a{
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT sans', sans-serif;
        text-decoration: none;
        &:last-of-type{
            margin-right: 0;
    }
}`
const Navegacion = () => {
    const {usuario} = useContext(FirebaseContext);
    return ( 
        <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            {usuario && (<Link href="/nuevo-producto">Nuevo Producto</Link>)}
        </Nav>
     );
}
 
export default Navegacion;