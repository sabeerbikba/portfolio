import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default (...inputs: ClassValue[]) => twMerge(clsx(inputs));
