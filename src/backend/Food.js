import { Item, ITEM_TYPES } from "./Item";

export class Food extends Item {
  maxCapacity = 0;
  capacity = 0;
  useOnce = true;

  constructor(params) {
    super(params, ITEM_TYPES.FOOD);

    this.maxCapacity = params.capacity;
    this.capacity = params.capacity;
    this.useOnce = params.useOnce;
  }
}
