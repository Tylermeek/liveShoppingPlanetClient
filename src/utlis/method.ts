import { random } from "lodash-es";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { scaleSizeH, scaleSizeW } from "./scaleSize";

export const isEmptyArr = (arr: any[]) => {
  return Array.isArray(arr) && arr.length === 0;
};

export const randomArr = <T>(arr: T[]) => {
  const len = arr.length;
  if (len === 0) return;
  for (let index = 0; index < len; index++) {
    const targetIndex = random(index, len - 1);
    swipe(arr, index, targetIndex);
  }
};

export const swipe = (arr: any[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const handleMomentumScrollEnd = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
  isEndReached: boolean,
  setIsEndReached: (newStatus: boolean) => void
) => {
  const offsetY = event.nativeEvent.contentOffset.y;
  const contentHeight = event.nativeEvent.contentSize.height;
  const layoutHeight = event.nativeEvent.layoutMeasurement.height;
  const isEndReachedNow =
    offsetY >= contentHeight - layoutHeight - scaleSizeW(200);
  if (isEndReachedNow !== isEndReached) {
    setIsEndReached(isEndReachedNow);
  }
};

export const numberFormat = (num: number): string | number => {
  switch (num.toString().length) {
    case 0:
    case 1:
    case 2:
    case 3:
      return num;
    case 4:
      return `${(num / 1000).toFixed(1)}千`;
    default:
      return `${(num / 10000).toFixed(1)}万`;
  }
};

export function splitAndInterleave<T>(array: T[]): [T[], T[]] {
  const result: [T[], T[]] = [[], []];
  let index = 0;

  for (const item of array) {
    result[index % 2].push(item);
    index++;
  }

  return result;
}
