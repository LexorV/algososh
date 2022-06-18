import React, { useState, ChangeEvent, SyntheticEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyle from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { nanoid } from "nanoid";
import {TobjectText} from '../../types';
import { stringSort } from "./srtringSort";
export const StringComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [arrText, setArrText] = useState<TobjectText[]>([]);
  const [started, setStarted] = useState<boolean>(false)
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const animationString = async(arr:TobjectText[][]) => {
    for (const element of arr) {
     await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 1000)
    });
    setArrText(element);
  }
  }
  const startAlgo = async (arr:TobjectText[]) => {
    setStarted(true)
    const arrayCopy = stringSort(arr);
    arrayCopy && (await animationString(arrayCopy))
    setStarted(false)
  }
  const onChangeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    let textInputArr = textInput.split('');
    const arrObjText = textInputArr.map((el, index) => {
      return {
        id:index,
        text:el,
        style:ElementStates.Default
      }
    })
   startAlgo(arrObjText);
  }
  return (
    <SolutionLayout title="Строка">
      <div className={stringStyle.box_main}>
        <form onSubmit={onChangeForm} className={stringStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={11}
            value={textInput}
            onChange={onFormChange} />
          <Button isLoader={started} type="submit" text='Развернуть' />
        </form>
        <ul className={stringStyle.lists_circle}>
          {arrText.map((list) => {
          return  (
          <li key={nanoid()} >
            <Circle state={list.style} letter={list.text} />
          </li>)})}
        </ul>
      </div>
    </SolutionLayout>
  );
};
