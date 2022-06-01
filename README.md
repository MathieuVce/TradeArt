# TradeArt
## _Online Saling Art Platform_

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
- - [materialUI](https://mui.com/) - V5


Install the dependencies and devDependencies and start the server.

```sh
cd frontend
npm install
npm start
```

```sh
cd backend
python3 DB_CREATION.py
python3 API_Function.py
```

#### Building for source

Generating pre-built zip archives for distribution:

```sh
cd frontend
npm build
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:3000/
```
