import { collection, getDocs } from "firebase/firestore";
import db from './firebaseConfig';

const read = async (entidad) => {
    const datos = await getDocs(collection(db, entidad));
    console.log('prueba de read()')
    datos.forEach((documento) => {
        console.log(documento.data());
    });
}

const getLocales = async() => {
        const datos = await getDocs(collection(db, 'locales'));
        console.log('prueba de getLocales')
        datos.forEach((documento) => {
            console.log(documento.data());
        });
}

export {read, getLocales}