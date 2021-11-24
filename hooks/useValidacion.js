import React, { useState, useEffect } from 'react';


const useValidacion = (stateInicial, validar, fn) => {
    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores) {
                fn(); //Fn igual a la funcion que se pasa en el componente
            }
            setSubmitForm(false);
        }
    }, [errores, fn, submitForm]);

    //Función que se ejecuta conforme el usuario escribe algo

    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
            });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true)
    }

    //const 
    const handleBlur = () => {
        const erroresValidacion = validar(errores);
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}
 
export default useValidacion;