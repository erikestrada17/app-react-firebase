import React, {useEffect} from 'react';
import './App.css';
import { collection, getDoc } from 'firebase/firestore';
import db from './firebase/firebaseConfig';

function App() {
  useEffect(() => {
    const obtenerDatos = async() => {
      const datos = await getDoc(collection(db, 'locales'));
      datos.forEach(element => {
        console.log(element.data());
      });
      
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
