# TradeArt
## _Online Saling Art Platform_                                             


[![Deploy to Firebase Hosting on PR](https://github.com/MathieuVce/TradeArt/actions/workflows/firebase-hosting-pull-request.yml/badge.svg?branch=deploy)](https://github.com/MathieuVce/TradeArt/actions/workflows/firebase-hosting-pull-request.yml)

## Features

- Login/Register as customer or artist
- Sale your art
- View and buy some

## Tech

Trade Art uses a number of open source projects to work properly:

- [node.js](https://nodejs.org/)  - Install packages/dependencies
- [react](https://fr.reactjs.org/) - For our PWA
- [materialUI](https://mui.com/) - For our components

And of course Trade ARt itself is open source with a [public repository](https://github.com/MathieuVce/TradeArt/) on GitHub.

## Installation

Trade Art requires: 
- [Node.js](https://nodejs.org/) v16+
- [react](https://fr.reactjs.org/) v17+
- [materialUI](https://mui.com/) - V5


Install the dependencies and devDependencies and start the server.

```sh
cd frontend
npm install
npm start
```

```sh
cd fast-api
python3 DB_CREATION.py
python3 main.py
```

#### Building for source

Generating pre-built zip archives for distribution:

```sh
npm run build
```

Deploy on firebase (automatic workflow on accepted PR) 
```sh
firebase deploy
```

Backend deploy (automatic on push in _deploy_ branch)
```sh
https://tradeartfastapi.herokuapp.com/
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:3000/ or https://tradeart-4366d.firebaseapp.com/ or https://tradeart.be
```


