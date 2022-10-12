import Web3 from 'web3/dist/web3.min.js';

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "y",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "romance",
                "type": "string"
            }
        ],
        "name": "addMoment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMoments",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "y",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "romance",
                        "type": "string"
                    }
                ],
                "internalType": "struct LoveCounter.Moment[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "records",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "y",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "romance",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const address = '0x38954056186de59c56CD5a8E1ffE7b324bc5f77F';
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abi, address);

export async function addMoment(account, locationX, locationY, message) {
    await contract.methods
        .addMoment(locationX, locationY, message)
        .send({from: account}, function (err, res) {
            if (err) {
                console.log("An error occurred", err)
                return
            }
            console.log("Hash of the transaction: " + res)
        });
}

export async function getMoments(account) {
    return await contract.methods.getMoments()
        .call({from: account}, function (err, res) {
            if (err) {
                console.log("An error occurred", err)
                return
            }
            console.log("Hash of the transaction: " + res)
        });
}