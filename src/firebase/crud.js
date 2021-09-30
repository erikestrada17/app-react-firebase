import { collection, getDocs, query, where, addDoc, doc, updateDoc } from "firebase/firestore";
import db from './firebaseConfig';

import { store } from './firebaseconfig'

const db = store

class CRUD {
    getAll() {
        return db;
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