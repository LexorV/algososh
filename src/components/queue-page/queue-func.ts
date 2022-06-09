import { TobjectText } from '../../types';
import { ElementStates } from '../../types/element-states';
import React from "react";
interface IQueue<T> {
    enqueue: (
        item: string,
        setQueueArray:  React.Dispatch<React.SetStateAction<TobjectText[]>>,
        queueArray: TobjectText[],
        colorState: React.Dispatch<React.SetStateAction<boolean>>,
        setIsMaxArr:React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    dequeue:(
        setQueueArray: React.Dispatch<React.SetStateAction<TobjectText[]>>,
        queueArray: TobjectText[],
        colorState: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getElements: () => TobjectText[];
    clear: () => void;
}
export class Queue<T> implements IQueue<T> {
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
    private arrObj: TobjectText[] = [];
    constructor(size: number) {
        this.size = size;
    }
    enqueue = async (
        item: string,
        setQueueArray: React.Dispatch<React.SetStateAction<TobjectText[]>>,
        queueArray: TobjectText[],
        colorState: React.Dispatch<React.SetStateAction<boolean>>,
        setIsMaxArr: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        this.arrObj = [...queueArray];
        if (this.length >= this.size || this.tail > this.size) {
            setIsMaxArr(true)
            throw new Error("Maximum length exceeded");
        }
        if (this.tail === this.size && this.tail <= this.size) {
            this.arrObj[this.tail].tail = '';
        }
        colorState(true)
        this.arrObj[this.tail].style = ElementStates.Changing;
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 500)
        })
        this.arrObj[this.tail].style = ElementStates.Default;
        colorState(false)
        this.arrObj[this.tail].text = item;
        this.arrObj[this.tail].tail = 'tail';
        if (this.length >= 1) {
            this.arrObj[this.tail - 1].tail = ''
        }
        if (this.head == 0) {
            this.arrObj[this.head].head = 'head';
        }
        setQueueArray(this.arrObj)
        this.length++;
        this.tail++;
    };
    dequeue = async (setQueueArray: any,
        queueArray: TobjectText[],
        colorState:  React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        if (this.head === this.size) {
            this.head = 0;
        }
        this.arrObj = [...queueArray];
        this.head++
        this.length--;
        colorState(true)
        this.arrObj[this.head - 1].style = ElementStates.Changing;
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 500)
        })
        this.arrObj[this.head - 1].style = ElementStates.Default;
        colorState(false)
        if (this.head === this.tail) {
            this.arrObj[this.tail - 1].tail = '';
            this.arrObj[this.tail - 1].text = ''
            this.head--
            this.length++
        }
        else {
            this.arrObj[this.head % this.size - 1].text = '';
            this.arrObj[this.head % this.size].head = 'head';
            this.arrObj[this.head % this.size - 1].head = '';
        }
        setQueueArray(this.arrObj)
    };
    getElements =  () => this.arrObj;
    isEmpty = () => this.length === 0;
    clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.arrObj = [];
    };

}