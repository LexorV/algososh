export const fiboAlgo = (
    n: number
) => {
    let arr: number[] = [];
    let arrCopy = []
    for (let i = 0; i < n + 1; i++) {
        if (arr.length < 1) {
            arr.push(0)
            arrCopy.push(JSON.parse(JSON.stringify(arr)))
        }
        else if (arr.length < 2) {
            arr.push(1)
            arrCopy.push(JSON.parse(JSON.stringify(arr)))
        }
        else {
            arr.push(arr[i - 2] + arr[i - 1]);
            arrCopy.push(JSON.parse(JSON.stringify(arr)))
        }
    }
    return arrCopy
}