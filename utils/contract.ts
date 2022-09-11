import Web3 from "web3"
import { AbiItem } from "web3-utils";
import "dotenv/config"
import { Contract } from "web3-eth-contract";
import { bHeroTokenABI } from "./abi/b-hero-token-abi";

export const web3 = new Web3(`${process.env.PROVIDER_URL}`)

export const bHeroTokenContract = (address: string, rpc: string): Contract => {
  const web3 = new Web3(`${rpc}`)
  return new web3.eth.Contract(bHeroTokenABI as AbiItem[], address);
};


export const contracts = {
  "bHeroTokenContract": bHeroTokenContract,
}

export const contractAddress = {
  "bsc-mainnet": {
    "bHeroToken": "",
  },
  "bsc-testnet": {
    "bHeroToken": "",
  },
  "polygon": {
    "bHeroToken": "",
  },
  "mumbai": {
    "bHeroToken": "",
  }
}
