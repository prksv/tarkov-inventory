import { Item, ITEM_TYPES } from "./Item";

export class Weapon extends Item {
  canBeFold = false;

  maxAmmo = 30;

  ammo = 0;

  constructor(params) {
    super(params, ITEM_TYPES.WEAPON);
  }

  addAmmo(count) {
    this.ammo += count;
  }

  fold() {}
}
