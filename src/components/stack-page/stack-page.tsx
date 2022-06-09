import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import stackStyle from './stack-page.module.css';
import { Stack } from './stack-func'
export const StackPage: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [pushedClick, setPushedClick] = useState<boolean>(true);
  const [startFunc, setStartFunc] = useState<boolean>(false);
  const [popClick, setPopClick] = useState<boolean>(false);
  const [arrStack, setArrStack] = useState<string[]>([]);
  const [colorState, setColorState] = useState<boolean>(false)
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const algoStack = new Stack(arrStack, setArrStack)
  const addEl = () => {
    algoStack.push(textInput, setStartFunc, setColorState);
    algoStack.clear(setTextInput)
  }
  useEffect(() => {
    if (textInput === '') {
      setPushedClick(true)
    }
    else {
      setPushedClick(false)
    }
  }, [textInput])
  const colorBlink = (index: number) => {
    if (arrStack.length === index + 1) {
      if (colorState === true) {
        return ElementStates.Changing
      }
      else {
        return ElementStates.Default
      }
    }
    else {
      return ElementStates.Default
    }
  }
  useEffect(() => {
    setStartFunc(false)
  }, [startFunc]);
  useEffect(() => {
    if (arrStack.length === 0) {
      setPopClick(true)
    }
    else {
      setPopClick(false)
    }
  }, [arrStack.length]);

  return (
    <SolutionLayout title="Стек">
      <div className={stackStyle.box_main}>
        <div className={stackStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={4}
            value={textInput}
            onChange={onFormChange} />
          <Button
            disabled={pushedClick}
            text='Добавить'
            onClick={addEl}
          />
          <Button
            disabled={popClick}
            text='Удалить'
            extraClass={'mr-40'}
            onClick={
              () => algoStack.pop(setStartFunc, setColorState)
            }
          />
          <Button
            disabled={popClick}
            text='Очистить'
            onClick={
              () => setArrStack([])
            }
          />
        </div>
        <ul className={stackStyle.lists_circle}>
          {arrStack.map((list, index) => {
            return (
              <li key={nanoid()} >
                <Circle
                  head={arrStack.length - 1 === index ? 'top' : ''}
                  index={index}
                  letter={list}
                  state={colorBlink(index)}
                />
              </li>)
          })}
        </ul>
      </div>

    </SolutionLayout>
  );
};
