import { getPastEvent } from "./get-past-event";
import { readLastLine, writeFile } from "./last-sync";

const main = async  () => {
  const lastSyncBlock =  Number(readLastLine("block-history"))
  const data = await getPastEvent("TokenCreateRequested", "bHeroTokenContract",lastSyncBlock, lastSyncBlock + 28800, "bsc" );
  writeFile(data.block.toString(), "block-history");
 
}
main()
