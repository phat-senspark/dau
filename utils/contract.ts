import Web3 from "web3"
import { AbiItem } from "web3-utils";
import "dotenv/config"
import { Contract } from "web3-eth-contract";
import { bHeroTokenABI } from "./abi/b-hero-token-abi";
import { networks } from "./config";

export const web3 = (rpc: string) => new Web3(networks[rpc][0])

export const bHeroTokenContract = (address: string, rpc: string): Contract => {
  const web3 = new Web3(`${rpc}`)
  return new web3.eth.Contract(bHeroTokenABI as AbiItem[], address);
};


export const contracts = {
  "bHeroTokenContract": bHeroTokenContract,
}

export const contractAddress = {
  "bsc": {
    "bHeroTokenContract": "0x30cc0553f6fa1faf6d7847891b9b36eb559dc618",
  },
  "testnet": {
    "bHeroTokenContract": "",
  },
  "polygon": {
    "bHeroTokenContract": "",
  },
  "mumbai": {
    "bHeroTokenContract": "",
  }
}
