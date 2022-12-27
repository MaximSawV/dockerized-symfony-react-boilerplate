import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiResult, setApiResult] = useState<string>("loading");
  const [isLoading, setIsLoading] = useState<boolean>(true);

    const tryApi = async () => {
        try {
            const response = await fetch('http://192.168.233.198/api/v1/test', {mode:'cors'});
            const data = await response.json();
            setApiResult(data["test"]);
        }
        catch (e) {
            console.log(e)
        }
    }

  useEffect(() => {
      console.log(apiResult);
      if(!"loading") {
          setIsLoading(false);
      } else {
          setIsLoading(true);
      }
  }, [apiResult])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={tryApi}>FETCH</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
