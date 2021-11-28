import { name } from "faker";

export const generateRandomNumber = (maxNumber = 110) =>
  Math.floor(Math.random() * (maxNumber + 1));

export const generateRandomName = () => name.findName();
