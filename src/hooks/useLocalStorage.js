import { useState, useEffect } from "react";


// Hook personalizado para manejar localStorage, esto se logra con useState y 
// useEffect para sincronizar el estado con localStorage, sirve para guardar 
// los datos del CV en el navegador y mantenerlos entre sesiones
function useLocalStorage(key, initialValue) {


    // busca informacon guardada en localStorage, si existe la devuelve, sino usa el valor inicial
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);

        return saved
        ? JSON.parse(saved)
        : initialValue;
    });


    // guarda en localStorage cada vez que cambia el valor
    useEffect(() => {
        localStorage.setItem(
        key,
        JSON.stringify(value)
        );
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;