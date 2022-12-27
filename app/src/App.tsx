import React, {useState} from 'react';
import './App.css';
import {Button} from "antd";

function App() {

  const [apiResult, setApiResult] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    const tryApi = async () => {
        setApiResult(null);
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost/api/v1/test', {mode:'cors'});
            const data = await response.json();
            setTimeout(() => {
                setApiResult(data["test"]);
                setIsLoading(false);
            }, 1000);
        }
        catch (e) {
            console.log(e)
        }
    }

  return (
    <div>
        <Button type={"primary"} size={"large"} loading={isLoading} onClick={tryApi}>Fetch Data</Button>
        <h1>{apiResult}</h1>
    </div>
  );
}

export default App;
