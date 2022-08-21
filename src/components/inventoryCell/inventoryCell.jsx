import React, { useEffect } from "react";
import styles from "./inventoryCell.module.scss";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import {ITEM_TYPES} from "../../backend/Item";

function InventoryCell({ id, size, onOver, active, canBePlaced, moveItem }) {
  const style = { "--size": `${size}px` };

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ITEM_TYPES.MEDICINE, ITEM_TYPES.WEAPON, ITEM_TYPES.FOOD],
    item: { id },
    drop: (item, monitor) => {
      console.log(id)
      moveItem(item, id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (isOver) {
      onOver(id);
    }
  }, [isOver]);

  return (
    <div
      style={style}
      ref={drop}
      className={classNames(styles.root, {
        [styles["root--active"]]: active && canBePlaced,
        [styles["root--inactive"]]: active && !canBePlaced,
      })}
    ></div>
  );
}

export default InventoryCell;
