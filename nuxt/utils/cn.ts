import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
