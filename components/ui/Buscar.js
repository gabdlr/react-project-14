import React, { useState } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height:3rem;
    width:3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: transparent;
    border: none;
    &:hover{
        cursor: pointer;
    }
`
const Buscar = () => {

    const [busqueda, guardarBusqueda] = useState('');
    const buscarProducto = e => {
        e.preventDefault();
        if(busqueda.trim === '') return;
        Router.push({
            pathname: '/buscar',
            query: { q : busqueda}
        })
    }
    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit= {buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="Buscar productos"
                onChange={e => guardarBusqueda(e.target.value)}
            >

            </InputText>
            <InputSubmit 
                type="submit"
            >
                
            </InputSubmit>
        </form>
     );
}
 
export default Buscar;