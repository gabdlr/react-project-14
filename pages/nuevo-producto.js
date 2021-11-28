import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { css } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import { FirebaseContext } from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const NuevoProducto = () => {

    const STATE_INICIAL = {
        nombre: '',
        empresa: '',
        urlImagen: '',
        url: '',
        descripcion: ''
    }
    
    //State de la imagen
    const [ img, guardarImg ] = useState({});
    const { valores, errores,  
    handleSubmit, handleChange } = useValidacion(STATE_INICIAL, validarCrearProducto,  crearProducto);
    
    const { nombre, empresa, urlImagen, url, descripcion } = valores;

    //Hook de routing para redireccionar (esto lo habiamos hecho con Router.push🤷‍♂️)

    const router = useRouter();

    
    //Context con las operaciones CRUD de firebase
    const {usuario, firebase} = useContext(FirebaseContext);

    async function crearProducto() {
        if(!usuario){
            router.push('/');
        }

        //crear el nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        //Insertarlo en la base de datos

        async function dispatch() { 
            await firebase.crearProducto(producto, img);
        }
        dispatch();
        Router.push('/');
    }

    //Funcion que guarda la imagen y hace el update para la validacion
    const loadedImage = (e) => {    guardarImg(e.target.files[0]); 
                                    handleChange({"target": {"name":"imagenUrl", "value":"loaded"}}); }
    return ( 
    <div>
        <Layout>
        <>
            <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
            >Nuevo producto</h1>
            <Formulario 
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset>
                    <legend>Información general</legend>
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre del producto"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}
                <Campo>
                    <label htmlFor="empresa">Empresa</label>
                    <input
                        type="text"
                        id="empresa"
                        placeholder="Empresa o compañia"
                        name="empresa"
                        value={empresa}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error>}
                <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <input
                        accept="image/*"
                        type="file"
                        id="imagen"
                        name="imagen"
                        //Pasan varias cosas, primero, pienso los comentarios en español y en ingles y ya no se en que idioma escribirlos
                        //segundo esto es feo, pero indoloro y eficiente
                        onChange={e => loadedImage(e) }
                        
                    />
                </Campo>
                {errores.imagenUrl && <Error>{errores.imagenUrl}</Error>}
                <Campo>
                    <label htmlFor="url">Url</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="Url del producto"
                        value={url}
                        onChange={handleChange}
                    />
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}
                </fieldset>
                <fieldset>
                    <legend>Sobre tu producto</legend>
                <Campo>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                />
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
                </fieldset> 
                <InputSubmit 
                    type="submit" 
                    value="Crear producto"
                />      
            </Formulario>
        </>
        </Layout>
    </div>
     );
}
 
export default NuevoProducto;