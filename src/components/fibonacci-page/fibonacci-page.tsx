import React, { useState, ChangeEvent, SyntheticEvent, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from '../ui/circle/circle';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import {uid} from '../../helper/helper';
import fibonacciStyle from './fibonacci-page.module.css'
export const FibonacciPage: React.FC = () => {
  const [textInput, setTextInput] = useState<number | string>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [arrText, setArrText] = useState<number[]>([]);
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const onChangeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
       <div className={fibonacciStyle.box_main}>
        <form onSubmit={onChangeForm} className={fibonacciStyle.box_input}>
          <Input type="number" isLimitText={true}
            maxLength={19}
            value={textInput}
            onChange={onFormChange} />
          <Button isLoader={started} type="submit" text='Расчитать' />
        </form>
        <ul className={fibonacciStyle.lists_circle}>
          { started && (arrText.map((list) => {
          return  (
          <li key={uid()} >
            <Circle letter={list} />
          </li>)}))}
        </ul>
      </div>
     
    </SolutionLayout>
  );
};
