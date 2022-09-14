import path from "path";
import fs from "fs";
export const writeFile = (content: string, fileName: string) => {
  const filePath = path.join(__dirname, fileName);
  if(!fs.existsSync(filePath)){
    fs.createWriteStream(filePath);
  }
  try {
    fs.appendFileSync(filePath, content + '\n');
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const readLastLine = (fileName: string ) => {
  const filePath = path.join(__dirname, fileName);
  const data: string[] = fs.readFileSync(filePath, "utf-8").split("\n");
  return data[data.length - 2];
};
