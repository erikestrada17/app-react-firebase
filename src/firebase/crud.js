import { collection, getDocs, query, where, addDoc, doc, updateDoc } from "firebase/firestore";
import db from './firebaseConfig';

class CRUD {
    getAll() {
        return db;
    }

    getLocales() {
        const obtenerDatos = async() => {
            const datos = await getDocs(collection(db, 'locales'));
            datos.forEach((documento) => {
                console.log(documento.data());
            });
        }
    }

    create(name) {
        return db.add(name);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new CRUD();