import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyle from './string.module.css';
import {Circle} from '../ui/circle/circle'


export const StringComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [arrText, setArrText] = useState<string[]>([])
  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const onChangeForm = (e: SyntheticEvent) => {
    e.preventDefault();
    setArrText(textInput.split(''))
}
  return (
    <SolutionLayout title="Строка">
      <div className={stringStyle.box_main}>
        <form onSubmit={onChangeForm} className={stringStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={11}
            value={textInput}
            onChange={onFormChange} />
          <Button type="submit" text='Развернуть' />
        </form>
        <ul className={stringStyle.lists_circle}>

          {arrText.map((list, index) => (<li key={index} ><Circle letter={list} /> </li>)) }
        </ul>
      </div>
    </SolutionLayout>
  );
};
