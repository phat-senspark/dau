import { EventData } from "web3-eth-contract";
import { networks } from "./utils/config";
import { contractAddress, contracts, web3 } from "./utils/contract";

export const getPastEvent = async (
  nameEvent: string,
  contractName: string,
  fromBlock: number,
  toBlock: number,
  network: string
) => {
  const address: string = contractAddress[network][contractName];
  const listNetwork: Array<string> = networks[network];
  const contract = contracts[contractName];

  const latestBlockNetwork = await web3(network).eth.getBlockNumber();
  const block =
    toBlock === undefined || (toBlock as number) >= latestBlockNetwork
      ? latestBlockNetwork
      : (toBlock as number);

  if (block - fromBlock > 144000) return { result: [], block };

  let result = 0;
  // current network block less than fromBlock + 5000
  if (fromBlock + 5000 > block) {
    let rpcIdx = 0;
    let tokenCreateRequested: EventData[];

    // Switch rpc
    while (true) {
      try {
        tokenCreateRequested = await contract(
          address,
          listNetwork[rpcIdx]
        ).getPastEvents(nameEvent, {
          fromBlock: fromBlock,
          toBlock: block,
        });
        break;
      } catch (error) {
        console.log("error: ", error);
        if (rpcIdx === listNetwork.length - 1) rpcIdx = -1;
        ++rpcIdx;
      }
    }
    result += filterParamEvent("to", tokenCreateRequested);
  } else {
    let fromBlockTemp = fromBlock;
    let currentBlock = fromBlockTemp + 5000;

    while (true) {
      let rpcIdx = 0;
      let tokenCreateRequested: EventData[];
      //switch rpc
      while (true) {
        try {
          // Get events
          tokenCreateRequested = await contract(
            address,
            listNetwork[rpcIdx]
          ).getPastEvents(nameEvent, {
            fromBlock: fromBlockTemp,
            toBlock: currentBlock,
          });
          break;
        } catch (error) {
          console.log("error: ", error);
          if (rpcIdx === listNetwork.length - 1) rpcIdx = -1;
          ++rpcIdx;
        }
      }
      // Append data after each get
      result += filterParamEvent("to", tokenCreateRequested);

      if (currentBlock >= block) break;
      fromBlockTemp = currentBlock;
      currentBlock += 5000;
    }
  }
  console.log("result: ", result);
  return { result, block };
};

const filterParamEvent = (param: string, events: EventData[]) => {
  let data: Object = {};
  events.map((e) => {
    const to = e.returnValues[`${param}`];
    return data.hasOwnProperty(to) ? false : (data[`${to}`] = true);
  });
  return Object.keys(data).length;
};
