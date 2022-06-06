import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Button } from "../ui/button/button";
import { randomNumber, swap } from '../../helper/helper';
import sortingStyle from './sorting-page.module.css'
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column"
import { nanoid } from "nanoid";
import {bubbleSort} from './bubbleSort'
import {ElementStates} from '../../types/element-states'
type TobjectText = {
  number: number,
  style:ElementStates
}

export const SortingPage: React.FC = () => {
const [left, setLeft] = useState<number | null>(null);
const [right, setRight] = useState<number | null>(null);
const [started, setStarted] = useState<boolean>(false);

  const [diogrammArr, setDiogrammArr] = useState<TobjectText[]>([]);
  const selectionSort = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
              if (arr[maxInd] < arr[j]) {
                  maxInd = j;
            }
            }
            swap(arr, i, maxInd )
          }
          return arr
        };
    const startAlgo = async () => {
    setStarted(true)
    await bubbleSort(diogrammArr, setLeft, setRight, setDiogrammArr)
    setStarted(false)
    setLeft(null)
    setRight(null)
  }
  const newArr = () => {
    let arrRandom =  randomArr()
    const arrObj = arrRandom.map((el) => {
      return {
        number:el,
        style:ElementStates.Default
      }
    })
    return arrObj
  }
  const newArrClick = () => {
    setDiogrammArr(newArr())

  }
  const randomArr = () => {
    const arr = [];
    let arrLenght = randomNumber(1, 17)
    for (let i = 0; i <= arrLenght; i++) {
      arr.push(randomNumber(1, 100))
    }
    return arr
  }
   const ascendingSort = () => {
    startAlgo()
   }
  useEffect(() => {
    setDiogrammArr(newArr())
  }, [])
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.main}>
        <div className={sortingStyle.box_menu}>
          <RadioInput
            extraClass={'mr-20'}
            label="Выбор"
            name='choice'
            checked />
          <RadioInput
            extraClass={'mr-25'}
            label="Пузырёк"
            name='choice' />
          <Button
            sorting={Direction.Ascending}
            isLoader={started}
            extraClass={'mr-6'}
            onClick={ascendingSort}
            text="По возрастанию" />
          <Button
            sorting={Direction.Descending}
            extraClass={'mr-40'}
            text="По убыванию" />
          <Button
            onClick={newArrClick}
            text="Новый массив" />
        </div>
        <div className={sortingStyle.box_diogram}>
          {diogrammArr.map((el) => {
            return (
              <Column
                key={nanoid()}
                index={el.number}
                state = {el.style}
                />
                
            )
          })}
        </div>

      </div>


    </SolutionLayout>
  );
};
