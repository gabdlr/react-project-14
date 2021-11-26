export default function validarCrearProducto(valores) {
    let errores = {};
    //Validar el nombre del producto
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    //Validar empresa
    if(!valores.empresa){
        errores.empresa = "El nombre de la empresa es obligatorio";
    }
    //Validar imagen
    if(!valores.imagenUrl){
        errores.imagenUrl = "Debe adjuntar una imagen del producto"
    } 
    //Validar url
    if(!valores.url){
        errores.url = "La url del producto es obligatoria"
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "URL no válida"
    }

    //Validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción del producto";
    }
    return errores;


}