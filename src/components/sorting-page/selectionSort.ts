import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import {TobjectText} from '../../types/sorting-page';
export const selectionSort = async (
    arr: Array<TobjectText>,
    setindexSort: (n: number) => void,
    setArray: (arr: TobjectText[]) => void,
    direction: Direction
) => {
    const copy = [...arr]
    let minIdx: number;
    for (let i = 0; i < copy.length; i++) {
        minIdx = i;
        for (let j = i + 1; j < copy.length; j++) {
            await new Promise<void>((res) =>
                setTimeout(() => {
                    res()
                }, 1000)
            )
            copy[minIdx].style = ElementStates.Changing
            setindexSort(copy[j].number)
            copy[j].style = ElementStates.Changing
            if (direction === Direction.Ascending) {
                if (copy[j].number < copy[minIdx].number) {
                    copy[minIdx].style = ElementStates.Default
                    minIdx = j;
                }
            }
            else {
                if (copy[j].number > copy[minIdx].number) {
                    copy[minIdx].style = ElementStates.Default
                    minIdx = j;
                }

            }
            if (j > 1) {
                copy[j - 1].style = ElementStates.Default
            }
        }
        const temp = copy[i];
        copy[minIdx].style = ElementStates.Modified
        copy[i] = copy[minIdx];
        copy[minIdx] = temp;
        await new Promise<void>((res) =>
            setTimeout(() => {
                res()
            }, 1000)
        )
        setindexSort(copy[i].number)
        copy[copy.length - 1].style = ElementStates.Default
        if (i == copy.length - 1) {
            copy[copy.length - 1].style = ElementStates.Modified
        }

        setArray(copy)
    }
}