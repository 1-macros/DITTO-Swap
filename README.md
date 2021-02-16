# Ditto-Swap

Ditto Utility

- Export deposit events to csv.
- Realtime swap of tokens from ETH chain to BSC chain.

## Features

- Export ditto deposit events to csv
- [Live Swap : TBD] Listen - Listen to real time deposit events
- [Live Swap : TBD] Swap - Swap the tokens from ETH chain to BSC chain.

## Installation

Ditto-swap requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
cd DITTO-swap
npm run build
npm link
```

Refer the `config.json` for variables

### commands

#### export

```sh
ditto-swap -c /tmp/ditto-config.json export -f 1 -t latest
```
