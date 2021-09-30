import firebase, { db } from './firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, addDoc, doc, updateDoc } from "firebase/firestore";
const auth = getAuth();

/////////
// CREATE
/////////
export const addRootEntity = (entity, newValues) => addDoc(collection(db, entity), newValues);

//collectionPath = [{ collection: 'rooms', id: 'hasdu9ghw9' },{collection: 'message',},]
export const addPathEntity = (collectionPath, newValues) => {
    let path;
    let idIsPresent = false;
    let newCollection;
    collectionPath.forEach(({ collection, id }, n) => {
        const base = path || db;
        if (n == 0 && !id) {
            if (!idIsPresent) console.error('La id de la colección no está presente');
            return;
        }
        if (id) {
            idIsPresent = true;
            console.log(id);
            path = base.collection(collection).doc(id);
        } else {
            newCollection = base.collection(collection).add(newValues);
        }
    });
    return newCollection;
}

///////
// READ
///////
export const getRootEntityById = async (entity, id) => {
    const docRef = doc(db, entity, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
}

//conditions format: { googleId: 'aaaaaaaa' }
export const getRootEntityByConditions = async (entity, conditions) => {
    const params = Object.entries(conditions).map(([name, value]) => where(name, '==', value));
    let result = await getDocs(query(collection(db, entity), ...params));
    return result;
};

//collectionPath = [{ collection: 'rooms', id: 'hasdu9ghw9' },{collection: 'message',},]
export const getPathEntityByConditions = (collectionPath, conditions) => {
    let path;
    let idIsPresent = false;
    return collectionPath.reduce((acc, { collection, id }, n) => {
        const base = path || db;
        if (n == 0 && !id) {
            console.log('first no id')
            if (!idIsPresent) console.error('La id de la colección no está presente');
            return;
        }
        if (id) {
            console.log('has id')
            idIsPresent = true;
            path = base.collection(collection).doc(id);
        } else {
            let result = base.collection(collection);
            Object.keys(conditions).forEach(key => {
                result = result.where(key, '==', conditions[key]);
            });
            return result.get();
        }
    }, {});
}

/////////
// UPDATE
/////////

export const updateRootEntityByFirebaseId = (entity, firebaseId, newValues) => db.collection(entity).doc(firebaseId).update(newValues);

export const updatePathEntityByConditions = (collectionPath, firebaseId, newValues) => {
    let path;
    let idIsPresent = false;
    collectionPath.forEach(({ collection, id }, n) => {
        const base = path || db;
        if (n == 0 && !id) {
            if (!idIsPresent) return;
        }
        if (id) {
            idIsPresent = true;
            path = base.collection(collection).doc(id);
        } else {
            base.collection(collection).doc(firebaseId).update(newValues);
        }
    });
}



///////////////
// LOGIN GOOGLE
///////////////
const provider = new GoogleAuthProvider();

export const getUserByEmail = (email) => getDocs(query(collection(db, 'users'), where('email', '==', email)));
export const addNewUser = (email) => addDoc(collection(db, 'users'), { email });

export const logInGoogleOrRegister = async () => {
    await signInWithPopup(auth, provider);
}

export const onAuthChange = callback => onAuthStateChanged(auth, callback);

export const findOrCreateUser = async (user) => {
    console.log(!user.isAnonymous && 'El usuario ya está logueado. Debemos ocultar el botón de login');
    const users = await getUserByEmail(user.email);
    if (users.empty) {
        const u = await addNewUser(user.email);
        return u;
    } else {
        return users.docs[0];
    }
}

/*
    Para gestionar el usuario
  useEffect( () => {
    onAuthChange( async user => {
      if (user) {
        const userData = await findOrCreateUser(user);
        setState({ ...state, user: userData });
      } else {
        setState({ ...state, user: null });
      }
    });
  }, []);
*/