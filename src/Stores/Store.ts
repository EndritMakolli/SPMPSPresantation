import { createContext, useContext } from "react";
import UserStore from "./UserStore";

export const Store = {
  userStore: new UserStore(),
};

export const StoreContext = createContext(Store);

export function useStore() {
  return useContext(StoreContext);
}
