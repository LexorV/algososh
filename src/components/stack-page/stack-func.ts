import React from "react";
interface IStack<T> {
    push: (item: string) => void
    pop: () => void;
    clear(): void;
    getSize: () => number;
    getElements: () => string[];
}
export class Stack<T> implements IStack<T> {
    arrStack: string[];
    constructor(
        arrStack: string[],
    ) {
        this.arrStack = arrStack
    }
    push = async (
        item: string,
    ) => {
        this.arrStack.push(item);
    };
    pop = async () => {
        this.arrStack.pop()
    };
    clear = () =>
    {
        this.arrStack = [];
    }
    getSize = () => this.arrStack.length;
    getElements = () => this.arrStack;
}

