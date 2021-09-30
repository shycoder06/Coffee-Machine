"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoffeeService_1 = require("./CoffeeService");
const Inventory_1 = require("./Inventory");
const Beverage_1 = require("./Beverage");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const Queue_1 = require("./Queue");
/**
 * Reading the test json file and creating js object from it.
 */
const testObjPath = path_1.default.join(__dirname, '../testFiles/case1.json');
const testObjFile = fs.readFileSync(testObjPath).toString();
const testObj = JSON.parse(testObjFile);
/**
 * Getting the total outlets and the initial ingredients from the test object
 */
const totalOutlets = testObj.machine.outlets.count_n;
const initialIngredients = new Map(Object.entries(testObj.machine.total_items_quantity));
/**
 * Creating the inventory object and coffee service object.
 * There will only be a single instance of inventory and coffee service.
 */
const inventory = new Inventory_1.Inventory(initialIngredients);
const coffeeService = new CoffeeService_1.CoffeeService(inventory, totalOutlets);
/**
 * Creating the array of beverages from the test obj
 */
const beveragesIngredientsMap = new Map(Object.entries(testObj.machine.beverages));
let beverages = [];
beveragesIngredientsMap.forEach(((value, key) => {
    const beverageName = key;
    const ingredients = new Map(Object.entries(value));
    const beverage = new Beverage_1.Beverage(beverageName, ingredients);
    beverages = beverages.concat(beverage);
}));
/**
 * Adding all the beverages requested in to the queue to simulate real environment
 */
const beverageQueue = new Queue_1.Queue();
beverages.forEach((beverage) => {
    beverageQueue.enqueue(beverage);
});
/**
 * If the beverage queue has any beverage to process and
 * any outlet is free then preparing the beverage.
 * coffeeService.prepareBeverage is an async function so that we can prepare multiple beverages asynchronously.
 */
const processBeverage = () => {
    if (beverageQueue.isEmpty()) {
        return;
    }
    if (coffeeService.isOutletAvailable()) {
        const beverage = beverageQueue.dequeue();
        coffeeService.prepareBeverage(beverage);
    }
};
/**
 * Calling the prepare beverage function every 1 sec to check for the queue.
 */
(async () => {
    setInterval(processBeverage, 1000);
})();
//# sourceMappingURL=main.js.map