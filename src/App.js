import InventoryContainer from "./components/InventoryContainer/inventory";
import { Inventory } from "./backend/Inventory";
import aks74u from "./Items/weapons/aks74u.json";
import { Weapon } from "./backend/Weapon";
import {Medicine} from "./backend/Medicine";
import bigAid from './Items/medicine/big_aid.json';
import {Food} from "./backend/Food";
import bootleOfWater from './Items/food/bootleOfWater.json'


function App() {
  const inventory = new Inventory(10, 10);
  inventory.push(new Weapon(aks74u), 0, 0);
  inventory.push(new Weapon(aks74u), 0, 2);
  inventory.push(new Medicine(bigAid), 0, 4);
  inventory.push(new Medicine(bigAid), 2, 4);
  inventory.push(new Food(bootleOfWater), 4, 4);
  console.log(inventory);

  return <InventoryContainer inventory={inventory} />;
}

export default App;
