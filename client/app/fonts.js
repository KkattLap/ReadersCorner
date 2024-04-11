import { Open_Sans } from "next/font/google";
import { Lora } from "next/font/google";

// Usual text
export const openSans = Open_Sans({
  subsets: ["latin"],
  //   weight: "800",
});

// Headers, names, accents, buttons
export const lora = Lora({
  subsets: ["latin"],
});
