import { Button, Input } from 'antd';
import { useEffect, useState } from "react";
import './App.css';
import {
  addMoment,
  getMyLocations,
  getMyMoments,
  getOccupiedLocations,
  getRomanceByLocation
} from "./requests/LoveCounter";

const App: React.FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
  const [addMomentX, setAddMomentX] = useState<number>(0)
  const [addMomentY, setAddMomentY] = useState<number>(0)
  const [romance, setRomance] = useState<string | null>(null)
  const [romanceX, setRomanceX] = useState<number>(0)
  const [romanceY, setRomanceY] = useState<number>(0)

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
            <Input size="large" placeholder="x" onChange={e => setAddMomentX(parseInt(e.target.value))} />
            <Input size="large" placeholder="y" onChange={e => setAddMomentY(parseInt(e.target.value))}/>
            <Input size="large" placeholder="message" onChange={e => setRomance(e.target.value)}/>
            <Button type="primary"
                    onClick={() => {addMoment(ethereumAccount, addMomentX, addMomentY, romance)}}>
              Add a Moment
            </Button>
          </p>

          <p>
            <Button type="primary"
                    onClick={() => { getMyMoments(ethereumAccount).then(r => alert(JSON.stringify(r))) }}>
              Get My Moments
            </Button>
          </p>

          <p>
            <Button type="primary"
                    onClick={() => { getMyLocations(ethereumAccount).then(r => alert(JSON.stringify(r))) }}>
              Get My Locations
            </Button>
          </p>

          <p>
            <Button type="primary"
                    onClick={() => { getOccupiedLocations(ethereumAccount).then(r => alert(JSON.stringify(r))) }}>
              Get Occupied Locations
            </Button>
          </p>

          <p>
            <Input size="large" placeholder="x" onChange={e => setRomanceX(parseInt(e.target.value))} />
            <Input size="large" placeholder="y" onChange={e => setRomanceY(parseInt(e.target.value))}/>
            <Button type="primary"
                    onClick={() => {getRomanceByLocation(ethereumAccount, romanceX, romanceY).then(r => alert(JSON.stringify(r)))}}>
              Get Romance by Location
            </Button>
          </p>
        </header>
      </div>
  );
}

export default App;