import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK, UX_MODE, Web3AuthNoModalOptions } from "@web3auth/base";
import { AuthAdapterOptions } from "@web3auth/auth-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";



const clientId = "BKqDHWzg5xiaFDNMphjkiRBG9nV-pVzajM08a0ZhSN8oomM-w5JE92TmVhAXPm8A23LFUEiIXgghvaAE0UCI4nk"; // get from https://dashboard.web3auth.io

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum Sepolia",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

export const web3AuthConfig: Web3AuthNoModalOptions = {
  clientId,
  chainConfig: chainConfig,
  sessionTime: 3600*2, // (tính bằng giây)
  privateKeyProvider,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  // web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
};


export const authAdapterConfig: AuthAdapterOptions ={
    adapterSettings: {
      uxMode: UX_MODE.REDIRECT,
    },
};
  

const chainConfigSol = {
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  chainId: "0x67",
  rpcTarget: "https://api.devnet.solana.com",
  displayName: "Solana Devnet",
  blockExplorerUrl: "https://explorer.solana.com/?cluster=devnet",
  ticker: "SOL",
  tickerName: "Solana",
  //logo: "",
}

const privateKeyProviderSol = new SolanaPrivateKeyProvider({ config: { chainConfig: chainConfigSol } });
export const web3AuthConfigSol: Web3AuthNoModalOptions = {
  clientId,
  chainConfig: chainConfigSol,
  sessionTime: 3600*2,
  privateKeyProvider: privateKeyProviderSol,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
  //web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
};



