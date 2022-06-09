import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import queueStyle from './queue-page.module.css';
import {TobjectText} from '../../types';
import {Queue} from './queue-func';
const generatArray = () => {
  const arr = []
for(let i = 0; i < 7; i++) {
  arr.push(
    {
      id:i,
      text:'',
      style:ElementStates.Default,
      head:'',
      tail:''
    }
  )
}
return arr
}
const algoQueue = new Queue(7);
export const QueuePage: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [pushedClick, setPushedClick] = useState<boolean>(true);
  const [isMaxArr, setIsMaxArr] = useState<boolean>(false);
  const [isMinArr, setIsMinArr] = useState<boolean>(true)
  const [ queueArray, setQueueArray] = useState<TobjectText[]>(generatArray());
  const [colorState, setColorState] = useState<boolean>(false);
  const [isClear, setIsClear] = useState<boolean>(true)
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const clearArr = () => {
    setQueueArray(generatArray())
    algoQueue.clear()
    setIsClear(true)
    setIsMaxArr(false)
  }
  useEffect(() => {
  }, [])
  const addEl = () => {
    algoQueue.enqueue(textInput,
       setQueueArray, 
       queueArray, 
       setColorState,
       setIsMaxArr
       )
    setIsClear(false)
    setTextInput('')
  }
  useEffect(() => {
    if (textInput === '') {
      setPushedClick(true)
    }
    else {
      setPushedClick(false)
    }
  }, [textInput])
  return (
    <SolutionLayout title="Очередь">
       <div className={queueStyle.box_main}>
        <div className={queueStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={4}
            value={textInput}
            onChange={onFormChange} />
          <Button
            disabled={isMaxArr}
            text='Добавить'
            onClick={addEl}
          />
          <Button
            disabled={isMinArr}
            text='Удалить'
            extraClass={'mr-40'}
            onClick={
              () => algoQueue.dequeue(
                setQueueArray,
                 queueArray,
                  setColorState)
            }
          />
          <Button
            disabled={isClear}
            text='Очистить'
            onClick={clearArr}
          />
        </div>
        <ul className={queueStyle.lists_circle}>
          {queueArray.map((list, index) => {
            return (
              <li key={nanoid()} >
                <Circle
                  head={list.head}
                  index={index}
                  letter={list.text}
                  state={list.style}
                  tail={list.tail}
                />
              </li>)
          })}
        </ul>
      </div>

    </SolutionLayout>
  );
};
