/**
 * Class representing the beverages.
 */
export class Beverage {
    private _name: string;
    private _ingredients: Map<string, number>;

    constructor(name: string, ingredients: Map<string, number>) {
        this._name = name;
        this._ingredients = ingredients
    }

    public get name() {
        return this._name;
    }

    public get ingredients() {
        return this._ingredients;
    }
}
