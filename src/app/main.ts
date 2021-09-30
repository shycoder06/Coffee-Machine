import { CoffeeService } from './CoffeeService';
import { Inventory } from './Inventory';
import { Beverage } from './Beverage';
import path from 'path';
import * as fs from 'fs';
import { Queue } from './Queue';


/**
 * Reading the test json file and creating js object from it.
 */
const testObjPath = path.join(__dirname, '../testFiles/case1.json');
const testObjFile = fs.readFileSync(testObjPath).toString();
const testObj = JSON.parse(testObjFile);

/**
 * Getting the total outlets and the initial ingredients from the test object
 */
const totalOutlets = testObj.machine.outlets.count_n;
const initialIngredients = new Map(Object.entries(testObj.machine.total_items_quantity)) as Map<string, number>;

/**
 * Creating the inventory object and coffee service object.
 * There will only be a single instance of inventory and coffee service.
 */
const inventory = new Inventory(initialIngredients);
const coffeeService = new CoffeeService(inventory, totalOutlets);

/**
 * Creating the array of beverages from the test obj
 */
const beveragesIngredientsMap = new Map(Object.entries(testObj.machine.beverages)) as Map<string, object>;
let beverages: Beverage[] = [];
beveragesIngredientsMap.forEach(((value, key) => {
    const beverageName = key;
    const ingredients = new Map(Object.entries(value)) as Map<string, number>;
    const beverage = new Beverage(beverageName, ingredients);
    beverages = beverages.concat(beverage);
}));

/**
 * Adding all the beverages requested in to the queue to simulate real environment
 */
const beverageQueue: Queue<Beverage> = new Queue();
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




