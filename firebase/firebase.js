import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, 
    addDoc, 
    orderBy, 
    doc, 
    getDoc, 
    getFirestore, 
    getDocs,
    setDoc,
    deleteDoc, 
    query,
    where } from "firebase/firestore";
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
                    addDoc(collection(this.db, "productos"), params )
                    .then( res => {
                        
                    });              
                    } catch (e) {
                    throw Error (e);
                    }
        });   
    }
    
    //Obtener un producto por su id
    async getSingle(collectionName, id) {
        try{
            const docRef = doc(getFirestore(), collectionName, id)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            return docSnap.data();
            } else {
            return false;
            }
        } catch(error){
            throw Error(error);
        }
    }

    //Obtener todos los productos
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
                        return this.resultados = resultados;                                   
        }catch(error){
            throw Error(error);
        }
    }

    //Actualizar un producto
    async updateDoc(collectionName, id, params) {
        const docRef = doc(getFirestore(), collectionName, id);
        try{
            setDoc(docRef, params, { merge: true }).then(response => {
                //Veremos despues que hacemos con esto si es que hacemos algo                
                return true;
            });
        } catch(error){
            throw Error(error);
        }
        
    }

    //Eliminar un documento/producto
    async removeDoc(collectionName, id){
        try{
            await deleteDoc(doc(getFirestore(), collectionName, id));
            return true;
        } catch(error){
            throw Error(error);
        }
        
    }

    //Buscar un producto por su nombre
    //tal vez en el futuro el operador tambien se podria pasar por parametro
    //en el futuro en otro proyecto
    async findDoc(collectionName, field, itemName){
        try {
            const q = query(collection(getFirestore(), collectionName), where(field, "==", itemName));
            const querySnapshot = await getDocs(q);
            let resultados = [];
            querySnapshot.forEach((doc) => {
                resultados.push(
                { id: doc.id,
                ...doc.data()})
                });
                return this.resultados = resultados;   
        } catch(error){
            throw Error(error);
        }
                                             
    }
    

}
const firebase = new Firebase();
export default firebase;