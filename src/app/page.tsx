'use client'

import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import "../App.css";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { web3AuthConfig, authAdapterConfig } from "../config/web3auth";

//-import { metamaskAdapter } from "../config/web3auth";
import { getInjectedAdapters } from "@web3auth/default-evm-adapter";
import { getInjectedAdapters as getInjectedAdaptersSol } from "@web3auth/default-solana-adapter";
import { web3AuthConfigSol } from "../config/web3auth";


import type { NextPage } from "next";

// EVM
import Web3 from "web3";

import StartkNetRPC from "../RPC/startkNetRPC"; // for using starkex
import EthereumRPC from "../RPC/ethRPC-web3"; // for using web3.js
import SolanaRPCfromEth from "../RPC/solanaRPCfromEth"; // for using solana
import TezosRPC from "../RPC/tezosRPC"; // for using tezos
import PolkadotRPC from "../RPC/polkadotRPC"; // for using polkadot
import NearRPC from "../RPC/nearRPC";
import SolanaRPC from "../RPC/solanaRPC";

//const Home: NextPage = () => {
const App: NextPage = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedInGG, setLoggedInGG] = useState<boolean | null>(false);
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);

  // thử tạo thêm một new web3auth nữa cho metamask
  const [web3authMetamask, setWeb3authMetamask] = useState<Web3AuthNoModal | null>(null);
  const [providerMetamask, setProviderMetamask] = useState<IProvider | null>(null);
  const [loggedInMetamask, setLoggedInMetamask] = useState<boolean | null>(false);
  // cho phantom
  const [web3authPhantom, setWeb3authPhantom] = useState<Web3AuthNoModal | null>(null);
  const [providerPhantom, setProviderPhantom] = useState<IProvider | null>(null);
  const [loggedInPhantom, setLoggedInPhantom] = useState<boolean | null>(false);

  const [web3authInUse, setWeb3authInUse] = useState<Web3AuthNoModal | null>(null);
  const [providerInUse, setProviderInUse] = useState<IProvider | null>(null);


  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthNoModal(web3AuthConfig);
        setWeb3auth(web3auth);

        const authAdapter = new AuthAdapter(authAdapterConfig);
        web3auth.configureAdapter(authAdapter);
        
        await web3auth.init();

        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedInGG(true);
          setWeb3authInUse(web3auth);
          setProviderInUse(provider);
        }


        //-------------
        const web3authMetamask = new Web3AuthNoModal(web3AuthConfig);
        setWeb3authMetamask(web3authMetamask);

        const adaptersMetamask = await getInjectedAdapters({ options: web3AuthConfig });
        // console.log(adaptersMetamask);
        const metamaskAdapter = adaptersMetamask.find((e) => e.name == "metamask");
        if (metamaskAdapter) {
          try {
            web3authMetamask.configureAdapter(metamaskAdapter);
            await web3authMetamask.init();
            setProviderMetamask(web3authMetamask.provider);

            if (web3authMetamask.connected) {
              setLoggedInMetamask(true);
              setWeb3authInUse(web3authMetamask);
              setProviderInUse(providerMetamask);
            }
            // console.log(web3authMetamask.connected);

            if (!web3authMetamask.connected) {
              try {
                // console.log(metamaskAdapter);
                const metamaskAdapterAccCon = adaptersMetamask.find((e) => e.name == "metamask") as any;
                const injectedProvider = metamaskAdapterAccCon?.injectedProvider;
                // // console.log(injectedProvider);
                //const accounts = injectedProvider?._state?.accounts;
                //console.log(accounts);
                //console.log(accounts?.length);
                // console.log(injectedProvider?.selectedAddress);
                if (injectedProvider?.selectedAddress != null && injectedProvider?.selectedAddress != undefined) {
                  const web3authProviderMetamask = await web3authMetamask.connectTo("metamask");
                  setProviderMetamask(web3authProviderMetamask);
                
                }
              } catch (error) {
                console.error(error);
              }
            }
            if (web3authMetamask.connected) {
              setLoggedInMetamask(true);
              setWeb3authInUse(web3authMetamask);
              setProviderInUse(providerMetamask);
            }

          }catch (error) {
            console.error("Error initializing MetaMask adapter:", error);
          }
        } else {
          console.warn("MetaMask adapter not found. Please ensure MetaMask is installed and available.");
        }
        //---
        const web3authPhantom = new Web3AuthNoModal(web3AuthConfigSol);
        setWeb3authPhantom(web3authPhantom);

        const adaptersPhantom = await getInjectedAdaptersSol({ options: web3AuthConfigSol });
        // console.log(adaptersPhantom);
        const phantomAdapter = adaptersPhantom.find((e) => e.name == "phantom");
        if (phantomAdapter) {
          try {
            web3authPhantom.configureAdapter(phantomAdapter);

            await web3authPhantom.init();
            setProviderPhantom(web3authPhantom.provider);
            
            
            // console.log(phantomAdapter); // can not find any thing to know does it actually connected or not


            if (web3authPhantom.connected) {
              setLoggedInPhantom(true);
              setWeb3authInUse(web3authPhantom);
              setProviderInUse(providerPhantom);
            }  

            if (!web3authPhantom.connected) {
              try {
                const web3authProviderPhantom = await web3authPhantom.connectTo("phantom");
                setProviderPhantom(web3authProviderPhantom);
              } catch (error) {
                console.error("sorry, keep going. ", error);
                //setProviderPhantom(web3authPhantom.provider);
              }
            }
            if (web3authPhantom.connected) {
              setLoggedInPhantom(true);
              setWeb3authInUse(web3authPhantom);
              setProviderInUse(providerPhantom);
            }
          }catch (error) {
            console.error("Error initializing Phantom adapter:", error);
          }
        } else {
          console.warn("Phantom adapter not found. Please ensure Phantom is installed and available.");
        }
        //--------------

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const getAllAccounts = async () => {
    const output: string[] = [];
    if (loggedInGG) {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }
      // EVM chains
      // const polygon_address = await getPolygonAddress();
      // const bnb_address = await getBnbAddress();
  
      const rpcETH = new EthereumRPC(provider!);
      const privateKey = await rpcETH.getPrivateKey();
      //const privateKey = await ethRPC.getGeneralPrivateKey();
  
      //const tezosRPC = new TezosRPC(privateKey);
      const solanaRPC = new SolanaRPCfromEth(privateKey);
      // const polkadotRPC = new PolkadotRPC(privateKey);
      // const starkNetRPC = new StartkNetRPC(privateKey);
      // const nearRPC = new NearRPC(provider!);
  
      const eth_address = await rpcETH.getAccounts();
      const solana_address = await solanaRPC.getAccounts();
      // const tezos_address = await tezosRPC.getAccounts();
      // const starknet_address = await starkNetRPC.getAccounts();
      // const polkadot_address = await polkadotRPC.getAccounts();
      // const near_address = await nearRPC.getAccounts();
      
      output.push("On Google Wallet: ");
      output.push("Ethereum Address: " + eth_address,);
      output.push("Solana Address: " + solana_address);
      output.push("---");
    }

    if (loggedInMetamask) {
      if (!providerMetamask) {
        uiConsole("provider not initialized yet");
        return;
      }
      const rpcETH = new EthereumRPC(providerMetamask!);
      const eth_address = await rpcETH.getAccounts();
      output.push("On MetaMask Wallet: ");
      output.push("Ethereum Address: " + eth_address);
      output.push("---");
    }

    if (loggedInPhantom) {
      if (!providerPhantom) {
        uiConsole("provider not initialized yet");
        return;
      }
      const rpcSol = new SolanaRPC(providerPhantom!);
      const sol_address = await rpcSol.getAccounts();
      output.push("On Phantom Wallet: ");
      output.push("Solana Address: " + sol_address.toString());
      output.push("---");
    }

    uiConsole( 
      output
      // "Polygon Address: " + polygon_address,
      // "BNB Address: " + bnb_address,
      //"Ethereum Address: " + eth_address,
      //"Solana Address: " + solana_address,
      // "Near Address: " + near_address?.["Account ID"],
      // "Tezos Address: " + tezos_address,
      // "StarkNet Address: " + starknet_address,
      // "Polkadot Address: " + polkadot_address
    );
  };

  const getAllBalances = async () => {
    const output: string[] = [];
    if (loggedInGG) {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }
  
      const ethRPC = new EthereumRPC(provider!);
      const privateKey = await ethRPC.getPrivateKey();
      //const privateKey = await ethRPC.getGeneralPrivateKey();
  
      //const tezosRPC = new TezosRPC(privateKey);
      const solanaRPC = new SolanaRPCfromEth(privateKey);
      //const polkadotRPC = new PolkadotRPC(privateKey);
  
      const eth_balance = await ethRPC.getBalance();
      const solana_balance = await solanaRPC.getBalance();
      //const tezos_balance = await tezosRPC.getBalance();
      //const polkadot_balance = await polkadotRPC.getBalance();

      output.push("On Google Wallet: ");
      output.push("Ethereum sepolia Balance: " + eth_balance);
      output.push("Solana devnet Balance: " + solana_balance);
      output.push("---");
    }

    if (loggedInMetamask) { 
      if (!providerMetamask) {
        uiConsole("provider not initialized yet");
        return;
      }
      const ethRPC = new EthereumRPC(providerMetamask!);
      const eth_balance = await ethRPC.getBalance();

      output.push("On MetaMask Wallet: ");
      output.push("Ethereum sepolia Balance: " + eth_balance);
      output.push("---");
    }

    if (loggedInPhantom) { 
      if (!providerPhantom) {
        uiConsole("provider not initialized yet");
        return;
      }
      const solRPC = new SolanaRPC(providerPhantom!);
      const sol_balance = await solRPC.getBalance();

      output.push("On Phantom Wallet: ");
      output.push("Solana devnet Balance: " + sol_balance);
      output.push("---");
    }


    uiConsole(
      output
      // "Ethereum sepolia Balance: " + eth_balance,
      // "Solana devnet Balance: " + solana_balance,
    );
  };

  const loginGG = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    setLoggedInGG(true);
    setWeb3authInUse(web3auth);
    setProviderInUse(provider);
    uiConsole("Logged in Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3authInUse) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3authInUse.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3authInUse) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3authInUse.getUserInfo();
    uiConsole(user);
  };

  const logoutGG = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedInGG(false);
    if (loggedInMetamask) {
      setWeb3authInUse(web3authMetamask);
      setProviderInUse(providerMetamask);
    } else if (loggedInPhantom) {
      setWeb3authInUse(web3authPhantom);
      setProviderInUse(providerPhantom);
    } else {
      setWeb3authInUse(null);
      setProviderInUse(null);

    }
    uiConsole("Logged out Google!");
  };

  const logoutMetamask = async () => {
    if (!web3authMetamask) {
      uiConsole("web3authMetamask not initialized yet");
      return;
    }
    await web3authMetamask.logout();
    setProviderMetamask(null);
    setLoggedInMetamask(false);
    if (loggedInGG) {
      setWeb3authInUse(web3auth);
      setProviderInUse(provider);
    } else if (loggedInPhantom){
      setWeb3authInUse(web3authPhantom);
      setProviderInUse(providerPhantom);
    } else {
      setWeb3authInUse(null);
      setProviderInUse(null);
    }
    uiConsole("Disconnected MetaMask!");
  };
  const logoutPhantom = async () => {
    if (!web3authPhantom) {
      uiConsole("web3authPhantom not initialized yet");
      return;
    }
    await web3authPhantom.logout();
    setProviderPhantom(null);
    setLoggedInPhantom(false);
    if (loggedInGG) {
      setWeb3authInUse(web3auth);
      setProviderInUse(provider);
    } else if (loggedInMetamask) {
      setWeb3authInUse(web3authMetamask);
      setProviderInUse(providerMetamask);
    } else {
      setWeb3authInUse(null);
      setProviderInUse(null);
    }
    uiConsole("Disconnected Phantom!");
  };

  const getEthAccounts = async () => {
    if (!providerInUse) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new EthereumRPC(providerInUse);
    const address = await rpc.getAccounts();
    uiConsole("ETH Address: " + address);
  };

  const getSolanaAccounts = async () => {
    if (web3authInUse == web3auth) {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }

      const ethRPC = new EthereumRPC(provider!);
      const privateKey = await ethRPC.getPrivateKey();
      //const privateKey = await ethRPC.getGeneralPrivateKey();

      const rpc = new SolanaRPCfromEth(privateKey);
      const address = await rpc.getAccounts();
      uiConsole("Solana Address: " + address);
      
    }else if (web3authInUse == web3authPhantom) {
      if (!providerPhantom) {
        uiConsole("provider not initialized yet");
        return;
      }
  
      const rpc = new SolanaRPC(providerPhantom);
      const address = await rpc.getAccounts();
      uiConsole("Solana Address: " + address);
    }
  };

  const getEthPrivateKeyGG = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new EthereumRPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole("ETH PrivateKey: " + privateKey);
  };
  const getGeneralPrivateKeyGG = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new EthereumRPC(provider);
    const generalPrivateKey = await rpc.getGeneralPrivateKey();
    uiConsole("General PrivateKey: " + generalPrivateKey);
  };
  const getSolPrivateKeyGG = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }

    const ethRPC = new EthereumRPC(provider!);
    const privateKey = await ethRPC.getPrivateKey();
    //const privateKey = await ethRPC.getGeneralPrivateKey();

    const rpc = new SolanaRPCfromEth(privateKey);
    const solPrivateKey = await rpc.getPrivateKey();
    uiConsole("Solana PrivateKey: " + solPrivateKey);
  };

  const getEthBalance = async () => {
    if (!providerInUse) {
      uiConsole("provider not initialized yet");
      return;
    }

    const rpc = new EthereumRPC(providerInUse);
    const balance = await rpc.getBalance();
    const finalString = "ETH sepolia Balance: " + balance;
    uiConsole(finalString);
  };
  const getSolanaBalance = async () => {
    if (web3authInUse == web3auth) {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }
  
      const ethRPC = new EthereumRPC(provider!);
      const privateKey = await ethRPC.getPrivateKey();
      //const privateKey = await ethRPC.getGeneralPrivateKey();
  
      const rpc = new SolanaRPCfromEth(privateKey);
      const balance = await rpc.getBalance();
      const finalString = "Solana devnet Balance: " + balance;
      uiConsole(finalString);
    } else if (web3authInUse == web3authPhantom) {
      if (!providerPhantom) {
        uiConsole("providerPhantom not initialized yet");
        return;
      }
    
      const rpc = new SolanaRPC(providerPhantom);
      const balance = await rpc.getBalance();
      const finalString = "Solana devnet Balance: " + balance;
      uiConsole(finalString);
    }

  };

  const sendSepoEthTransaction = async () => {
    if (!providerInUse) {
      uiConsole("provider not initialized yet");
      return;
    }
    //const rpc = new EthereumRPC(provider);
    const rpc = new EthereumRPC(providerInUse);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };
  const sendSolanaDevTransaction = async () => {
    if (web3authInUse == web3auth) {
      if (!provider) { 
        uiConsole("provider not initialized yet");
        return;
      }
    const ethRPC = new EthereumRPC(provider!);
    const privateKey = await ethRPC.getPrivateKey();
    //const privateKey = await ethRPC.getGeneralPrivateKey();

    const rpc = new SolanaRPCfromEth(privateKey);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
    } else if (web3authInUse == web3authPhantom) {
      if (!providerPhantom) {
        uiConsole("provider not initialized yet");
        return;
      }
  
      const rpc = new SolanaRPC(providerPhantom);
      const receipt = await rpc.sendTransaction();
      const address = await rpc.getAccounts();
      uiConsole(
        receipt,
        "---",
        "it's not printed in Base58, I haven't fixed this yet (or web3auth). But please look up the latest Tx in your account on Solana Devnet: ",
        "---",
        "https://explorer.solana.com/address/" + address + "?cluster=devnet"
      );
    }

  };

  // const signMessage = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new EthereumRPC(provider);
  //   const signedMessage = await rpc.signMessage();
  //   uiConsole(signedMessage);
  // };

  // const getPolygonAddress = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new EthereumRPC(provider);
  //   const privateKey = await rpc.getPrivateKey();

  //   const polygonPrivateKeyProvider = new EthereumPrivateKeyProvider({
  //     config: {
  //       chainConfig: {
  //         chainNamespace: CHAIN_NAMESPACES.EIP155,
  //         chainId: "0x13882",
  //         rpcTarget: "https://rpc.ankr.com/polygon_amoy",
  //         displayName: "Polygon Amoy Testnet",
  //         blockExplorerUrl: "https://amoy.polygonscan.com",
  //         ticker: "POL",
  //         tickerName: "Polygon Ecosystem token",
  //         logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  //       },
  //     },
  //   });
  //   await polygonPrivateKeyProvider.setupProvider(privateKey);
  //   const web3 = new Web3(polygonPrivateKeyProvider);
  //   const address = (await web3.eth.getAccounts())[0];
  //   return address;
  // };

  // const getBnbAddress = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new EthereumRPC(provider);
  //   const privateKey = await rpc.getPrivateKey();

  //   const bnbPrivateKeyProvider = new EthereumPrivateKeyProvider({
  //     config: {
  //       chainConfig: {
  //         chainNamespace: CHAIN_NAMESPACES.EIP155,
  //         chainId: "0x38",
  //         rpcTarget: "https://rpc.ankr.com/bsc",
  //         displayName: "Binance SmartChain Mainnet",
  //         blockExplorerUrl: "https://bscscan.com/",
  //         ticker: "BNB",
  //         tickerName: "BNB",
  //         logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  //       },
  //     },
  //   });
  //   await bnbPrivateKeyProvider.setupProvider(privateKey);
  //   const web3 = new Web3(bnbPrivateKeyProvider);
  //   const address = (await web3.eth.getAccounts())[0];
  //   return address;
  // };


  const loginMetamask = async () => {
    if (!web3authMetamask) {
      uiConsole("web3authMetamask not initialized yet");
      return;
    }

    // //-const metamaskAdapter = new MetamaskAdapter({});
    // const adapters = await getInjectedAdapters({ options: web3AuthConfig });
    // const metamaskAdapter = adapters.find((e) => e.name == "metamask")!;
    // web3auth.configureAdapter(metamaskAdapter);

    // https://web3auth.io/docs/migration-guides/no-modal-v8-to-v9

    try {
      // console.log(web3authMetamask);
      // console.log(web3authPhantom);
      const web3authProviderMetamask = await web3authMetamask.connectTo("metamask");
      setProviderMetamask(web3authProviderMetamask);
      setLoggedInMetamask(true);
      setWeb3authInUse(web3authMetamask);
      setProviderInUse(providerMetamask);
      uiConsole("Connected MetaMask Successfully!");   
    } catch (error) {
      console.error(error);
    }
  };

  const loginPhantom = async () => {
    if (!web3authPhantom) {
      uiConsole("web3authPhantom not initialized yet");
      return;
    }
    try {
      // console.log(web3authMetamask);
      // console.log(web3authPhantom);
      const web3authProviderPhantom = await web3authPhantom.connectTo("phantom");
      setProviderPhantom(web3authProviderPhantom);
      setLoggedInPhantom(true);
      setWeb3authInUse(web3authPhantom);
      setProviderInUse(providerPhantom);
      uiConsole("Connected Phantom Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const setGG = () => { 
    setWeb3authInUse(web3auth);
    setProviderInUse(provider);
  }
  const setMetamask = () => { 
    setWeb3authInUse(web3authMetamask);
    setProviderInUse(providerMetamask);
  }
  const setphantom = () => { 
    setWeb3authInUse(web3authPhantom);
    setProviderInUse(providerPhantom);
  }


  function uiConsole(...args: any[]): void {
    if (typeof document === "undefined") return;
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>

      <div className="flex-container">
        <p style={{ fontSize: "20px", color: "#0070f3" }}>
          You are in:
        </p>
        { loggedInGG && (
          <div>
            <button
              onClick={setGG}
              className="card"
              style={{
                backgroundColor: web3authInUse === web3auth ? "#FFCCCC" : "#fafafa",
              }}
            >
              Google
            </button>
          </div>
        )}
        { loggedInMetamask && (
          <div>
            <button
              onClick={setMetamask}
              className="card"
              style={{
                backgroundColor: web3authInUse === web3authMetamask ? "#FFCCCC" : "#fafafa",
              }}
            >
              MetaMask
            </button>
          </div>
        )}
        { loggedInPhantom && (
          <div>
            <button
              onClick={setphantom}
              className="card"
              style={{
                backgroundColor: web3authInUse === web3authPhantom ? "#FFCCCC" : "#fafafa",
              }}
            >
              Phantom
            </button>
          </div>
        )}
      </div>


      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getAllAccounts} className="card">
            Get All Accounts
          </button>
        </div>
        { (web3authInUse != web3authPhantom) && (
          <div>
            <button onClick={getEthAccounts} className="card">
              Get ETH Account
            </button>
          </div>
        )}
        { (web3authInUse != web3authMetamask) && (
          <div>
            <button onClick={getSolanaAccounts} className="card">
              Get Solana Account
            </button>
          </div>
        )}

        { (web3authInUse != web3authPhantom) && (
          <div>
            <button onClick={getEthBalance} className="card">
              Get SepoliaETH Balance
            </button>
          </div>
        )}
        { (web3authInUse != web3authMetamask) && (
          <div>
            <button onClick={getSolanaBalance} className="card">
              Get SolanaDev Balance
            </button>
          </div>
        )}
        <div>
          <button onClick={getAllBalances} className="card">
            Get All Balances
          </button>
        </div>
        { (web3authInUse != web3authPhantom) && (
          <div>
            <button onClick={sendSepoEthTransaction} className="card">
              Send Transaction (sign&send) ETH Sepolia (wait a bit)
            </button>
          </div>
        )}
        { (web3authInUse != web3authMetamask) && (
          <div>
            <button onClick={sendSolanaDevTransaction} className="card">
              Send Transaction (sign&send) Solana Devnet
            </button>
          </div>
        )}
        {/* <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div> */}


        {(web3authInUse == web3auth) && (
          <div>
            <button onClick={getEthPrivateKeyGG} className="card">
              Get ETH PrivateKey
            </button>
          </div>
        )}
        {(web3authInUse == web3auth) && (
          <div>
            <button onClick={getGeneralPrivateKeyGG} className="card">
            Get General PrivateKey
            </button>
          </div>
        )}
        {(web3authInUse == web3auth) && (
          <div>
            <button onClick={getSolPrivateKeyGG} className="card">
            Get Solana PrivateKey
            </button>
          </div>
        )}

      </div>
      

      <div className="flex-container">
          { (loggedInGG) ?
            <div>
              <button onClick={logoutGG} className="card">
                Log Out Google
              </button>
            </div>
            :
            <div>
              <button onClick={loginGG} className="card">
                Login Google
              </button>
            </div>
          }

          { (!loggedInMetamask) ? 
            <div>
              <button onClick={loginMetamask} className="card">
                Connect to MetaMask
              </button>
            </div>
            :
            <div>
              <button onClick={logoutMetamask} className="card">
                Disconnect MetaMask
              </button>
            </div>
          }

          { (!loggedInPhantom) ? 
            <div>
              <button onClick={loginPhantom} className="card">
                Connect to Phantom
              </button>
            </div>
            :
            <div>
              <button onClick={logoutPhantom} className="card">
                Disconnect Phantom
              </button>
            </div>
          }
        </div>
        
      
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <>
      <div>
        <button onClick={loginGG} className="card">
          Let's Sign in with Google first
        </button>
      </div>
      <div>
        <button onClick={loginMetamask} className="card">
          Connect to MetaMask
        </button>
      </div>
      
      <div>
          <button onClick={loginPhantom} className="card">
            Connect to Phantom
          </button>
        </div>
    </>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/no-modal" rel="noreferrer">
          Web3Auth{" "}
        </a>
        Multi-chain Demo
      </h1>

      <div className="grid">{(loggedInGG || loggedInMetamask || loggedInPhantom) ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://explorer.solana.com/?cluster=devnet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explorer on Solana Devnet
        </a>
        <a
          href="https://sepolia.etherscan.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explorer on Sepolia Etherscan
        </a>
      </footer>
    </div>
  );
}

export default App;
