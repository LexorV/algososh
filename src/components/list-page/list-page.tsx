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
import {pause} from '../../helper/helper'

export const ListPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<number>()
  const [listArray, setListArray] = useState<any[]>([]);
  const [stateChange, setChange] = useState<boolean>(false);
  const ref = useRef<any>(null);
  function LinkedListAdd() {
    if (ref.current === null) {
      ref.current = new LinkedList(listArray, setListArray, setChange, setStarted);
    }
    return ref.current;
  }
  const linkedList =  LinkedListAdd();
  const generatArray = () => {
    for (let i = 0; i < 4; i++) {
      linkedList.append({
        text: String(Math.floor(Math.random() * (99 - 1)) + 1),
        style: ElementStates.Default,
        head: i == 3 ? 'head':'',
        tail: i == 0 ? 'tail':''
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
const headCircleChange =  async() => {
  linkedList.head.value.head = <Circle
  letter={textInput}
  state={ElementStates.Changing}
  isSmall={true}
/>
}
const headColorChange = async() => {
  linkedList.head.value.head = 'head';
  linkedList.head.next.value.head = '';
  setChange(true)
  linkedList.head.value.style = ElementStates.Modified
  await new Promise<void>((res) => {
    setTimeout(() => {
        res()
    }, 1000)
});
linkedList.head.value.style = ElementStates.Default
setChange(false)
}
  const addElHead = async() => {
    setStarted(true)
    headCircleChange()
    await new Promise<void>((res) => {
      setTimeout(() => {
          res()
      }, 1000)
  });
    linkedList.append({
      text: textInput,
      style: ElementStates.Default,
      head: '',
      tail: ''
    })
    headColorChange()
    setListArray(linkedList.toArray())
    setStarted(false)
  }
  const tailColorChange = async() => {
    console.log( linkedList.tail)
    linkedList.tail.value.tail = '';
    setChange(true)
    linkedList.tail.value.style = ElementStates.Modified
    await new Promise<void>((res) => {
      setTimeout(() => {
          res()
      }, 1000)
  });
  linkedList.tail.value.style = ElementStates.Default;
  linkedList.tail.value.tail = 'tail'
setChange(false)
}
  const tailCircleChange =  async() => {
    setChange(true)
    linkedList.tail.value.tail = <Circle
    letter={textInput}
    state={ElementStates.Changing}
    isSmall={true}
  />
  await new Promise<void>((res) => {
    setTimeout(() => {
        res()
    }, 1000)
});
linkedList.tail.value.tail = ''
setChange(false)
  }
  const addElTail = async() => {
    setStarted(true)
    tailCircleChange()
    await new Promise<void>((res) => {
      setTimeout(() => {
          res()
      }, 1000)
  });
    linkedList.prepend({
      text: textInput,
      style: ElementStates.Modified,
      head: '',
      tail: 'tail'
    })
    tailColorChange()
    setListArray(linkedList.toArray())
    setStarted(false)
  }
  const animDeleteHead = async() => {
    setChange(true)
    linkedList.head.next.value.head = 'head';
    let text = linkedList.head.value.text
    linkedList.head.value.head = <Circle
    letter={text}
    state={ElementStates.Changing}
    isSmall={true}
  />
  linkedList.head.value.text = '';
  setChange(false)

  }
  const deleteHead = async() => {
    setStarted(true)
    animDeleteHead()
    await new Promise<void>((res) => {
      setTimeout(() => {
          res()
      }, 1000)
  });
    linkedList.deleteHead()
    setListArray(linkedList.toArray())
    setStarted(false)
  }
const animDeleteTail = async() => {
  setChange(true)
  let text = linkedList.tail.value.text
  linkedList.tail.value.tail = <Circle
  letter={text}
  state={ElementStates.Changing}
  isSmall={true}
/>
linkedList.tail.value.text = '';
setChange(false)
}
  const deleteTail = async() => {
    setStarted(true)
    animDeleteTail()
    await new Promise<void>((res) => {
      setTimeout(() => {
          res()
      }, 1000)
  });
    linkedList.deleteTail();
    linkedList.tail.value.tail = 'tail'
    setListArray(linkedList.toArray())
    setStarted(false)
  }
  const addByIndex = async() => {
    setStarted(true)
    await linkedList.addByIndex({
      text: textInput,
      style: ElementStates.Modified,
      head: '',
      tail: ''
    }, indexInput, (
    <Circle
    letter={textInput}
    state={ElementStates.Changing}
    isSmall={true}
  />))
    console.log(linkedList.head)
    setStarted(false)
    setListArray(linkedList.toArray());
  }
  const deleteByIndex  = () => {
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
            onClick={addElHead}
          />
          <Button
            disabled={started}
            text='Добавить в tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={addElTail}
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
            onClick={addByIndex}
            linkedList='big'
          />
          <Button
            disabled={started}
            text='Удалить по индексу'
            linkedList='big'
            onClick={deleteByIndex}
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
