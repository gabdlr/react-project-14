import React,{ useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
//UI
import Layout from '../../components/layout/Layout';
import { css } from 'styled-components';
import styled from 'styled-components';
import ImagenProducto from '../../components/ui/ImagenProducto';
import {Campo, InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
//Fechas
import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';


const ContenedorProducto = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Producto = () => {
    const { firebase, usuario } = useContext(FirebaseContext);

    //Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    //States
    const [producto, guardarProducto] = useState({});
    const [comentario, guardarComentario] = useState({
        mensaje: "",
        id:"",
        usuarioId:"",
        usuarioNombre:"",
        fecha:""
    });
    
    
    useEffect(() => {
        let productosFetch = true;
        if(id && productosFetch){
            firebase.getSingle("productos", id)
            .then( response => {
                if(!response){
                    router.push('/')
                }
                else {
                    guardarProducto(response);
                }
            });
        }
        return () => productosFetch = false;
    },[firebase, id, router]);
    const { comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, votantes, creador } = producto;
    if(Object.keys(producto).length === 0){
        return (<p>Cargando...</p>)
    }

    //Administrar y validar los votos
    const votarProducto = () => {
        if(!usuario) return;
        //Sumar el voto y obtener el nuevo total
        const nuevoTotal = votos + 1;
        //Actualizar en la bd
        //Verificar que el usuario actual no haya votado
        firebase.getSingle("productos", id)
        .then(res => {
            const votantes = res.votantes;
            const check = votantes.includes(usuario.uid);
            if(!check){
                //Guardar el voto
                firebase.updateDoc("productos", id, { "votos" : nuevoTotal, "votantes": [usuario.uid] })
                .then( res => { return guardarProducto({...producto, votos: nuevoTotal, votantes:[...votantes, usuario.uid]})
                });
            }
        });
    }

    //Comentarios
    const comentarioOnChange = e => guardarComentario({
        ...comentario,
        [e.target.name]:e.target.value
    });

    const agregarComentario = e => {
        e.preventDefault();
        if(!usuario) return;
        //Información extra al comentario
        comentario.id = uuidv4();
        comentario.usuarioId = usuario.uid;
        //Esto generaria un problema en una aplicación real ya que si el nombre de usuario es guardado 
        //como campo este quedaria hardcodeado en el objeto y no cambiaria en caso de que el usuario cambiara su nombre
        comentario.usuarioNombre = usuario.displayName;
        comentario.fecha = Date.now();

        const nuevoComentarios = [...comentarios, comentario];
        //Guardar el comentario
        firebase.updateDoc("productos", id, { "comentarios" : nuevoComentarios })
        .then( res => { return guardarProducto({...producto, comentarios: nuevoComentarios})
        });
        guardarComentario({
            mensaje: "",
            id:"",
            usuarioId:"",
            usuarioNombre:"",
            fecha:""
        })
        
    }

    //Claramente desvotar no existe pero por ahi "unvote" si 🤔
    const desvotarProducto = () => {
        if(!usuario) return;
        //Restar el voto y obtener el nuevo total
        const nuevoTotal = votos - 1;
        //Actualizar en la bd
        //Verificar que el usuario actual no haya votado
        firebase.getSingle("productos", id)
        .then(res => {
            const votantes = res.votantes;
            const check = votantes.includes(usuario.uid);
            if(check){
                //Guardar el voto
                const nuevoVotantes = votantes.filter(element => element !== usuario.uid)
                firebase.updateDoc("productos", id, { "votos" : nuevoTotal, "votantes": nuevoVotantes })
                .then( res => { return guardarProducto({...producto, votos: nuevoTotal, votantes: nuevoVotantes})
                });
            }
        });
    }

    const eliminarProducto = () => {
        if(usuario === null) return;
        if(usuario.uid !== creador.id) return;
        firebase.removeDoc("productos", id)
        .then(res => router.push('/'));
    } 
    return (
        <Layout> 
           <div className="contenedor">
                <h1 css={css`
                    text-align:center;
                    margin-top: 5rem;
                `}>
                    {nombre}
                </h1>
                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale:es})}<br/>
                        Por {creador.nombre} de {empresa}
                        </p>
                        
                        <ImagenProducto src={urlImagen} />
                        <p>{descripcion}</p>
                        { usuario && usuario.uid === creador.id ? 
                        (<Boton
                            onClick={ eliminarProducto }
                        >Eliminar Producto
                        </Boton>)
                        :null}
                        { usuario && 
                        (<>
                            <h2>Agrega tu comentario</h2>
                            <form
                                onSubmit={agregarComentario}
                            >
                                <Campo>
                                    <input
                                        value={comentario.mensaje||""}
                                        type="text"
                                        name="mensaje"
                                        onChange={ comentarioOnChange }
                                    />
                                </Campo>
                                <InputSubmit
                                    type="submit"
                                    value="Agregar comentario"
                                />
                            </form>
                        </>)}
                        <h2
                        css={css`
                            margin: 2rem 0;
                        `}
                        >Comentarios</h2>
                        {comentarios.length === 0 ? (<p>Aún no hay comentario</p>) : (
                            <ul>
                            {comentarios.map(comentario => (
                                <li key={comentario.id}
                                    css={css`
                                        border: 1px solid #e1e1e1;
                                        padding: 2rem;
                                        margin-bottom: 2rem;
                                    `}>
                                    <p>{comentario.mensaje}</p>
                                    <p>Escrito por: <span css={css`
                                        font-weight: bold;
                                    `}>
                                        {comentario.usuarioNombre}
                                    </span>, el {format(comentario.fecha, 'MM/dd/yyyy')}</p>
                                    {comentario.usuarioId === creador.id ? 
                                        (<p
                                        css={css`
                                            padding: .5rem 2rem;
                                            background-color:#DA552F;
                                            border-radius: 5px;
                                            color: #ffffff;
                                            text-transform: uppercase;
                                            font-weight: bold;
                                            display: inline-block;
                                            text-align: center;
                                        `}>
                                            Es creador
                                        </p>)
                                        : null
                                    }
                                </li>
                            ))}
                            </ul>)
                        }
                        
                    </div>
                    <aside>
                        <Boton
                            bgColor="true"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={url}
                        >Visitar URL</Boton>
                        <div
                            css={css`
                                margin-top: 5rem;
                            `}>
                            <p css={css`
                                text-align: center;

                                `}>{votos} Votos
                            </p>
                            {usuario && producto ? (
                            !votantes.includes(usuario.uid) ?
                            (<Boton
                                onClick={ votarProducto }
                            >
                                Votar
                            </Boton>)
                            :
                            (<Boton
                                onClick={ desvotarProducto }
                            >
                                Remover voto
                            </Boton>)) : null
                            }
                        </div>
                    </aside>
                </ContenedorProducto>
            </div>
        </Layout>
     );
}
 
export default Producto;