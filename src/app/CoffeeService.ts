import { Inventory } from './Inventory';
import { Beverage } from './Beverage';

export class CoffeeService {
    private _inventory: Inventory;
    private readonly _totalOutlets: number;
    private _outletsInuse: number;

    constructor(inventory: Inventory, totalOutlets: number) {
        this._inventory = inventory;
        this._totalOutlets = totalOutlets;
        this._outletsInuse = 0;
    }

    /**
     * Function to check if any outlet is available
     */
    public isOutletAvailable(): boolean {
        return this._outletsInuse < this._totalOutlets;
    }

    /**
     * This function is the entry point for preparing beverage.
     * _outletsInuse variable is keeping track of the numbers of outlets in use.
     * Getting the ingredients and preparing the beverage if the ingredients are available.
     * Added sleep of 1 sec to simulate the actual behaviour.
     * @param beverage
     */
    public async prepareBeverage(beverage: Beverage) {
        this._outletsInuse++;
        const isIngredientsAvailable = await this._inventory.getIngredients(beverage);
        if (isIngredientsAvailable) {
            // Preparing hot beverage
            await new Promise(r => setTimeout(r, 1000));
            console.log(`${beverage.name} is prepared`);
        }
        this._outletsInuse--;
    }
}
