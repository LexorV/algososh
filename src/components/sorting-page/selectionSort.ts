import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import {TobjectText} from '../../types/sorting-page';
export const selectionSort = (
    arr: Array<TobjectText>,
    direction: Direction
) => {
    const copy = [...arr]
    let minIdx: number;
    const arrCopy = []

    for (let i = 0; i < copy.length; i++) {
        minIdx = i;
        for (let j = i + 1; j < copy.length; j++) {
            copy[minIdx].style = ElementStates.Changing
            copy[j].style = ElementStates.Changing
            arrCopy.push(JSON.parse(JSON.stringify(copy)));
            if (direction === Direction.Ascending) {
                if (copy[j].number < copy[minIdx].number) {
                    copy[minIdx].style = ElementStates.Default;
                    arrCopy.push(JSON.parse(JSON.stringify(copy)));
                    minIdx = j;
                }
            }
            else {
                if (copy[j].number > copy[minIdx].number) {
                    copy[minIdx].style = ElementStates.Default;
                    arrCopy.push(JSON.parse(JSON.stringify(copy)));
                    minIdx = j;
                }

            }
            if (j > 1) {
                copy[j - 1].style = ElementStates.Default;
                arrCopy.push(JSON.parse(JSON.stringify(copy)));
            }
        }
        const temp = copy[i];
        copy[minIdx].style = ElementStates.Modified;
        arrCopy.push(JSON.parse(JSON.stringify(copy)));
        copy[i] = copy[minIdx];
        copy[minIdx] = temp;
        copy[copy.length - 1].style = ElementStates.Default;
        arrCopy.push(JSON.parse(JSON.stringify(copy)));
        if (i == copy.length - 1) {
            copy[copy.length - 1].style = ElementStates.Modified;
            arrCopy.push(JSON.parse(JSON.stringify(copy)));
        }
    }
    return arrCopy
}