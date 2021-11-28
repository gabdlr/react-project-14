import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, orderBy, setDoc, doc, getFirestore, getDocs, query } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import firebaseConfig from './config';
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'next/router';

//As this course was concived in a previous version of firebase
//the class would not make a lot of sense now, but I'm going
//to skip the refactoring step for now
class Firebase {
    constructor(){
        initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        this.storage = getStorage(initializeApp(firebaseConfig));
        this.resultados = [];
    }

    //Registra a un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = createUserWithEmailAndPassword( this.auth, email, password);
        try{
            updateProfile( (await nuevoUsuario).user, {
                displayName: nombre
            });
            return true;
        } catch(error) {
            return false;
        }
        
    }

    //Iniciar sesión
    async login(email, password){
        try{
            const response = await signInWithEmailAndPassword(this.auth, email, password);
            return response;
        }catch(error){
            return false;
        }
        
    }

    //Cerrar sesion

    async cerrarSesion() {
        await this.auth.signOut();
    }

    //Super feo la adaptación ya cuando haga un nuevo proyecto construire esto mas bonito
    //Crear un producto

    async crearProducto(params, file){
        if(!file) return;
        const storageRef = ref(this.storage, '/images/' + uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
        "state_changed", 
        null,
        (err) => { 
                throw Error(err) 
            }, 
        async () => {
                const response = await getDownloadURL(uploadTask.snapshot.ref); 
                const imgUrl = response;
                try {
                    params.urlImagen = imgUrl;
                    await addDoc(collection(this.db, "productos"), params );                    
                    } catch (e) {
                    throw Error (e);
                    }
        });
    }

    async getAll(collectionName, order = false){
        try{
            const q = query(collection(this.db, collectionName), orderBy(order[0], order[1]));
            const querySnapshot = await getDocs(q);
            let resultados = [];
            querySnapshot.forEach((doc) => {
                        resultados.push(
                        { id: doc.id,
                        ...doc.data()})
                        });
                        return resultados;                                   
        }catch(error){
            throw Error(error);
        }
    }
    
}
const firebase = new Firebase();
export default firebase;