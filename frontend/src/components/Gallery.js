import React from "react";

function Gallery({ nfts }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {nfts.map((nft) => (
        <div key={nft.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>NFT #{nft.id}</h3>
          <img src={nft.uri.replace("ipfs://", "https://ipfs.io/ipfs/")} alt={`NFT ${nft.id}`} width="200" />
          <p>{nft.uri}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
