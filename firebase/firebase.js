import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
    constructor(){
        initializeApp(firebaseConfig);
        this.auth = getAuth();
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
}
const firebase = new Firebase();
export default firebase;