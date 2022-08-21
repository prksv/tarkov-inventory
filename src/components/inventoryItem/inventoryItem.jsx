import React, { useEffect, useState } from "react";
import styles from "./inventoryItem.module.scss";
import { useDrag } from "react-dnd";
import classNames from "classnames";
import { ITEM_TYPES } from "../../backend/Item";

function InventoryItem({ item, size, setActiveItem, setHintsActive }) {
  const ITEMS_COLORS = {
    [ITEM_TYPES.WEAPON]: "rgba(0,0,0,0.53)",
    [ITEM_TYPES.MEDICINE]: "rgba(178,33,2,0.51)",
      [ITEM_TYPES.FOOD]: "rgba(23,93,3,0.51)",
  };

  const [{ dragging, mouse }, drag, preview] = useDrag(
    () => ({
      type: item.type,
      item,
      collect: (monitor) => ({
        dragging: monitor.isDragging(),
        mouse: monitor.getClientOffset(),
      }),
      end: (item, monitor) => {},
    }),
    []
  );
  useEffect(() => {
    setHintsActive(dragging);
      console.log(item)
    if (dragging) {
      setActiveItem(item);
    }
  }, [dragging]);

  return (
    <>
      {dragging && (
        <div
          className={styles.root__ghost}
          style={{
            width: item.width * size,
            height: item.height * size,
            left: dragging ? mouse.x - 30 : "auto",
            top: dragging ? mouse.y - 10 : "auto",
            backgroundImage: `url(${item.icon})`,
          }}
        />
      )}
      <div
        style={{
          width: item.width * size,
          height: item.height * size,
          backgroundColor: ITEMS_COLORS[item.type],
          backgroundImage: `url(${item.icon})`,
          left: item.position.x * size + "px",
          top: item.position.y * size + "px",
        }}
        ref={drag}
        className={classNames(styles.root, {
          [styles["root--disabled"]]: dragging,
        })}
      >
        <div className={styles["root--title"]}>{item.title}</div>
        {item.maxAmmo && (
          <div className={styles["root__ammo"]}>
            <span className={styles["root__ammo--now"]}>{item.ammo} </span>
            <span className={styles["root__ammo--max"]}>/ {item.maxAmmo}</span>
          </div>
        )}

          {item.maxCapacity && (
              <div className={styles["root__capacity"]}>
                  <span className={styles["root__capacity--now"]}>{item.capacity} </span>
                  <span className={styles["root__capacity--max"]}>/ {item.maxCapacity}</span>
              </div>
          )}
      </div>
    </>
  );
}

export default InventoryItem;
