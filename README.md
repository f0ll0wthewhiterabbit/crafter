# Crafter

Training project/game.

https://crafter-game.herokuapp.com/

## Installation

To install both client and server dependencies run:

```bash
npm install && npm install --prefix client
```

## Usage

Run this to start client and server development modes in a single thread:

```bash
npm run dev
```

Alternatively you can separately run client development mode:

```bash
npm run client
```

And server development mode:

```bash
npm run start:dev
```

## Requirements

Node.js version: 12.20.0

Be sure to add .env file with settings to the root. Put the path to your local or cloud mongodb database in 'MONGO_URI' key.

---

[iTechArt](https://itechart.by), 2021
