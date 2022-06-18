import {TobjectText} from '../../types';
import { ElementStates } from '../../types/element-states';
export const stringSort = (
    arrText: Array<TobjectText>,
  ) => {
    const copy = [...arrText];
    const arrCopy = [];
    let low = 0;
    let hight = copy.length - 1;
    const left = copy[low];
    const right = copy[hight];
    if (!copy) {
      return;
    }
    arrCopy.push(JSON.parse(JSON.stringify(copy)));
    while (low <= hight) {
      if(left.text <= right.text) {
        copy[low].style = ElementStates.Changing;
        copy[hight].style = ElementStates.Changing;
        arrCopy.push(JSON.parse(JSON.stringify(copy)));
        const x = copy[low];
        copy[low] = copy[hight];
        copy[hight] = x;
        copy[low].style = ElementStates.Modified;
        copy[hight].style = ElementStates.Modified;
        arrCopy.push(JSON.parse(JSON.stringify(copy)));
        low++;
        hight--;
      }
      else {
        low++;
        hight--;
      }
    }
    return arrCopy
  }