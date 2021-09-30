# Coffee Machine Simulator

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version v12.13.1

# Getting started
- Install dependencies
```
cd Coffee-Machine-Simulator
npm install
```
- Build and run the project
```
npm start
```
- To add new test file
```
Put the json test file in coffee-machine/testFiles and update the file name in main.ts at line number 12 where we are defining testObjPath as follows:

>> const testObjPath = path.join(__dirname, '../testFiles/<fileName>.json');
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- 
| **dist**                 | Contains the distributable (or output) from the TypeScript build.
| **node_modules**         | Contains all npm dependencies                                                            
| **src**                  | Contains source code that will be compiled to the dist dir                               
| package.json             | Contains npm dependencies as well as build scripts  
| tsconfig.json            | Config settings for compiling source code only written in TypeScript    
| tslint.json              | Config settings for TSLint code style checking                                                