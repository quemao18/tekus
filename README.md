# Tekus Test Project

## Clone Project

Run `git clone git@github.com:quemao18/tekus.git`
## Install

Enter in directory tekus and run `npm install` 

## Install API

Run `cd api && npm install`

## Run API
Enter in directory tekus

Run `npm run api` or `cd api && npm run dev`
The api run in port 3001, you can test opening a browser or postman method GET
http://localhost:3001/

For get price of BTC by day
http://localhost:3001/btc?date=2022-02-09

## Run Project Local for development 

Enter in directory tekus and open 2 terminals

Terminal 1
Run `npm run start`

Terminal 2
Run `npm run api`

## Run APP electron

Enter in directory tekus and open 2 terminals

Terminal 1
Run `npm run api`  

Terminal 2
Run `npm run electron`
## Running unit tests

Run `ng test` to execute the unit tests

## Values environments

You can change the environment variables; apiUrl, cop, eur, and time refresh of BTC in the environmnet file.
