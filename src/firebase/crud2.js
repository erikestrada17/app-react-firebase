import { collection, getDocs, addDoc, doc, updateDoc} from "firebase/firestore";
import db from './firebaseConfig';


class crud {

    /*create = (entidad, valores) => addDoc(collection(db, entidad), valores)/*valores=>objetos*/
    create = (entidad, objeto) => addDoc(collection(db, entidad), objeto)

    update = (entidad, idDoc, objeto) => db.collection(entidad).doc(idDoc).update(objeto)

    /*delete*/

    read = async (entidad) => {
        const datos = await getDocs(collection(db, entidad))
        console.log('prueba de read('+'"'+ entidad +'"'+')')
        datos.forEach((documento) => {
            console.log(documento.data());/*test. mod*/
        })
    }
    
    getLocalesTest = async() => {
        const datos = await getDocs(collection(db, 'locales'));
        console.log('prueba de getLocalesTest')
        datos.forEach((documento) => {
            console.log(documento.data());
        });
    }

    getLoc() {
        console.log('prueba de getLoc')
        const datos = getDocs(collection(db, 'locales'));
        datos.forEach((documento) => {
            console.log(documento.data());
        });
    }
    // // getAll() {
    // //     return db;
    // // }

    // create(name) {
    //     return db.add(name);
    // }

    // update(id, value) {
    //     return db.doc(id).update(value);
    // }

    // delete(id) {
    //     return db.doc(id).delete();
    // }
}

export default new crud();