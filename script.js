const contractAddress = "0x2a2a81a1c14ba0019468a18b8b45c44a593099f6";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider, signer, contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        document.getElementById("connectWallet").innerText = "Wallet Connected";
        contract = new ethers.Contract(contractAddress, abi, signer);
        document.getElementById("actions").classList.remove("hidden");
    } else {
        alert("Please install MetaMask.");
    }
}

function showInputFields(action) {
    const inputSection = document.getElementById("inputSection");
    const inputFields = document.getElementById("inputFields");
    const actionTitle = document.getElementById("actionTitle");
    inputFields.innerHTML = "";
    
    let fields = [];
    if (action === "transfer") {
        actionTitle.innerText = "Transfer Tokens";
        fields = [
            { id: "recipient", placeholder: "Recipient Address" },
            { id: "amount", placeholder: "Amount" }
        ];
    } else if (action === "approve") {
        actionTitle.innerText = "Approve Spender";
        fields = [
            { id: "spender", placeholder: "Spender Address" },
            { id: "amount", placeholder: "Amount" }
        ];
    } else if (action === "transferFrom") {
        actionTitle.innerText = "Transfer From";
        fields = [
            { id: "from", placeholder: "From Address" },
            { id: "to", placeholder: "To Address" },
            { id: "amount", placeholder: "Amount" }
        ];
    } else if (action === "mint") {
        actionTitle.innerText = "Mint Tokens (Owner Only)";
        fields = [{ id: "amount", placeholder: "Mint Amount" }];
    }

    fields.forEach(field => {
        let input = document.createElement("input");
        input.type = "text";
        input.id = field.id;
        input.placeholder = field.placeholder;
        inputFields.appendChild(input);
    });

    document.getElementById("executeBtn").setAttribute("data-action", action);
    inputSection.classList.remove("hidden");
}

async function executeAction() {
    const action = document.getElementById("executeBtn").getAttribute("data-action");
    try {
        let tx;
        if (action === "transfer") {
            const recipient = document.getElementById("recipient").value;
            const amount = document.getElementById("amount").value;
            tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 1));
        } else if (action === "approve") {
            const spender = document.getElementById("spender").value;
            const amount = document.getElementById("amount").value;
            tx = await contract.approve(spender, ethers.utils.parseUnits(amount, 1));
        } else if (action === "transferFrom") {
            const from = document.getElementById("from").value;
            const to = document.getElementById("to").value;
            const amount = document.getElementById("amount").value;
            tx = await contract.transferFrom(from, to, ethers.utils.parseUnits(amount, 1));
        } else if (action === "mint") {
            const amount = document.getElementById("amount").value;
            tx = await contract.mint(ethers.utils.parseUnits(amount, 1));
        }
        await tx.wait();
        alert(`${action} successful!`);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.querySelectorAll(".action-btn").forEach(btn => btn.addEventListener("click", () => showInputFields(btn.getAttribute("data-action"))));
document.getElementById("executeBtn").addEventListener("click", executeAction);
