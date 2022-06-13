import React, { useState, ChangeEvent, SyntheticEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from '../ui/circle/circle';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { nanoid } from "nanoid";
import fibonacciStyle from './fibonacci-page.module.css';
import {fiboAlgo} from './fiboAlgo';
export const FibonacciPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [arrNumber, setArrNumber] = useState<number[]>([]);
  const startAlgo = async () => {
    setStarted(true)
    animationFibb(fiboAlgo(numberInput));
    setStarted(false)
  }
  const animationFibb = async(arr:number[][]) => {
    for (const element of arr) {
     await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
    });
    setArrNumber(element);
  }
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
              <li key={nanoid()} >
                <Circle letter={list} />
              </li>)
          }))}
        </ul>
      </div>

    </SolutionLayout>
  );
};
