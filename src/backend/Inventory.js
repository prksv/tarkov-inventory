export class Inventory {
  items = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  push(item, x = null, y = null) {
    item.id = this.items.length + 1;
    item.position = { x, y };
    this.items.push(item);
  }

  move(item, cellID) {
    item.position.x = cellID % this.width;
    item.position.y = Math.floor(cellID / this.width);
  }

  canBePlaced(item, cellID) {
    let canBePlaced = true;
    let cells = [];

    this.items.forEach((itemForCheck) => {
      let busyCells = [];

      let cell = itemForCheck.position.x + this.width * itemForCheck.position.y;
        for (let i = 0; i < itemForCheck.width; i++) {
          busyCells.push(cell + i);
          for (let h = 1; h < itemForCheck.height; h++) {
            busyCells.push(cell + i + this.width * h);
          }
        }

      for (let i = 0; i < item.width; i++) {
        if (busyCells.includes(cellID + i)) {
          canBePlaced = false;
        }

        for (let h = 1; h < item.height; h++) {
          if (busyCells.includes(cellID + i + this.width * h)) {
            canBePlaced = false;
          }
        }
      }
    });

    let newCell;
    for (let i = 0; i < item.width; i++) {
      newCell = cellID + i;
      if (newCell % this.width === 0) {
        canBePlaced = false;
        break;
      } else {
        cells.push(newCell);
      }

      for (let h = 1; h < item.height; h++) {
        newCell = cellID + i + this.width * h;
        if (newCell % this.width === 0) {
          canBePlaced = false;
          break;
        } else {
          cells.push(newCell);
        }

      }
    }

    return { canBePlaced, cells };
  }
}
