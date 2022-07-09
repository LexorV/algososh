import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import { TobjectText } from '../../types/sorting-page';

export const bubbleSort = (
    arr: Array<TobjectText>,
    direction: Direction

) => {
    if(arr.length > 1) {
    const copy = [...arr]
    const arrCopy = [];
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length - 1 - i; j++) {
            const right = copy[j + 1]
            const left = copy[j]
            if (j >= 1) {
                const left2 = copy[j - 1]
                left2.style = ElementStates.Default
            }
            right.style = ElementStates.Changing;
            left.style = ElementStates.Changing;
            arrCopy.push(JSON.parse(JSON.stringify(copy)));
            if (direction === Direction.Ascending) {
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
                copy[copy.length - i - 1].style = ElementStates.Modified;
                copy[copy.length - i - 2].style = ElementStates.Default;
                arrCopy.push(JSON.parse(JSON.stringify(copy)));
            }
            if (copy.length - i - 2 == 0) {
                copy[0].style = ElementStates.Modified
                arrCopy.push(JSON.parse(JSON.stringify(copy)));
            }
        }
    }
    return arrCopy
}
    return [arr];
}