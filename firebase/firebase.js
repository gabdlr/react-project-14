import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, setDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import firebaseConfig from './config';
import { v4 as uuidv4 } from 'uuid';

//As this course was concived in a previous version of firebase
//the class would not make a lot of sense now, but I'm going
//to skip the refactoring step for now
class Firebase {
    constructor(){
        initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        this.storage = getStorage(initializeApp(firebaseConfig));
        this.urlImagen = "";
        this.response = (res) => {this.urlImagen = res;}
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

    crearProducto(params, file){
        if(!file) return;
        const storageRef = ref(this.storage, '/images/' + uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", null,
        (err) => { 
                throw Error(err) 
            }, 
            async () => {
                const response = getDownloadURL(uploadTask.snapshot.ref); 
                this.imgUrl = await response;
                try {
                    params.urlImagen = this.imgUrl
                    addDoc(collection(this.db, "productos"), params );
                    return true
                    } catch (e) {
                    throw Error (e);
                    }
            }
        );
         
    }
    
}
const firebase = new Firebase();
export default firebase;