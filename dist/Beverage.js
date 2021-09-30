"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beverage = void 0;
/**
 * Class representing the beverages.
 */
class Beverage {
    constructor(name, ingredients) {
        this._name = name;
        this._ingredients = ingredients;
    }
    get name() {
        return this._name;
    }
    get ingredients() {
        return this._ingredients;
    }
}
exports.Beverage = Beverage;
//# sourceMappingURL=Beverage.js.map