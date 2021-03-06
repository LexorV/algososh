import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from '../ui/circle/circle';
import { nanoid } from "nanoid";
import { ElementStates } from '../../types/element-states';
import listStyle from './list-page.module.css';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { TobjectText } from '../../types';
import { LinkedList } from './linkedList';
import { Node } from './linkedList';
export const ListPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<number>(0)
  const [listArray, setListArray] = useState<Node<TobjectText>[]>([]);
  const [stateChange, setChange] = useState<boolean>(false);
  const [btnAddHead, setbtnAddHead] = useState<boolean>(false);
  const [btnAddTail, setbtnAddTail] = useState<boolean>(false);
  const [btnDellTail, setbtnDellTail] = useState<boolean>(false);
  const [btnDellHead, setBtnDellHead] = useState<boolean>(false);
  const [btnAddByIndex, setBtnAddByIndex] = useState<boolean>(false);
  const [btnDellByIndex, setDellAddByIndex] = useState<boolean>(false);

  //any т.к. иначе во всех объектах требуется делать проверку на null
  const ref = useRef<any>(null);
  function LinkedListAdd() {
    if (ref.current === null) {
      ref.current = new LinkedList<TobjectText>(listArray);
    }
    return ref.current;
  }
  const linkedList = LinkedListAdd();
  const generatArray = () => {
    for (let i = 0; i < 4; i++) {
      linkedList.append({
        text: String(Math.floor(Math.random() * (99 - 1)) + 1),
        style: ElementStates.Default,
        head: i == 3 ? 'head' : '',
        tail: i == 0 ? 'tail' : ''
      })
    }
    setListArray(linkedList.toArray())
  }
  useEffect(() => {
    generatArray()
  }, []);
  const onFormTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  }
  const onFormindexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(parseInt(e.target.value));
  }
  const headCircleChange = async () => {
    linkedList.head.value.head = <Circle
      letter={textInput}
      state={ElementStates.Changing}
      isSmall={true}
    />
  }
  const headColorChange = async () => {
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
  const addElHead = async () => {
    setStarted(true)
    setbtnAddHead(true)
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
    setTextInput('')
    setbtnAddHead(false)
  }
  const tailColorChange = async () => {
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
  const tailCircleChange = async () => {
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
  const addElTail = async () => {
    setbtnAddTail(true)
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
    setTextInput('')
    setbtnAddTail(false)
  }
  const animDeleteHead = async () => {
    setChange(true)
 
    let text = linkedList.head.value.text
    linkedList.head.value.head = <Circle
      letter={text}
      state={ElementStates.Changing}
      isSmall={true}
    />
    linkedList.head.value.text = '';
    await new Promise<void>((res) => {
      setTimeout(() => {
        res()
      }, 1000)
    });

    linkedList.head.next.value.head = 'head';
    linkedList.head.value.text = '';
    setChange(false)

  }
  const deleteHead = async () => {
    setBtnDellHead(true)
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
    setBtnDellHead(false)

  }
  const animDeleteTail = async () => {
    setChange(true)
    let text = linkedList.tail.value.text
    linkedList.tail.value.tail = <Circle
      letter={text}
      state={ElementStates.Changing}
      isSmall={true}
    />
    linkedList.tail.value.text = '';
    setChange(false)
    setBtnDellHead(false)
  }
  const deleteTail = async () => {
    setbtnDellTail(true)
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
    setbtnDellTail(false)
  }

  const addByIndex = async () => {
    setBtnAddByIndex(true)
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
      />));
    let i = 0;
    while (i <= Number(indexInput)) {
      const copy = [...listArray];
      if (i != 0) {
        copy[i - 1].value.head = ''
        copy[0].value.head = 'head';
        copy[i].value.head = <Circle
          letter={textInput}
          state={ElementStates.Changing}
          isSmall={true} />
        copy[i - 1].value.style = ElementStates.Changing
      }
      else {
        copy[i].value.head = <Circle
          letter={textInput}
          state={ElementStates.Changing}
          isSmall={true}
        />;
      }
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 1000)
      });
      setListArray(copy)
      i++
    }
    if (i > indexInput) {
      const copy = [...listArray];
      copy[i - 1].value.head = '';
      copy.forEach((el) => {
        el.value.style = ElementStates.Default
      })
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 1000)
      });
      await setListArray(linkedList.toArray());
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 1000)
      });
      const copy2 = [...linkedList.toArray()]
      copy2.forEach((el) => {
        el.value.style = ElementStates.Default;
        el.value.head = '';
      })
      copy2[0].value.head = 'head';
      copy2[copy2.length - 1].value.tail = 'tail';
      setListArray(copy2)
    }
    setStarted(false)
    setBtnAddByIndex(false)
  }
  const deleteByIndex = async () => {
    if(indexInput < 0  || indexInput > listArray.length - 1) {
      alert('Ошибка индекса')
    }
    else {
      setStarted(true)
      setDellAddByIndex(true);
    let i = 0;
    while (i <= Number(indexInput)) {
      const copy = [...listArray];
      copy[i].value.style = ElementStates.Changing
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
      });
      setListArray(copy)
      if(i == Number(indexInput)) {
        await new Promise<void>((res) => {
          setTimeout(() => {
            res()
          }, 500)
        });
        let text = copy[i].value.text
        copy[i].value.style = ElementStates.Default;
        copy[i].value.text = '';
        copy[i].value.tail = <Circle
        letter={text}
        state={ElementStates.Changing}
        isSmall={true}
      />
      setChange(true)
      setListArray(copy)
      }
      i++
    }
    if(i>Number(indexInput)) {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 500)
      });
      await linkedList.deleteByIndex(indexInput);
      const copy = [...linkedList.toArray()]
      if(copy.length !== 0) {
        copy.forEach((el) => {
          el.value.style = ElementStates.Default;
        })
        copy[0].value.head = 'head';
        copy[copy.length - 1].value.tail = 'tail';
      }
      setListArray(copy)
      setChange(false)
    }
    setStarted(false)
    setDellAddByIndex(false)
  }
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
            disabled={started || textInput == '' }
            isLoader={btnAddHead}
            text='Добавить в head'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={addElHead}
          />
          <Button
            disabled={started || textInput == '' }
            isLoader={btnAddTail}
            text='Добавить в tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={addElTail}
          />
          <Button
            disabled={started || listArray.length == 1}
            isLoader={btnDellHead}
            text='Удалить из head'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={deleteHead}
          />
          <Button
            disabled={started || listArray.length == 1}
            isLoader={btnDellTail}
            text='Удалить из tail'
            linkedList='big'
            extraClass={listStyle.button_size}
            onClick={deleteTail}
          />
        </div>
        <div className={`${listStyle.box_input} mt-6 mb-40`}>
          <Input
            type="number"
            isLimitText={true}
            maxLength={4}
            value={indexInput}
            onChange={onFormindexChange}
            extraClass={listStyle.input_field_size}
          />
          <Button
            disabled={started || !indexInput || textInput == ''}
            isLoader={btnAddByIndex}
            text='Добавить  по индексу'
            onClick={addByIndex}
            linkedList='big'
          />
          <Button
            disabled={started || indexInput > listArray.length - 1 || listArray.length == 1}
            isLoader={btnDellByIndex}
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
                {listArray.length - 1 != index && (<ArrowIcon />)}
              </li>)
          }))}
        </ul>
      </div>


    </SolutionLayout>
  );
};
