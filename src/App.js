import React, {useEffect} from 'react';
import './App.css';
import { collection, getDoc, doc } from 'firebase/firestore';
import db from './firebase/firebaseConfig';

function App() {
  useEffect(() => {
    
    const dbRef = collection(db, "locales");
    const obtenerDatos = async() => {
      const docRef = doc(dbRef);
      const docSnap = await getDoc(docRef);
      // const dbRef = collection(db, 'locales')
      // const datos = await getDoc(dbRef);
      // datos.forEach(element => {
      //   console.log(element.data());
      // });
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }
    
    obtenerDatos();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h4>Firebase 9!</h4>
      </header>
    </div>
  );
}

export default App;
