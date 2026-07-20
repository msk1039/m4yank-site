import dotsLight from "../assets/patterns/dots.svg?raw";
import dotsDark from "../assets/patterns/dots-dark.svg?raw";
import pattern2Light from "../assets/patterns/pattern2.svg?raw";
import pattern2Dark from "../assets/patterns/pattern2-dark.svg?raw";
import pattern3Light from "../assets/patterns/pattern3.svg?raw";
import pattern3Dark from "../assets/patterns/pattern3-dark.svg?raw";

const toDataUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg.trim())}")`;

export const patterns = {
  dots: {
    light: toDataUrl(dotsLight),
    dark: toDataUrl(dotsDark),
  },
  pattern2: {
    light: toDataUrl(pattern2Light),
    dark: toDataUrl(pattern2Dark),
  },
  pattern3: {
    light: toDataUrl(pattern3Light),
    dark: toDataUrl(pattern3Dark),
  },
} as const;

export type PatternName = keyof typeof patterns;
