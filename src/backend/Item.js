export const ITEM_TYPES = {
  WEAPON: "weapon",
  CASE: "case",
  MEDICINE: "medicine",
  FOOD: "food"
};

export class Item {
  width = 1;
  height = 1;
  title = "item";
  type = "";

  position = {
    x: 0,
    y: 0,
  };

  constructor(params, type) {
    this.width = params.width;
    this.height = params.height;
    this.type = type;
    this.title = params.title;
    this.icon = params.icon;


  }

  move(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
}
