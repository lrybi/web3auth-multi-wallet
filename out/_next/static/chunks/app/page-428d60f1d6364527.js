(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8848:function(){},6601:function(){},9214:function(){},5568:function(){},414:function(e,t,n){Promise.resolve().then(n.bind(n,5611))},5611:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return B}});var a=n(7437),i=n(2265),r=n(8079),s=n(3298),o=n(9184);n(4384);var c=n(5055),l=n(2090),d=n(7107),h=n(8285);let u="BKqDHWzg5xiaFDNMphjkiRBG9nV-pVzajM08a0ZhSN8oomM-w5JE92TmVhAXPm8A23LFUEiIXgghvaAE0UCI4nk",w={chainNamespace:c.E.EIP155,chainId:"0xaa36a7",rpcTarget:"https://rpc.ankr.com/eth_sepolia",displayName:"Sepolia Testnet",blockExplorerUrl:"https://sepolia.etherscan.io/",ticker:"ETH",tickerName:"Ethereum Sepolia",logo:"https://cryptologos.cc/logos/ethereum-eth-logo.png"},p=new d.q({config:{chainConfig:w}}),y={clientId:u,chainConfig:w,sessionTime:7200,privateKeyProvider:p,web3AuthNetwork:l.K2.SAPPHIRE_DEVNET},g={adapterSettings:{uxMode:l.$e.REDIRECT}},f={chainNamespace:c.E.SOLANA,chainId:"0x67",rpcTarget:"https://api.devnet.solana.com",displayName:"Solana Devnet",blockExplorerUrl:"https://explorer.solana.com/?cluster=devnet",ticker:"SOL",tickerName:"Solana"},m=new h.R({config:{chainConfig:f}}),v={clientId:u,chainConfig:f,sessionTime:7200,privateKeyProvider:m,web3AuthNetwork:l.K2.SAPPHIRE_DEVNET};var k=n(1308),x=n(8522),b=n(3254);class P{async getChainId(){try{let e=new b.ZPm(this.provider);return(await e.eth.getChainId()).toString()}catch(e){return e}}async getAccounts(){try{let e=new b.ZPm(this.provider);return(await e.eth.getAccounts())[0]}catch(e){return e}}async getBalance(){try{let e=new b.ZPm(this.provider),t=(await e.eth.getAccounts())[0];return e.utils.fromWei(await e.eth.getBalance(t),"ether")}catch(e){return e}}async sendTransaction(){try{let e=new b.ZPm(this.provider),t=(await e.eth.getAccounts())[0],n=e.utils.toWei("0.0001","ether"),a={from:t,to:t,data:"0x",value:n};a={...a,gas:await e.eth.estimateGas(a)};let i=await e.eth.sendTransaction(a);return this.toStringJson(i)}catch(e){return e}}async signMessage(){try{let e=new b.ZPm(this.provider),t=(await e.eth.getAccounts())[0];return await e.eth.personal.sign("YOUR_MESSAGE",t,"test password!")}catch(e){return e}}async getPrivateKey(){try{return await this.provider.request({method:"eth_private_key"})}catch(e){return e}}async getGeneralPrivateKey(){try{return await this.provider.request({method:"private_key"})}catch(e){return e}}toStringJson(e){return JSON.parse(JSON.stringify(e,(e,t)=>"bigint"==typeof t?t.toString():t))}constructor(e){this.provider=e}}var j=n(3961),S=n(5429),T=n(3207);class A{getChainId(){throw Error("Method not implemented.")}async getAccounts(){let e=(0,T.d)(this.privateKey).sk.toString("hex");await this.provider.setupProvider(e);let t=new j.T(this.provider);return(await t.requestAccounts())[0]}async getBalance(){let e=await this.getAccounts(),t=new S.ew(this.provider.config.chainConfig.rpcTarget);return(await t.getBalance(new S.nh(e))).toString()}async sendTransaction(){try{let e=(0,T.d)(this.privateKey).sk.toString("hex");await this.provider.setupProvider(e);let t=new j.T(this.provider),n=(await t.requestAccounts())[0],a=new S.ew(this.provider.config.chainConfig.rpcTarget),i=await a.getLatestBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(n),toPubkey:new S.nh(n),lamports:.01*S.j5}),s=new S.YW({blockhash:i.blockhash,lastValidBlockHeight:i.lastValidBlockHeight,feePayer:new S.nh(n)}).add(r),{signature:o}=await t.signAndSendTransaction(s);return o}catch(e){return e}}signMessage(){throw Error("Method not implemented.")}async getPrivateKey(){return(0,T.d)(this.privateKey).sk.toString("hex")}constructor(e){this.provider=new h.R({config:{chainConfig:{chainNamespace:c.E.SOLANA,chainId:"0x67",rpcTarget:"https://api.devnet.solana.com",displayName:"Solana Devnet",blockExplorerUrl:"https://explorer.solana.com?cluster=devnet",ticker:"SOL",tickerName:"Solana"}}}),this.privateKey=e}}var C=n(9109).Buffer;class N{constructor(e){this.getAccounts=async()=>{try{let e=new j.T(this.provider);return await e.requestAccounts()}catch(e){return e}},this.getBalance=async()=>{try{let e=new j.T(this.provider),t=await e.request({method:"solana_provider_config",params:[]}),n=new S.ew(t.rpcTarget),a=await e.requestAccounts();return(await n.getBalance(new S.nh(a[0]))).toString()}catch(e){return e}},this.signMessage=async()=>{try{let e=new j.T(this.provider),t=C.from("Test Signing Message ","hex");return(await e.signMessage(t)).toString()}catch(e){return e}},this.sendTransaction=async()=>{try{let e=new j.T(this.provider),t=await e.requestAccounts(),n=await e.request({method:"solana_provider_config",params:[]}),a=new S.ew(n.rpcTarget),i=await a.getLatestBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(t[0]),toPubkey:new S.nh(t[0]),lamports:.01*S.j5}),s=new S.YW({blockhash:i.blockhash,lastValidBlockHeight:i.lastValidBlockHeight,feePayer:new S.nh(t[0])}).add(r),{signature:o}=await e.signAndSendTransaction(s);return o}catch(e){return e}},this.signTransaction=async()=>{try{var e;let t=new j.T(this.provider),n=await t.request({method:"solana_provider_config",params:[]}),a=new S.ew(n.rpcTarget),i=await t.requestAccounts(),{blockhash:r}=await a.getRecentBlockhash("finalized"),s=S.yc.transfer({fromPubkey:new S.nh(i[0]),toPubkey:new S.nh(i[0]),lamports:.01*S.j5}),o=new S.YW({recentBlockhash:r,feePayer:new S.nh(i[0])}).add(s),c=await t.signTransaction(o);return(null===(e=c.signature)||void 0===e?void 0:e.toString())||""}catch(e){return e}},this.sendVersionTransaction=async()=>{try{let e=new j.T(this.provider),t=await e.request({method:"solana_provider_config",params:[]}),n=new S.ew(t.rpcTarget),a=await e.requestAccounts(),{blockhash:i}=await n.getLatestBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.01*S.j5}),s=new S.$Z({recentBlockhash:i,instructions:[r],payerKey:new S.nh(a[0])}),o=new S.GS(s.compileToV0Message()),{signature:c}=await e.signAndSendTransaction(o);return c}catch(e){return e}},this.signVersionedTransaction=async()=>{try{let e=new j.T(this.provider),t=await e.request({method:"solana_provider_config",params:[]}),n=new S.ew(t.rpcTarget),a=await e.requestAccounts(),{blockhash:i}=await n.getRecentBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.01*S.j5}),s=new S.$Z({recentBlockhash:i,instructions:[r],payerKey:new S.nh(a[0])}),o=new S.GS(s.compileToV0Message());return await e.signTransaction(o)}catch(e){throw e}},this.signAllTransaction=async()=>{try{let e=new j.T(this.provider),t=await e.request({method:"solana_provider_config",params:[]}),n=new S.ew(t.rpcTarget),a=await e.requestAccounts(),{blockhash:i}=await n.getRecentBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.01*S.j5}),s=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.02*S.j5}),o=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.03*S.j5}),c=new S.YW({recentBlockhash:i,feePayer:new S.nh(a[0])}).add(r),l=new S.YW({recentBlockhash:i,feePayer:new S.nh(a[0])}).add(s),d=new S.YW({recentBlockhash:i,feePayer:new S.nh(a[0])}).add(o);return await e.signAllTransactions([c,l,d])}catch(e){throw e}},this.signAllVersionedTransaction=async()=>{try{let e=new j.T(this.provider),t=await e.request({method:"solana_provider_config",params:[]}),n=new S.ew(t.rpcTarget),a=await e.requestAccounts(),{blockhash:i}=await n.getRecentBlockhash("finalized"),r=S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.01*S.j5});S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.02*S.j5}),S.yc.transfer({fromPubkey:new S.nh(a[0]),toPubkey:new S.nh(a[0]),lamports:.03*S.j5});let s=new S.$Z({recentBlockhash:i,payerKey:new S.nh(a[0]),instructions:[r]}),o=new S.$Z({recentBlockhash:i,payerKey:new S.nh(a[0]),instructions:[r]}),c=new S.$Z({recentBlockhash:i,payerKey:new S.nh(a[0]),instructions:[r]}),l=new S.GS(s.compileToV0Message()),d=new S.GS(o.compileToV0Message()),h=new S.GS(c.compileToV0Message()),u=await e.signAllTransactions([l,d,h]);return console.log(u),u}catch(e){throw e}},this.getPrivateKey=async()=>await this.provider.request({method:"solanaPrivateKey"}),this.provider=e}}var B=()=>{let[e,t]=(0,i.useState)(null),[n,c]=(0,i.useState)(!1),[l,d]=(0,i.useState)(null),[h,u]=(0,i.useState)(null),[w,p]=(0,i.useState)(null),[f,m]=(0,i.useState)(!1),[b,j]=(0,i.useState)(null),[S,T]=(0,i.useState)(null),[C,B]=(0,i.useState)(!1),[E,M]=(0,i.useState)(null),[z,K]=(0,i.useState)(null);(0,i.useEffect)(()=>{(async()=>{try{let n=new r.K(y);d(n);let a=new s.D(g);n.configureAdapter(a),await n.init(),t(n.provider),n.connected&&(c(!0),M(n),K(e));let i=new r.K(y);u(i);let o=await (0,k.u)({options:y}),l=o.find(e=>"metamask"==e.name);if(l)try{if(i.configureAdapter(l),await i.init(),p(i.provider),i.connected&&(m(!0),M(i),K(w)),!i.connected)try{let e=o.find(e=>"metamask"==e.name),t=null==e?void 0:e.injectedProvider;if((null==t?void 0:t.selectedAddress)!=null&&(null==t?void 0:t.selectedAddress)!=void 0){let e=await i.connectTo("metamask");p(e)}}catch(e){console.error(e)}i.connected&&(m(!0),M(i),K(w))}catch(e){console.error("Error initializing MetaMask adapter:",e)}else console.warn("MetaMask adapter not found. Please ensure MetaMask is installed and available.");let h=new r.K(v);j(h);let f=(await (0,x.u)({options:v})).find(e=>"phantom"==e.name);if(f)try{if(h.configureAdapter(f),await h.init(),T(h.provider),h.connected&&(B(!0),M(h),K(S)),!h.connected)try{let e=await h.connectTo("phantom");T(e)}catch(e){console.error("sorry, keep going. ",e)}h.connected&&(B(!0),M(h),K(S))}catch(e){console.error("Error initializing Phantom adapter:",e)}else console.warn("Phantom adapter not found. Please ensure Phantom is installed and available.")}catch(e){console.error(e)}})()},[]);let G=async()=>{let t=[];if(n){if(!e){ee("provider not initialized yet");return}let n=new P(e),a=new A(await n.getPrivateKey()),i=await n.getAccounts(),r=await a.getAccounts();t.push("On Google Wallet: "),t.push("Ethereum Address: "+i),t.push("Solana Address: "+r),t.push("---")}if(f){if(!w){ee("provider not initialized yet");return}let e=new P(w),n=await e.getAccounts();t.push("On MetaMask Wallet: "),t.push("Ethereum Address: "+n),t.push("---")}if(C){if(!S){ee("provider not initialized yet");return}let e=new N(S),n=await e.getAccounts();t.push("On Phantom Wallet: "),t.push("Solana Address: "+n.toString()),t.push("---")}ee(t)},_=async()=>{let t=[];if(n){if(!e){ee("provider not initialized yet");return}let n=new P(e),a=new A(await n.getPrivateKey()),i=await n.getBalance(),r=await a.getBalance();t.push("On Google Wallet: "),t.push("Ethereum sepolia Balance: "+i),t.push("Solana devnet Balance: "+r),t.push("---")}if(f){if(!w){ee("provider not initialized yet");return}let e=new P(w),n=await e.getBalance();t.push("On MetaMask Wallet: "),t.push("Ethereum sepolia Balance: "+n),t.push("---")}if(C){if(!S){ee("provider not initialized yet");return}let e=new N(S),n=await e.getBalance();t.push("On Phantom Wallet: "),t.push("Solana devnet Balance: "+n),t.push("---")}ee(t)},q=async()=>{if(!l){ee("web3auth not initialized yet");return}t(await l.connectTo(o.rW.AUTH,{loginProvider:"google"})),c(!0),M(l),K(e),ee("Logged in Successfully!")},D=async()=>{if(!E){ee("web3auth not initialized yet");return}ee(await E.authenticateUser())},H=async()=>{if(!E){ee("web3auth not initialized yet");return}ee(await E.getUserInfo())},O=async()=>{if(!l){ee("web3auth not initialized yet");return}await l.logout(),t(null),c(!1),f?(M(h),K(w)):C?(M(b),K(S)):(M(null),K(null)),ee("Logged out Google!")},V=async()=>{if(!h){ee("web3authMetamask not initialized yet");return}await h.logout(),p(null),m(!1),n?(M(l),K(e)):C?(M(b),K(S)):(M(null),K(null)),ee("Disconnected MetaMask!")},W=async()=>{if(!b){ee("web3authPhantom not initialized yet");return}await b.logout(),T(null),B(!1),n?(M(l),K(e)):f?(M(h),K(w)):(M(null),K(null)),ee("Disconnected Phantom!")},I=async()=>{if(!z){ee("provider not initialized yet");return}let e=new P(z);ee("ETH Address: "+await e.getAccounts())},L=async()=>{if(E==l){if(!e){ee("provider not initialized yet");return}let t=new P(e),n=new A(await t.getPrivateKey());ee("Solana Address: "+await n.getAccounts())}else if(E==b){if(!S){ee("provider not initialized yet");return}let e=new N(S);ee("Solana Address: "+await e.getAccounts())}},R=async()=>{if(!e){ee("provider not initialized yet");return}let t=new P(e);ee("ETH PrivateKey: "+await t.getPrivateKey())},Z=async()=>{if(!e){ee("provider not initialized yet");return}let t=new P(e);ee("General PrivateKey: "+await t.getGeneralPrivateKey())},F=async()=>{if(!e){ee("provider not initialized yet");return}let t=new P(e),n=new A(await t.getPrivateKey());ee("Solana PrivateKey: "+await n.getPrivateKey())},U=async()=>{if(!z){ee("provider not initialized yet");return}let e=new P(z);ee("ETH sepolia Balance: "+await e.getBalance())},Y=async()=>{if(E==l){if(!e){ee("provider not initialized yet");return}let t=new P(e),n=new A(await t.getPrivateKey());ee("Solana devnet Balance: "+await n.getBalance())}else if(E==b){if(!S){ee("providerPhantom not initialized yet");return}let e=new N(S);ee("Solana devnet Balance: "+await e.getBalance())}},J=async()=>{if(!z){ee("provider not initialized yet");return}let e=new P(z);ee(await e.sendTransaction())},$=async()=>{if(E==l){if(!e){ee("provider not initialized yet");return}let t=new P(e),n=new A(await t.getPrivateKey());ee(await n.sendTransaction())}else if(E==b){if(!S){ee("provider not initialized yet");return}let e=new N(S);ee(await e.sendTransaction(),"---","it's not printed in Base58, I haven't fixed this yet (or web3auth). But please look up the latest Tx in your account on Solana Devnet: ","---","https://explorer.solana.com/address/"+await e.getAccounts()+"?cluster=devnet")}},X=async()=>{if(!h){ee("web3authMetamask not initialized yet");return}try{let e=await h.connectTo("metamask");p(e),m(!0),M(h),K(w),ee("Connected MetaMask Successfully!")}catch(e){console.error(e)}},Q=async()=>{if(!b){ee("web3authPhantom not initialized yet");return}try{let e=await b.connectTo("phantom");T(e),B(!0),M(b),K(S),ee("Connected Phantom Successfully!")}catch(e){console.error(e)}};function ee(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if("undefined"==typeof document)return;let a=document.querySelector("#console>p");a&&(a.innerHTML=JSON.stringify(t||{},null,2))}let et=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex-container",children:[(0,a.jsx)("p",{style:{fontSize:"20px",color:"#0070f3"},children:"You are in:"}),n&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:()=>{M(l),K(e)},className:"card",style:{backgroundColor:E===l?"#FFCCCC":"#fafafa"},children:"Google"})}),f&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:()=>{M(h),K(w)},className:"card",style:{backgroundColor:E===h?"#FFCCCC":"#fafafa"},children:"MetaMask"})}),C&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:()=>{M(b),K(S)},className:"card",style:{backgroundColor:E===b?"#FFCCCC":"#fafafa"},children:"Phantom"})})]}),(0,a.jsxs)("div",{className:"flex-container",children:[(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:H,className:"card",children:"Get User Info"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:D,className:"card",children:"Get ID Token"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:G,className:"card",children:"Get All Accounts"})}),E!=b&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:I,className:"card",children:"Get ETH Account"})}),E!=h&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:L,className:"card",children:"Get Solana Account"})}),E!=b&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:U,className:"card",children:"Get SepoliaETH Balance"})}),E!=h&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:Y,className:"card",children:"Get SolanaDev Balance"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:_,className:"card",children:"Get All Balances"})}),E!=b&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:J,className:"card",children:"Send Transaction (sign&send) ETH Sepolia (wait a bit)"})}),E!=h&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:$,className:"card",children:"Send Transaction (sign&send) Solana Devnet"})}),E==l&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:R,className:"card",children:"Get ETH PrivateKey"})}),E==l&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:Z,className:"card",children:"Get General PrivateKey"})}),E==l&&(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:F,className:"card",children:"Get Solana PrivateKey"})})]}),(0,a.jsxs)("div",{className:"flex-container",children:[n?(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:O,className:"card",children:"Log Out Google"})}):(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:q,className:"card",children:"Login Google"})}),f?(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:V,className:"card",children:"Disconnect MetaMask"})}):(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:X,className:"card",children:"Connect to MetaMask"})}),C?(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:W,className:"card",children:"Disconnect Phantom"})}):(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:Q,className:"card",children:"Connect to Phantom"})})]}),(0,a.jsx)("div",{id:"console",style:{whiteSpace:"pre-line"},children:(0,a.jsx)("p",{style:{whiteSpace:"pre-line"}})})]}),en=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:q,className:"card",children:"Let's Sign in with Google first"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:X,className:"card",children:"Connect to MetaMask"})}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{onClick:Q,className:"card",children:"Connect to Phantom"})})]});return(0,a.jsxs)("div",{className:"container",children:[(0,a.jsxs)("h1",{className:"title",children:[(0,a.jsxs)("a",{target:"_blank",href:"https://web3auth.io/docs/sdk/pnp/web/no-modal",rel:"noreferrer",children:["Web3Auth"," "]}),"Multi-chain Demo"]}),(0,a.jsx)("div",{className:"grid",children:n||f||C?et:en}),(0,a.jsxs)("footer",{className:"footer",children:[(0,a.jsx)("a",{href:"https://explorer.solana.com/?cluster=devnet",target:"_blank",rel:"noopener noreferrer",children:"Explorer on Solana Devnet"}),(0,a.jsx)("a",{href:"https://sepolia.etherscan.io/",target:"_blank",rel:"noopener noreferrer",children:"Explorer on Sepolia Etherscan"})]})]})}},4384:function(){}},function(e){e.O(0,[548,814,681,971,23,744],function(){return e(e.s=414)}),_N_E=e.O()}]);