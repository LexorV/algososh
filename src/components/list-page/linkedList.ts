import {ReactElement} from "react";
import { ElementStates } from '../../types/element-states';
import {TobjectText} from '../../types'
export class Node<T> {
    value: T | TobjectText
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
export interface ILinkedList {
    append: (element: TobjectText) => void;
    getSize: () => number;
    toArray: () => void;
    prepend: (element: TobjectText) => void
    addByIndex: (element:TobjectText, index: number, al:ReactElement) => void;
    deleteByIndex: (
        index:number,
        cicleCallback: (text:string | number) => ReactElement) => void;
    deleteHead: () => void;
    deleteTail: () => void;
}
export class LinkedList<T> implements ILinkedList {
    private head:  Node<TobjectText> | null;
    private size: number;
    private tail: Node<TobjectText> | null;
    arr: Node<TobjectText>[];
    setArr: React.Dispatch<React.SetStateAction<Node<TobjectText>[]>>;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
    constructor(
        arr: Node<TobjectText>[],
        setArr: React.Dispatch<React.SetStateAction<Node<TobjectText>[]>>,
        setChange: React.Dispatch<React.SetStateAction<boolean>>,
        setStarted: React.Dispatch<React.SetStateAction<boolean>>) 
        {
        this.arr = arr;
        this.head = null;
        this.size = 0;
        this.tail = null;
        this.setArr = setArr;
        this.setChange = setChange;
        this.setStarted = setStarted;
    }

    addByIndex = async (element: TobjectText, index: number, al: ReactElement) => {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);
            if (index === 0 && this.head) {
                this.setChange(true)
                console.log(this.head)
                this.head.value && (this.head.value.head = al)
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                this.setChange(false)
                node.next = this.head;
                node.value.head = 'head'
                this.head.value.head = ''
                this.head = node;
                this.setArr(this.toArray());
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                node.value.style = ElementStates.Default
            } else {
                let curr = this.head;
                let currIndex = 0;
                let prev = null;
                if(curr) {
                    curr.value.style = ElementStates.Changing
                    curr.value.head = al;
                }
                while (currIndex < index) {
                    this.setChange(true)
                    currIndex++
                    await new Promise<void>((res) => {
                        setTimeout(() => {
                            res()
                        }, 1000)
                    });
                    prev = curr;
                    if(prev) {
                    prev.value.style = ElementStates.Changing;
                    currIndex === 1 ? prev.value.head = "head" : prev.value.head = '';
                    curr && (curr = curr.next);
                    curr && (curr.value.head = al);
                    this.setChange(false)
                    if (currIndex == index && curr) {
                        prev.value.head === "head" ? prev.value.head = 'head' : prev.value.head = '';
                        curr.value.head = '';
                        this.defaultColor();
                    }

                    }
                    else {
                        if(curr) {
                        curr.value.style = ElementStates.Changing
                        curr.value.head = al;
                        }
                    }
                }
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                node.next = curr;
                prev && (prev.next = node);
                this.setArr(this.toArray())
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                prev && prev.next && (prev.next.value.style = ElementStates.Default)
            }
            this.size++;
        }
    }
    defaultColor() {
        let currentNode = this.head;
        while (currentNode) {
            currentNode.value.style = ElementStates.Default
            currentNode = currentNode.next;
        }
    }
    deleteByIndex = async (index: number, cicleCallback: (text:string | number) => ReactElement) => {
        if (index >= this.size) {
            throw new Error("error size");
        }
        if (index === 0) {
            return this.deleteHead();
        }
        let prev = null;
        let curr = this.head;
        let currentIndex = 0;
        curr && (curr.value.style = ElementStates.Changing)
        while (currentIndex < index) {
            this.setChange(true)
            currentIndex++
            await new Promise<void>((res) => {
                setTimeout(() => {
                    res()
                }, 1000)
            });
            prev = curr;
            curr && (curr = curr.next);
            this.setChange(false)

            if (currentIndex == index && curr) {
                this.setChange(true)
                let text = curr.value.text
                curr.value.style = ElementStates.Changing;
                this.setArr(this.toArray());
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                curr.value.text = '';
                curr.value.style = ElementStates.Default;
                curr.value.tail = cicleCallback(text);
                this.setChange(false);
            }
            else {
                curr && (curr.value.style = ElementStates.Changing)


            }

        }
        await new Promise<void>((res) => {
            setTimeout(() => {
                res()
            }, 1000)
        });
        if(prev && curr) {
            curr.next == null && (prev.value.tail = 'tail');
            prev.next = curr.next;
        }
        this.defaultColor();
        this.setArr(this.toArray());

        this.size--;
        return this;
    }
    deleteHead() {
        if (!this.head) return null;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return this;
    }
    deleteTail() {
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
        let current = this.head;
        while (current?.next) {
            if (!current.next.next) {
                current.next = null;
            } else {
                current = current.next;
            }
        }

        this.tail = current;
        return this;
    }

    prepend(element: TobjectText) {
        const node = new Node(element);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.size++
        return this
    }
    append = async (element: TobjectText) => {
        const node = new Node(element, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node
        }
        this.size++
        return this
    }
    toArray = () => {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next;
        }
        return nodes;
    }

    getSize() {
        return this.size;
    }
}
