import { Add_To_Cart, Rem_To_Cart } from "./constant";

export const remToCart = (data) => {
  return {
    type: Rem_To_Cart,
    data,
  };
};

export const addToCart = (data) => {
  return {
    type: Add_To_Cart,
    data,
  };
};
