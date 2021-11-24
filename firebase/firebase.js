import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './config';

//As this course was concived in a previous version of firebase
//the class would not make a lot of sense now, but I'm going
//to skip the refactoring step for now
class Firebase {
    constructor(){
        initializeApp(firebaseConfig);
        this.auth = getAuth() ;
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
}
const firebase = new Firebase();
export default firebase;