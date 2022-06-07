import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import stackStyle from './stack-page.module.css';
type TobjectText = {
  id: number,
  text: string,
  style: any
}
export const StackPage: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [started, setStarted] = useState<boolean>(false);
  const [arrText, setArrText] = useState<TobjectText[]>([]);
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  return (
    <SolutionLayout title="Стек">
      <div className={stackStyle.box_main}>
        <div className={stackStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={4}
            value={textInput}
            onChange={onFormChange} />
          <Button
            disabled={started}
            text='Добавить' />
          <Button
            disabled={started}
            text='Удалить'
            extraClass={'mr-40'}
          />
          <Button
            disabled={started}
            text='Очистить' />
        </div>
        <ul className={stackStyle.lists_circle}>
          {arrText.map((list) => {
            return (
              <li key={nanoid()} >
                <Circle state={list.style} letter={list.text} />
              </li>)
          })}
        </ul>
      </div>

    </SolutionLayout>
  );
};
