import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Gallery from "./components/Gallery";
import contractABI from "./utils/contractABI.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
  const [account, setAccount] = useState(null);
  const [nfts, setNfts] = useState([]);

  async function connectWallet() {
    if (!window.ethereum) return alert("MetaMask not found!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }

  async function loadNFTs() {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const total = await contract.nextTokenId();
    const items = [];
    for (let i = 0; i < total; i++) {
      const tokenURI = await contract.tokenURI(i);
      items.push({ id: i, uri: tokenURI });
    }
    setNfts(items);
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  return (
    <div className="App">
      <h1>🎨 NFT Gallery</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}
      <Gallery nfts={nfts} />
    </div>
  );
}

export default App;
