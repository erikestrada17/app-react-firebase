import React, {useEffect} from 'react';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase/firebaseConfig';
import crud from './firebase/crud';

const App = () => {
  useEffect(() => {
    
    const obtenerDatos = async() => {
      const datos = await getDocs(collection(db, 'locales'));
      datos.forEach((documento) => {
        console.log(documento.data());
      });
    }
    
    obtenerDatos();
    crud.getLocales();
    console.log('p1');
    crud.getLocales();
    console.log('p1');


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

/*Cloud Firestore:Reglas (recordar actualizar)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 10, 22);
    }
  }
}
*/