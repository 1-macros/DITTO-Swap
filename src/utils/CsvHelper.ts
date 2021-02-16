var fs = require("fs");
const chalk = require("chalk");
var log = console.log;

const headers = [
  "timestamp",
  "blockNo",
  "address",
  "inputTokenName",
  "inputAmount",
  "outputAmount",
].join(",");
export function _csvFileCreator(fName: string, outDir: string) {
  log(chalk.green(new Date() + " Creating file at => " + outDir + "/" + fName));
  var location = outDir + "/" + fName;
  fs.writeFile(location, headers, function (err) {
    if (err) {
      console.log("Error while creating the file");
    }
  });
}
export function _csvWriter(
  fName: string,
  data: (string | number)[],
  outDir: string
) {
  var location = outDir + "/" + fName;
  var logStream = fs.createWriteStream(location, { flags: "a" });
  logStream.write("\n" + data.join(","));
  logStream.end();
}
