import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Content, Header} from "antd/lib/layout/layout";
import {Button, Spin} from "antd";

function App() {

  const [apiResult, setApiResult] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    const tryApi = async () => {
        setApiResult(null);
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.233.198/api/v1/test', {mode:'cors'});
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
