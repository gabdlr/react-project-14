import React from 'react';
import Link from 'next/dist/client/link';
import styled from 'styled-components';

const Nav = styled.nav`
    padding-left: 2rem;
    a{
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT sans', sans-serif;
        &:last-of-type{
            margin-right: 0;
    }
}`
const Navegacion = () => {
    return ( 
        <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            <Link href="/nuevo-producto">Nuevo Producto</Link>
        </Nav>
     );
}
 
export default Navegacion;