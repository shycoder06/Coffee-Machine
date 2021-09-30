"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeService = void 0;
class CoffeeService {
    constructor(inventory, totalOutlets) {
        this._inventory = inventory;
        this._totalOutlets = totalOutlets;
        this._outletsInuse = 0;
    }
    /**
     * Function to check if any outlet is available
     */
    isOutletAvailable() {
        return this._outletsInuse < this._totalOutlets;
    }
    /**
     * This function is the entry point for preparing beverage.
     * _outletsInuse variable is keeping track of the numbers of outlets in use.
     * Getting the ingredients and preparing the beverage if the ingredients are available.
     * Added sleep of 1 sec to simulate the actual behaviour.
     * @param beverage
     */
    async prepareBeverage(beverage) {
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
exports.CoffeeService = CoffeeService;
//# sourceMappingURL=CoffeeService.js.map