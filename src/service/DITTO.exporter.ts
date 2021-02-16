import { Config } from "../interface/Config";
import * as ABI from "../utils/abi.json";
import { Event } from "../interface/Event";
import { _csvFileCreator, _csvWriter } from "../utils/CsvHelper";
import { requiredOption } from "commander";
const Web3 = require("web3");
let config: Config;
//= require("../../config.json");
const chalk = require("chalk");
const cliProgress = require("cli-progress");
const _colors = require("colors");
var log = console.log;
export async function __export(
  from: number,
  to: number | string,
  configFile: string
) {
  config = require(configFile);
  const progressBar = new cliProgress.SingleBar({
    format:
      "Export In Progress |" +
      _colors.blue("{bar}") +
      "| {percentage}% || {value}/{total} transactions | ETA: {eta}s",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });
  log(
    chalk.green(
      new Date() + " Exporting DITTO tx from = " + from + " to = " + to
    )
  );
  const web3 = new Web3(new Web3.providers.WebsocketProvider(config.eth_url));
  const contractAddress = config.contract_address;
  let dittoContract = new web3.eth.Contract(ABI, contractAddress);
  let events = [];
  events = await dittoContract
    .getPastEvents("SwapDeposit", {
      fromBlock: from,
      toBlock: to,
    })
    .then((_events) => (events = _events));
  progressBar.start(events.length, 0);
  let len = events.length;
  let fName = "ditto" + "-" + from + "-" + to + ".csv";
  _csvFileCreator(fName, config.out_dir);
  for (let i = 0; i < len; i++) {
    let _event = events[i];
    //console.log(_event);
    var blockInfo;
    blockInfo = await web3.eth
      .getBlock(_event.blockNumber)
      .then((result) => (blockInfo = result));
    let data = [
      blockInfo.timestamp,
      _event.returnValues.depositor,
      _event.returnValues.input,
      _event.returnValues.inputAmount,
      _event.returnValues.outputAmount,
    ];
    _csvWriter(fName, data, config.out_dir);
    progressBar.increment();
  }
  progressBar.stop();
  log(chalk.green("\n\n " + new Date() + " Completed the file export"));
  process.exit(0);
}

export function _export(from: number, to: number | string, configFile: string) {
  return __export(from, to, configFile);
  //process.exit(0);
}
