import { random } from "lodash-es";

export const isEmptyArr = (arr: any[]) => {
  return Array.isArray(arr) && arr.length === 0;
};

export const randomArr = (arr: any[]) => {
  const len = arr.length;
  if (len === 0) return arr;
  for (let index = 0; index < len; index++) {
    const targetIndex = random(index, len - 1);
    swipe(arr, index, targetIndex);
  }
};

export const swipe = (arr:any[], i:number, j:number) => {
   [arr[i], arr[j]] = [arr[j], arr[i]]
};
