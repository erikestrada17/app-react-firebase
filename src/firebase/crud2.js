import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import db from './firebaseConfig';


class crud {
    create = (entidad, objeto) => addDoc(collection(db, entidad), objeto)

    read = async (entidad) => { //getCollection() = read()
        const datos = await getDocs(collection(db, entidad))
        console.log('prueba de read('+'"'+ entidad +'"'+')')
        let col = [];
        datos.forEach((documento) => {
            col.push(documento.data())
        })
        return col
    }

    read = async (entidad, idDoc) => { //getDoc() = read()
        const datos = await getDocs(collection(db, entidad))
        console.log('prueba de read('+'"'+ entidad +'"'+')')
        datos.forEach((documento) => {
            console.log(documento.data())/*test. mod*/
            if(documento.data().id == idDoc) return documento.data()
        })
    }

    update = (entidad, idDoc, objeto) => db.collection(entidad).doc(idDoc).update(objeto)

    delete = async (entidad, documento) => await deleteDoc(doc(db, entidad, documento))
}

export default new crud();