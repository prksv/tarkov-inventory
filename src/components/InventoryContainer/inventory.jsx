import React, { useEffect, useState } from "react";
import _ from "lodash";
import InventoryCell from "../inventoryCell/inventoryCell";
import styles from "./inventory.module.scss";
import InventoryItem from "../inventoryItem/inventoryItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

function InventoryContainer({ inventory }) {
  const CELL_SIZE = 60;

  const style = {
    maxWidth: inventory.width * CELL_SIZE + "px",
    minWidth: inventory.width * CELL_SIZE + "px",
    minHeight: inventory.height * CELL_SIZE + "px",
    maxHeight: inventory.height * CELL_SIZE + "px",
  };

  const [hoveredCell, setHoveredCell] = useState();
  const [activeItem, setActiveItem] = useState();
  const [activeCells, setActiveCells] = useState([]);
  const [itemCanBePlaced, setItemCanBePlaced] = useState(false);
  const [hintsActive, setHintsActive] = useState(false);

  const [items, setItems] = useState(inventory.items);

  useEffect(() => {
    if (activeItem && hoveredCell) {
      const { canBePlaced, cells } = inventory.canBePlaced(
        activeItem,
        hoveredCell
      );
      setActiveCells(cells);
      setItemCanBePlaced(canBePlaced);
    }
  }, [hoveredCell]);

  function moveItem(item, cellID) {
    const { canBePlaced, cells } = inventory.canBePlaced(item, cellID);
    console.log(canBePlaced)
    if (canBePlaced) {
      inventory.move(item, cellID);
      setItems([...inventory.items]);
    }
  }

  useEffect(() => {
    console.log("update");
  }, [items]);

  return (
    <DndProvider
      backend={TouchBackend}
      options={{ enableTouchEvents: false, enableMouseEvents: true }}
    >
      <div className={styles.root} style={style}>
        {_.times(inventory.width * inventory.height, (key) => (
          <InventoryCell
            key={key}
            id={key}
            active={hintsActive && activeCells.includes(key)}
            canBePlaced={itemCanBePlaced}
            moveItem={moveItem}
            size={CELL_SIZE}
            onOver={(cellID) => {
              setHoveredCell(cellID);
            }}
          />
        ))}
        {items.map((item, key) => {
          return (
            <InventoryItem
              item={item}
              key={key}
              size={CELL_SIZE}
              setActiveItem={setActiveItem}
              setHintsActive={setHintsActive}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}

export default InventoryContainer;
