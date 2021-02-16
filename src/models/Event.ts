import { JsonProperty } from "json-object-mapper";
import { type } from "node:os";

export class Event {
  public blockNo: string;
  public timestamp: number;
  public address: string;
  public inputTokenName: string;
  public inputAmount: number;
  public outputAmount: number;
}
