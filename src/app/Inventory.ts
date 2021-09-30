import { Beverage } from './Beverage';

export class Inventory {
    private _ingredients: Map<string, number>;
    private _inUse: boolean;

    constructor(ingredients: Map<string, number>) {
        this._ingredients = ingredients;
        this._inUse = false;
    }

    /**
     * Utility function to check all the ingredients in inventory.
     */
    public get ingredients() {
        return this._ingredients;
    }

    /**
     * Utility function to update the ingredient in inventory.
     * @param key
     * @param value
     */
    public updateIngredient(key: string, value: number) {
        if (this._ingredients.has(key)) {
            const currentAmount = this._ingredients.get(key);
            this._ingredients.set(key, value + currentAmount);
        } else {
            this._ingredients.set(key, value);
        }
    }

    /**
     * Deduct the ingredient from the inventory
     * @param key
     * @param value
     * @private
     */
    private deduct(key: string, value: number) {
        const updatedAmount = this._ingredients.get(key) - value;
        this._ingredients.set(key, updatedAmount);
    }

    /**
     * If the inventory is being used by another outlet then wait for 1 sec and
     * check again.
     * If the ingredients are available then deduct the ingredients and return.
     * If not available, then alert which ingredients are not available.
     * @param beverage
     */
    public async getIngredients(beverage: Beverage) {
        if (this._inUse) {
            await new Promise(r => setTimeout(r, 1000));
            return this.getIngredients(beverage);
        }
        this._inUse = true;
        const isIngredientsAvailable = await this.isIngredientsAvailable(beverage);
        if (isIngredientsAvailable) {
            await new Promise(r => setTimeout(r, 1000));
            beverage.ingredients.forEach(((value, key) => {
                this.deduct(key, value);
            }));
            this._inUse = false;
            return true;
        }
        this._inUse = false;
        return false;
    }

    /**
     * Checking if the ingredients required for the beverage are available in the inventory
     * Putting a sleep of 1 second to simulate the actual behavior.
     * Reporting the ingredient which is not available/sufficient.
     * @param beverage
     * @private
     */
    private async isIngredientsAvailable(beverage: Beverage): Promise<boolean> {
        await new Promise(r => setTimeout(r, 1000));
        for (const [key, value] of beverage.ingredients) {
            if (!this._ingredients.has(key)) {
                console.log(`${beverage.name} cannot be prepared because ${key} is not available`);
                return false;
            } else if (this._ingredients.get(key) < value) {
                console.log(`${beverage.name} cannot be prepared because item ${key} is not sufficient`);
                return false;
            }
        }
        return true;
    }
}
