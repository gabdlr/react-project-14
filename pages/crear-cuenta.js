import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { css } from 'styled-components';
import Router from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import firebase from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const CrearCuenta = () => {

    const STATE_INICIAL = {
        nombre: '',
        email: '',
        password: ''
    }
    
    const [error, guardarError] = useState(false);
    const { valores, errores,  
    handleSubmit, handleChange } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
    
    const { nombre, email, password } = valores;

    async function crearCuenta() {
     
        const response = await firebase.registrar(nombre,email,password);
        if(response){
            Router.push('/');
        } else {
           guardarError(errores.usado = "La dirección de correo ya ha sido utilizada");
        }
        
    }

    return ( 
    <div>
        <Layout>
        <>
            <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
            >Crear cuenta</h1>
            <Formulario 
                onSubmit={handleSubmit}
                noValidate
            >
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Tu email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.email && <Error>{errores.email}</Error>}
                <Campo>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.password && <Error>{errores.password}</Error>}
                {errores.usado && <Error>{errores.usado}</Error>}
                <InputSubmit 
                    type="submit" 
                    value="Crear cuenta"
                />       
            </Formulario>
        </>
        </Layout>
    </div>
     );
}
 
export default CrearCuenta;