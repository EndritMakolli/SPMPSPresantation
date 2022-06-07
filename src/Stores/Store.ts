import { createContext, useContext } from "react";
import BusScheduleStore from "./BusScheduleStore";
import StudentStore from "./StudentStore";
import UserStore from "./UserStore";

export const Store = {
  userStore: new UserStore(),
  busScheduleStore: new BusScheduleStore(),
  studentStore: new StudentStore(),
};

export const StoreContext = createContext(Store);

export function useStore() {
  return useContext(StoreContext);
}
