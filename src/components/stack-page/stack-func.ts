import React from "react";
interface IStack<T> {
    push: (item: string,
        setStart: React.Dispatch<React.SetStateAction<boolean>>,
        setterColor: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
    pop: (
        setStart: React.Dispatch<React.SetStateAction<boolean>>,
        setterColor: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getSize: () => number;
    getElements: () => string[];
}
export class Stack<T> implements IStack<T> {
    arrStack: string[];
    setArrStack: React.Dispatch<React.SetStateAction<string[]>>;
    constructor(
        arrStack: string[],
        setArrStack: React.Dispatch<React.SetStateAction<string[]>>,
    ) {
        this.arrStack = arrStack
        this.setArrStack = setArrStack
    }
    push = async (
        item: string,
        setStart: React.Dispatch<React.SetStateAction<boolean>>,
        setterColor: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setterColor(true)
        this.arrStack.push(item);
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 1000)
        })
        setterColor(false)
        setStart(true)
        this.setArrStack(this.arrStack)
    };
    pop = async (
        setStart: React.Dispatch<React.SetStateAction<boolean>>,
        setterColor: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setterColor(true)
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 1000)
        })
        this.arrStack.pop()
        setStart(true)
        this.setArrStack(this.arrStack)
        setterColor(false)
    };
    getSize = () => this.arrStack.length;
    getElements = () => this.arrStack;
}

