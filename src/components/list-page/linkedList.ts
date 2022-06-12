import { pause } from '../../helper/helper';
import { Circle } from '../ui/circle/circle';
export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
import { ElementStates } from '../../types/element-states';

interface ILinkedList<T> {
    append: (element: T) => void;
    getSize: () => number;
    toArray: any;
    prepend: any;
    addByIndex: any;
    deleteByIndex: any;
    deleteHead: any;
    deleteTail: any;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: any;
    private size: number;
    private tail: Node<T> | null;;
    arr: any;
    setArr: any;
    setChange: any;
    setStarted: any;
    constructor(arr: any,
        setArr: any,
        setChange: any,
        setStarted: any) {
        this.arr = arr;
        this.head = null;
        this.size = 0;
        this.tail = null;
        this.setArr = setArr;
        this.setChange = setChange;
        this.setStarted = setStarted;
    }

    addByIndex = async (element: T, index: number, al: any) => {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node<any>(element);
            if (index === 0) {
                this.setChange(true)
                this.head.value.head = al
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
                let prev = null
                curr.value.style = ElementStates.Changing
                curr.value.head = al;
                while (currIndex < index && curr.next) {
                    this.setChange(true)
                    currIndex++
                    await new Promise<void>((res) => {
                        setTimeout(() => {
                            res()
                        }, 1000)
                    });
                    prev = curr
                    prev.value.style = ElementStates.Changing;
                    currIndex === 1 ? prev.value.head = "head" : prev.value.head = '';
                    curr = curr.next;
                    curr.value.head = al;
                    this.setChange(false)
                    if (currIndex == index) {
                        prev.value.head === "head" ? prev.value.head = 'head' : prev.value.head = '';
                        curr.value.head = '';
                        this.defaultColor();

                    }
                    else {
                        curr.value.style = ElementStates.Changing
                        curr.value.head = al;
                    }
                }
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                node.next = curr;
                prev.next = node;
                this.setArr(this.toArray())
                await new Promise<void>((res) => {
                    setTimeout(() => {
                        res()
                    }, 1000)
                });
                prev.next.value.style = ElementStates.Default
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
    deleteByIndex(index: number) {
        if (index >= this.size) {
            throw new Error("error size");
        }
        if (index === 0) {
            return this.deleteHead();
        }
        this.size--;
        let prev = null;
        let curr = this.head;
        for (let i = 0; i < index; i++) {
            prev = curr;
            curr && (curr = curr.next);
        }
        prev && curr && (prev.next = curr.next);
        return this;
    }
    deleteHead() {
        if (!this.head) return null;
        let deletedHead = this.head;

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

    prepend(element: T) {
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
    append = async (element: any) => {
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
