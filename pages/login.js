import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { css } from 'styled-components';
import Router from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import firebase from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const Login = () => {
    const STATE_INICIAL = {
        email: '',
        password: ''
    }

    
    const [error, guardarError] = useState(false);
    const { valores, errores,  
    handleSubmit, handleChange } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
    
    const { email, password } = valores;



    async function iniciarSesion() {
    
        const response = await firebase.login(email, password);
        console.log(response);
        if(response){
            Router.push('/');
        } else {
            guardarError(errores.login = "Datos de autenticación incorrectos");
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
            >Iniciar sesión</h1>
            <Formulario 
                onSubmit={handleSubmit}
                noValidate
            >

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
                {errores.login && <Error>{errores.login}</Error>}
                <InputSubmit 
                    type="submit" 
                    value="Iniciar sesión"
                />       
            </Formulario>
        </>
        </Layout>
    </div>
        );
    
}

export default Login;