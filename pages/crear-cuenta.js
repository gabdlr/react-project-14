import React from 'react';
import Layout from '../components/layout/Layout';
import { css } from 'styled-components';
import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';
const CrearCuenta = () => {
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
            <Formulario action="">
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        name="nombre"
                    />
                </Campo>
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Tu email"
                        name="email"
                    />
                </Campo>
                <Campo>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        name="password"
                    />
                </Campo>
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