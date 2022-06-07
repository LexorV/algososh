import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Button } from "../ui/button/button";
import { randomNumber} from '../../helper/helper';
import sortingStyle from './sorting-page.module.css'
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column"
import { nanoid } from "nanoid";
import {bubbleSort} from './bubbleSort';
import {ElementStates} from '../../types/element-states';
import {selectionSort} from './selectionSort'
type TobjectText = {
  number: number,
  style:ElementStates
}

export const SortingPage: React.FC = () => {
const [indexSort, setindexSort] = useState<number | null>(null);
const [started, setStarted] = useState<boolean>(false);
const [direction, setDiraction] = useState(Direction.Ascending)

  const [diogrammArr, setDiogrammArr] = useState<TobjectText[]>([]);
  
    const startAlgo = async () => {
    setStarted(true)
    await selectionSort(diogrammArr, setindexSort, setDiogrammArr, direction)
    //await bubbleSort(diogrammArr, setindexSort, setDiogrammArr, direction)
    setStarted(false)
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
    setDiraction(Direction.Ascending)
    startAlgo()
   }
   const descendingSort = () => {
    setDiraction(Direction.Descending)
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
            onClick={descendingSort}
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
