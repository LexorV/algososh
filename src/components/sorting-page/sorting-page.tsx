import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "../ui/button/button";
import { randomNumber } from '../../utils/utils';
import sortingStyle from './sorting-page.module.css'
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column"
import { nanoid } from "nanoid";
import { bubbleSort } from './bubbleSort';
import { ElementStates } from '../../types/element-states';
import { selectionSort } from './selectionSort';
import { TobjectText } from '../../types/sorting-page';
export const SortingPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [direction, setDiraction] = useState(Direction.Ascending);
  const [radioBabel, setRadioBabel] = useState(false);
  const [radioSelection, setRadioSelection] = useState(true);
  const [diogrammArr, setDiogrammArr] = useState<TobjectText[]>([]);
  const startAlgo = async () => {
    setStarted(true)
    if (radioSelection) {
      let selector = selectionSort(diogrammArr, direction);
      animationSelection(selector)
    }
    else {
      let bubble = bubbleSort(diogrammArr, direction);
      animationBublle(bubble);
    }
    setStarted(false)
  }
  const animationSelection = async (arr: TobjectText[][]) => {
    for (const element of arr) {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
      });
      setDiogrammArr(element);
    }
  }
  const animationBublle = async (arr: TobjectText[][]) => {
    for (const element of arr) {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
      });
      setDiogrammArr(element);
    }
  }



  const newArr = () => {
    let arrRandom = randomArr()
    const arrObj = arrRandom.map((el) => {
      return {
        number: el,
        style: ElementStates.Default
      }
    })
    return arrObj
  }
  const newArrClick = () => {
    setDiogrammArr(newArr())
  }
  const randomArr = () => {
    const arr = [];
    let arrLenght = randomNumber(3, 17)
    for (let i = 0; i <= arrLenght; i++) {
      arr.push(randomNumber(1, 100))
    }
    return arr
  }
  const onBabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioBabel(true);
    setRadioSelection(false);
  }
  const onSelectionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioBabel(false);
    setRadioSelection(true);
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
    //console.log(bubbleSort([{number:30, style:ElementStates.Default},{number:67, style:ElementStates.Default}], Direction.Ascending))
    console.log(selectionSort([{number:67, style:ElementStates.Default},{number:30, style:ElementStates.Default}], Direction.Ascending))
  }, [])
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.main}>
        <div className={sortingStyle.box_menu}>
          <RadioInput
            extraClass={'mr-20'}
            label="Выбор"
            name='choice'
            checked={radioSelection}
            onChange={onSelectionChange}
          />
          <RadioInput
            extraClass={'mr-25'}
            label="Пузырёк"
            name='choice'
            checked={radioBabel}
            onChange={onBabelChange}
          />
          <Button
            sorting={Direction.Ascending}
            isLoader={direction === Direction.Ascending ? started : false}
            extraClass={'mr-6'}
            onClick={ascendingSort}
            disabled={started}
            text="По возрастанию" />
          <Button
            sorting={Direction.Descending}
            extraClass={'mr-40'}
            onClick={descendingSort}
            text="По убыванию"
            disabled={started}
            isLoader={direction === Direction.Descending ? started : false}
          />
          <Button
            onClick={newArrClick}
            disabled={started}
            text="Новый массив" />
        </div>
        <div className={sortingStyle.box_diogram}>
          {diogrammArr.map((el) => {
            return (
              <Column
                key={nanoid()}
                index={el.number}
                state={el.style}
              />
            )
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
