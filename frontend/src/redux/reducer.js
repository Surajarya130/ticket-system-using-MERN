import { Add_To_Cart, Rem_To_Cart } from "./constant";

export const cartData = (data = [], action) => {
  switch (action) {
    case action.type === Add_To_Cart:
      return data;

    case action.type === Rem_To_Cart:
      return 1 - 1;

    default:
      return data;
  }
};
