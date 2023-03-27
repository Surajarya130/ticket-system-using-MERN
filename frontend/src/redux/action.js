import { Add_To_Cart, Rem_To_Cart } from "./constant";

export const remToCart = (data) => {
  console.log("Rem Cart Worked", data);

  return {
    type: Rem_To_Cart,
    data,
  };
};

export const addToCart = (data) => {
  console.log("add to cart from action file", data);
  return {
    type: Add_To_Cart,
    data,
  };
};
