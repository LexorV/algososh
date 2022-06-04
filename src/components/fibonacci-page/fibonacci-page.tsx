import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from '../ui/circle/circle';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { uid } from '../../helper/helper';
import fibonacciStyle from './fibonacci-page.module.css'
export const FibonacciPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [indexfib, setIndexfib] = useState<number | null>(null)
  const [arrNumber, setArrNumber] = useState<number[]>([]);
  const fiboAlgo = async (
    n: number
  ) => {
    let arr: number[] = [];
    for (let i = 0; i < n + 1; i++) {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
      })
      if(arr.length < 1) {
        arr.push(0)
        setIndexfib(i)
        setArrNumber(arr)
      }
      else if(arr.length < 2) {
        arr.push(1)
        setIndexfib(i)
        setArrNumber(arr)
      }
      else {
        arr.push(arr[i - 2] + arr[i - 1])
        setIndexfib(i)
        setArrNumber(arr)
      }
    }
  }
  const startAlgo = async () => {
    setStarted(true)
    await fiboAlgo(numberInput)
    setStarted(false)
  }
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberInput(parseInt(e.target.value));
  }
  const onChangeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    startAlgo()
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciStyle.box_main}>
        <form onSubmit={onChangeForm} className={fibonacciStyle.box_input}>
          <Input
            type="number"
            isLimitText={true}
            max={19}
            value={numberInput}
            onChange={onFormChange} />
          <Button isLoader={started} type="submit" text='Расчитать' />
        </form>
        <ul className={fibonacciStyle.lists_circle}>
          {arrNumber.length >= 1 && (arrNumber.map((list) => {
            return (
              <li key={uid()} >
                <Circle letter={list} />
              </li>)
          }))}
        </ul>
      </div>

    </SolutionLayout>
  );
};
