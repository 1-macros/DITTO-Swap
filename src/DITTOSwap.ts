#!/usr/bin/env node
import "reflect-metadata";
import "colors";
import { Command, option, program } from "commander";
import { Listen } from "./command/LiveSwap.command";
import { Export } from "./command/Export.command";

export const DITTOSwap = new Command("DITTO<->BSC Swap Utility");

DITTOSwap.requiredOption("-c, --config <config>", "Config file location");
DITTOSwap.command("export")
  .description("Export DITTO swap events to csv.")
  .requiredOption("-f, --from <from>", "From Block")
  .requiredOption("-t, --to <to>", "To Block")
  .action((options) => {
    let from = options.from;
    let to = options.to;
    let configFile = DITTOSwap.opts().config;
    //console.log("from = " + from + " to = " + to + " config = " + configFile);
    Export(from, to, configFile);
  });
DITTOSwap.command("listen")
  .description("Listner for DITTO deposit events")
  .action(() => {
    Listen();
  });
DITTOSwap.parse(process.argv);
