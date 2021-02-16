import { _export } from "../service/DITTO.exporter";

export function Export(from: number, to: number, configFile: string) {
  _export(from, to, configFile);
}
