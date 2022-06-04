import React, { useState, ChangeEvent, SyntheticEvent, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyle from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import {uid} from '../../helper/helper';
type TobjectText = {
  id: number,
  text: string,
  style:any
}
export const StringComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [arrText, setArrText] = useState<TobjectText[]>([]);
  const [hightIndex, setHight] = useState<number | null>(null)
  const [started, setStarted] = useState<boolean>(false)
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const stringSort = async (
    arrText: Array<TobjectText>,
    setHight: (n: number) => void,
    setArrText: (arrText: Array<TobjectText>) => void,
  ) => {
    const copy = [...arrText];
    let low = 0;
    let hight = copy.length - 1;
    const left = copy[low]
    const right = copy[hight]
    if (!copy) {
      return;
    }
    while (low <= hight) {
      copy[low].style = ElementStates.Changing
      copy[hight].style = ElementStates.Changing
      if(left.text <= right.text) {
        await new Promise<void>((res) => {
          setTimeout(() => {
            res()
          }, 1000)
        })
        setHight(hight)
        copy[low].style = ElementStates.Modified
        copy[hight].style = ElementStates.Modified
        const x = copy[low]
        copy[low] = copy[hight]
        copy[hight] = x
        low++;
        hight--;
        setArrText(copy)
      }
      else {
        low++;
        hight--;
      }
    }
    setArrText(copy)
  }
  const startAlgo = async () => {
    setStarted(true)
    await stringSort(arrText, setHight, setArrText)
    setStarted(false)
    setHight(null)
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
    setArrText(arrObjText);
  }
  useEffect(() => {
    if(arrText.length > 1 && started == false) {
      startAlgo()
      }
    },[arrText])
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
          <li key={uid()} >
            <Circle state={list.style} letter={list.text} />
          </li>)})}
        </ul>
      </div>
    </SolutionLayout>
  );
};
