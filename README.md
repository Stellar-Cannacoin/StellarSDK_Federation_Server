# Stellar SDK Federation Server<br>
Simple Stellar Federation server running on Node.js & Mongo DB

## How a federation server works
* You need to add a `stellar.toml` file on the server (root-domain) in the `.well-known` folder (this needs to be a root-level domain such as `lobstr.co` & `stashapp.cloud`<br>
* Final URI would look like this: `https://lobstr.co/.well-known/stellar.toml`<br>
* Then add the following to the file. (Please note that the federation server URI can be a subdomain such as api.lobstr.co)
`FEDERATION_SERVER="https://lobstr.co"`

## Getting started<br>
You need to have MongoDB installed on the machine you want to host the federation lookup server

### Running the server
1. Start by cloning this repo `git clone`
2. Run `npm install` to install necessary dependencies
3. Start the server with `node server.js` or `pm2 start server.js` (if you are using PM2)
-------------
Thats it, it starts up on port `9008` by default. This can easily be changed in the `server.js` file
