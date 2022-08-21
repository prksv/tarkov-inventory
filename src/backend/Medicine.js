import { Item, ITEM_TYPES } from "./Item";

export class Medicine extends Item {
  maxCapacity = 0;
  capacity = 0;

  constructor(params) {
    super(params, ITEM_TYPES.MEDICINE);

    this.maxCapacity = params.capacity;
    this.capacity = params.capacity;
  }
}
