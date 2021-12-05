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
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/populares"><a>Populares</a></Link>
            {usuario && (<Link href="/nuevo-producto"><a>Nuevo Producto</a></Link>)}
        </Nav>
     );
}
 
export default Navegacion;