import Header from './Components/Header/Header'
import './app.css'
import NavBar from './Components/NavBar/NavBar'
import {createContext, useState} from 'react'

export const UpdateAppContext = createContext(true);


function App() {

  const [updateApp, setUpdateApp] = useState(false);

  // Local Storage's copy of past bounties/time
  // const pastHistory = localStorage.getItem('BountyHistory');
  // const history = pastHistory ? new Map(JSON.parse(pastHistory)) : false;


  const pastHistory = localStorage.getItem('History');
  const history = pastHistory ? new Map(JSON.parse(pastHistory)) : new Map();


  // Check how much local storage is used:
  // https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage/15720835#15720835

  return (
    <div className="app-container">
      <UpdateAppContext.Provider value={{updateApp, setUpdateApp}}>
        <NavBar history={history}/>
        <Header />
      </UpdateAppContext.Provider>
    </div>
  );
}

export default App;
