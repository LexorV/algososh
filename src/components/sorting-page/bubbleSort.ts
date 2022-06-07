import {ElementStates} from '../../types/element-states'
import { Direction } from "../../types/direction";
type TobjectText = {
    number: number,
    style:ElementStates
  }
export const bubbleSort = async (
    arr: Array<TobjectText>,
    indexSort: (n: number) => void,
    setArray: (arr:TobjectText[]) => void,
    direction:Direction

) => {
    const copy = [...arr]
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length - 1 - i; j++) {
            const right = copy[j + 1]
            const left = copy[j]
            await new Promise<void>((res) => {
                setTimeout(() => {
                    res()
                }, 1000)
            },)
            if(j >= 1) {
                const left2 =  copy[j - 1]
                left2.style = ElementStates.Default
            }
            right.style = ElementStates.Changing;
            left.style = ElementStates.Changing;
            indexSort(j)
            if(direction === Direction.Ascending) {
                if (left.number < right.number) {
                    const x = copy[j]
                    copy[j] = copy[j + 1]
                    copy[j + 1] = x
                }
            }
            else {
                    if (left.number > right.number) {
                        const x = copy[j]
                        copy[j] = copy[j + 1]
                        copy[j + 1] = x
                    }
            }
            if (j === copy.length - i - 2) {
                copy[copy.length - i - 1].style = ElementStates.Modified
                copy[copy.length - i - 2].style = ElementStates.Default
            }
            if(copy.length - i - 2 == 0) {
                copy[0].style = ElementStates.Modified
            }
            setArray(copy)
        }
    }
}