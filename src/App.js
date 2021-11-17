import React, {useEffect} from 'react';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase/firebaseConfig';
import crud2 from './firebase/crud2';
/*import {crud} from './firebase/crud';*/

const App = () => {
  useEffect(() => {
    
    const docE = null
    const obtenerDatos = async() => {
      console.log('prueba de obtenerDatos');
      const datos = await getDocs(collection(db, 'prueba'));
      datos.forEach((documento) => {
        console.log(documento.data());
        /*docE = documento.data()*/
      });
    }

    const docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      numberExample2: 3.14159265,
      numberExample3: 3.14159265,
      numberExample4: 3.14159265
    };
    
    obtenerDatos();

    //let coleccion = {}
    //coleccion = crud2.read('locales')
    //let objeto = docData
    
    //console.log(objeto)
    /*crud2.create('test', objeto) /*buscar que valores acepta addDoc() */
    /*console.log(docE.id)*/
    /*crud2.update('prueba', docE.id, docData)*/
   // crud2.read('locales')
    //console.log("coleccion:")
    //console.log(coleccion)
    let lista = crud2.read('locales')
    console.log("LLLLLLLLLLLLLLLLLLLista "+ lista)
    console.log(lista)


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