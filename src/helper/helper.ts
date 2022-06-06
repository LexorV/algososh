export const uid = () =>
    Date.now().toString(36) +
    Math.random().toString(36);
export function randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };