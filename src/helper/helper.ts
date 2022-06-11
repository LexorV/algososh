export const uid = () =>
    Date.now().toString(36) +
    Math.random().toString(36);
export function randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
export const pause = () => {
     new Promise<void>((res) => {
        setTimeout(() => {
            res()
        }, 1000)
    })
}