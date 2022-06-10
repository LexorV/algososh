import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import listStyle from './list-page.module.css';
export const ListPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<number>()
  const [listArray, setListArray] = useState<[]>([]);

 const onFormTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const onFormindexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(parseInt(e.target.value));
  }

  const addEl = () => {
    console.log('test')
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={listStyle.box_main}>
        <div className={listStyle.box_input}>
          <Input type="text" isLimitText={true}
            maxLength={4}
            value={textInput}
            onChange={onFormTextChange}
            extraClass={listStyle.input_field_size}
            />
          <Button
            disabled={started}
            text='Добавить в head'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={addEl}
          />
          <Button
            disabled={started}
            text='Добавить в tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={
              () => console.log('test')
            }
          />
          <Button
            disabled={started}
            text='Удалить из head'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={() => console.log('test')
            }
          />
           <Button
            disabled={started}
            text='Удалить из tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={() => console.log('test')
            }
          />
        </div>
        <div className={`${listStyle.box_input} mt-6 mb-45`}>
          <Input 
          type="number"
           isLimitText={started}
            maxLength={4}
            value={indexInput}
            onChange={onFormindexChange}
            extraClass={listStyle.input_field_size}
            />
          <Button
            disabled={started}
            text='Добавить  по индексу'
            onClick={addEl}
            linkedList='big'
          />
          <Button
            disabled={started}
            text='Удалить по индексу'
            linkedList='big'
            onClick={
              () => console.log('test')
            }
          />
        </div>
        <ul className={listStyle.lists_circle}>
          {listArray.map((list, index) => {
            return (
              <li key={nanoid()} >
                <Circle
                />
              </li>)
          })}
        </ul>
      </div>


    </SolutionLayout>
  );
};
