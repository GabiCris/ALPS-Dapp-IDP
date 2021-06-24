# ALPS Dapp

Dapp developed as an IDP project at the Technical University of Munich in partnership with ALPS. The objective is to provide a way to visualize and interact with data on a custom Ethereum blockchain. The demo contracts are similar to those found in the ALPS blockchain and loosely represent data found in an IP licensing management system.

# Installation Guide

For first time installation follow steps [#1](#1.-Set-up-the-backend-blockchain-(Ganache)) and [#2](2.-Set-up-and-run-React-frontend). Afterwards, in order to run the app,  make sure to have the Ganache blockchain running, then simply start up the dapp by running `npm start` in `client-licensee`.
## Prerequisites
* Clone Repo
* Install [npm](https://www.npmjs.com/get-npm)
* Install [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)


## 1. Set up the backend blockchain (Ganache)
1. Download and install [Ganache](https://www.trufflesuite.com/ganache)
2. Create a new Ethereum workspace and add truffle-config.js to the project; then save & restart blockchain. Make sure the server is running on port `8545`. Feel free to save the created workspace for use in the future
3. Open terminal in project folder then open the truffle console by running: 

    `truffle console`

4. In the truffle console, compile and migrate the contracts with:

    `migrate`

## 2. Set up and run React frontend
1. Go into ui folder: `cd .\client-licensee`
2. Install dependencies by openning a terminal and running:

    `npm install`
3. Run Dapp by running:

    `npm start`
4. *OPTIONAL:* in order to enable the Smart License tab to communicate between two active DAPP windows (i.e. a licensee and a licensor), the Node.js server also needs to be started. In order to do so, open a new terminal window and navigate to the server folder `cd .\server` . Then run

    `node .\server.js`
