import React, { useState, ChangeEvent, SyntheticEvent, useRef, useEffect, useLayoutEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyle from './string.module.css';
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states';
export const StringComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [arrText, setArrText] = useState<string[]>([]);
  const [leftIndex, setLeft] = useState<number | null>(null)
  const [rightIndex, setRight] = useState<number | null>(null)
  const [started, setStarted] = useState<boolean>(false)
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const uid = () => Date.now().toString(36) + Math.random().toString(36);
/*
  const sortArr = (arr: string[]) => {
    for (let n = 0; n < arr.length; n++) {
      for (let i = 0; i <= arr.length - 1 - n; i++) {
        if (arr[i] < arr[i + 1]) {
          let el1 = arr[i]
          let el2 = arr[i + 1]
          arr[i] = el2;
          arr[i + 1] = el1;
        }
      }
    }
  }*/

  const bubbleSort = async (
    arrText: Array<string>,
    setLeft: (n: number) => void,
    setRight: (n: number) => void,
    setArrText: (arrText: Array<string>) => void,
  ) => {
    const copy = [...arrText]
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - 1 - i; j++) {
        const right = copy[j + 1]
        const left = copy[j]
        await new Promise<void>((res) => {
          setTimeout(() => {
            res()
          }, 1000)
        })
        setLeft(j)
        setRight(j + 1)
        if (left > right) {
          const x = copy[j]
          copy[j] = copy[j + 1]
          copy[j + 1] = x
        }
        setArrText(copy)
      }
    }
  }
  const startAlgo = async () => {
    setStarted(true)
    await bubbleSort(arrText, setLeft, setRight, setArrText)
    setStarted(false)
    setLeft(null)
    setRight(null)
  }
  const onChangeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    let textInputArr = textInput.split('');
    setArrText(textInputArr);
  }
 
  useEffect(() => {
    console.log(started)

    if(arrText.length > 1 && started == false) {
     
      startAlgo()
      /*
        let timer =  setTimeout(() => {
          sortArr(arrText)
          setArrText([...arrText])
        }, 1000);
        return () => {
          clearTimeout(timer);
        };*/
      }
    },[arrText])
  /*
  useEffect(() => {
      clearTimeout(timerRef.current as NodeJS.Timeout)
  }, []);*/
 // console.log(arrText);

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

          {arrText.map((list, index) => { 
          return  (
          <li key={uid()} >
            <Circle index={index} state={ElementStates.Changing} letter={list} />
          </li>)})}
        </ul>
      </div>
    </SolutionLayout>
  );
};
