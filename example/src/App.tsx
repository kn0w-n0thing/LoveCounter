import { Button, Input } from 'antd';
import { useEffect, useState } from "react";
import './App.css';
import { addMoment, getMoments } from "./requests/LoveCounter";

const App: React.FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
  const [locationX, setLocationX] = useState<number>(0)
  const [locationY, setLocationY] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if((window as any).ethereum){
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  },[]);

  //Does the User have an Ethereum wallet/account?
  async function connectMetamaskWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts : string[]) => {
          setEthereumAccount(accounts[0]);
        })
        .catch((error: any) => {
          alert(`Something went wrong: ${error}`);
        });
  }

  if (ethereumAccount === null) {
    return (
        <div className="App App-header">
          {
            isMetamaskInstalled ? (
                <div>
                  <button onClick={connectMetamaskWallet}>Connect Your Metamask Wallet</button>
                </div>
            ) : (
                <p>Install Your Metamask wallet</p>
            )
          }

        </div>
    );
  }

  return (
      <div className="App">
        <header className="App-header">
          <p>
            ETH wallet connected as: {ethereumAccount}
          </p>
          <p>
            Please input a romance moment:
          </p>
          <p>
            <Input size="large" placeholder="x" onChange={e => setLocationX(parseInt(e.target.value))} />
            <Input size="large" placeholder="y" onChange={e => setLocationY(parseInt(e.target.value))}/>
            <Input size="large" placeholder="message" onChange={e => setMessage(e.target.value)}/>
          </p>
          <p>
            <Button type="primary"
                    onClick={() => {addMoment(ethereumAccount, locationX, locationY, message)}}>
              Submit
            </Button>
          </p>

          <p>
            <Button type="primary"
                    onClick={() => { getMoments(ethereumAccount).then(r => alert(r)) }}>
              Get Moments
            </Button>
          </p>
        </header>
      </div>
  );
}

export default App;