import React, { useState, ChangeEvent, SyntheticEvent, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import listStyle from './list-page.module.css';
import {ArrowIcon} from '../ui/icons/arrow-icon';
import  { TobjectText } from '../../types';
import {LinkedList } from './linkedList';

export const ListPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<number>()
  const [listArray, setListArray] = useState<any[]>([]);
  const ref = useRef<any>(null);
  function LinkedListAdd() {
    if (ref.current === null) {
      ref.current = new LinkedList(listArray, setListArray);
    }
    return ref.current;
  }
  const linkedList =  LinkedListAdd();
  const generatArray = () => {
    for (let i = 0; i < 4; i++) {
      linkedList.append({
        text: String(Math.floor(Math.random() * (99 - 1)) + 1),
        style: ElementStates.Default,
        head: '',
        tail: ''
      })
    }
    setListArray(linkedList.toArray())
  }
  useEffect(() => {
    generatArray()
  }, [])
 const onFormTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const onFormindexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(parseInt(e.target.value));
  }

  const addEl = () => {
    linkedList.append({
      text: textInput,
      style: ElementStates.Default,
      head: '',
      tail: ''
    })
    setListArray(linkedList.toArray())
  }
  const addEl1 = () => {
    linkedList.prepend({
      text: textInput,
      style: ElementStates.Default,
      head: '',
      tail: ''
    })
    console.log(linkedList)
    setListArray(linkedList.toArray())
  }
  const deleteHead = () => {
    linkedList.deleteHead()
    setListArray(linkedList.toArray())
  }
  const deleteTail = () => {
    linkedList.deleteTail();
    setListArray(linkedList.toArray())
  }
  const addElIndex = () => {
    linkedList.addByIndex({
      text: textInput,
      style: ElementStates.Default,
      head: '',
      tail: ''
    }, indexInput)
    setListArray(linkedList.toArray())
  }
  const dellElIndex  = () => {
    linkedList.deleteByIndex(indexInput);
    setListArray(linkedList.toArray())
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
            onClick={addEl1}
          />
          <Button
            disabled={started}
            text='Удалить из head'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={deleteHead}
          />
           <Button
            disabled={started}
            text='Удалить из tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={deleteTail}
          />
        </div>
        <div className={`${listStyle.box_input} mt-6 mb-40`}>
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
            onClick={addElIndex}
            linkedList='big'
          />
          <Button
            disabled={started}
            text='Удалить по индексу'
            linkedList='big'
            onClick={dellElIndex}
          />
        </div>
        <ul className={listStyle.lists_circle}>
          {listArray.length > 0 && (listArray.map((list, index) => {
            return (
              <li className={listStyle.list} key={nanoid()} >
                <Circle
                  head={list.value.head}
                  index={index}
                  letter={list.value.text}
                  state={list.value.style}
                  tail={list.value.tail}
                />
                {listArray.length - 1 != index && (<ArrowIcon/>)}
              </li>)
          }))}
        </ul>
      </div>


    </SolutionLayout>
  );
};
