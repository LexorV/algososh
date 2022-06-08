import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import queueStyle from './queue-page.module.css';
const generatArray = () => {
  const arr = []
for(let i = 0; i < 7; i++) {
  arr.push('')
}
return arr
}

export const QueuePage: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [pushedClick, setPushedClick] = useState<boolean>(true);
  const [startFunc, setStartFunc] = useState<boolean>(false);
  const [popClick, setPopClick] = useState<boolean>(false);
  const [arrStack, setArrStack] = useState<string[]>(generatArray());
  const [colorState, setColorState] = useState<boolean>(false);
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const addEl = () => {
    console.log('edd')
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
            disabled={pushedClick}
            text='Добавить'
            onClick={addEl}
          />
          <Button
            disabled={popClick}
            text='Удалить'
            extraClass={'mr-40'}
            onClick={
              () => console.log('test')
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
        <ul className={queueStyle.lists_circle}>
          {arrStack.map((list, index) => {
            return (
              <li key={nanoid()} >
                <Circle
                  head={arrStack.length - 1 === index ? 'top' : ''}
                  index={index}
                  letter={list}
                  state={ElementStates.Default}
                />
              </li>)
          })}
        </ul>
      </div>

    </SolutionLayout>
  );
};
