import {pause} from '../../helper/helper'
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
    addByIndex:any;
    deleteByIndex:any;
    deleteHead:any;
    deleteTail:any;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    private tail: Node<T> | null;;
    arr:any;
    setArr: any;
    setChange:any;
    setStarted:any;
    constructor(arr: any,
         setArr: any,
         setChange:any, 
          setStarted:any) {
        this.arr = arr;
        this.head = null;
        this.size = 0;
        this.tail = null;
        this.setArr = setArr;
        this.setChange = setChange;
        this.setStarted = setStarted;
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);
            if (index === 0) {
                node.next = this.head
                this.head = node;
            } else if (this.head) {
                let curr = this.head;
                let currIndex = 0;
                while (currIndex + 1 < index && curr.next) {
                    curr = curr.next;
                    currIndex++
                }
                let trap = curr.next
                curr.next = node
                node.next = trap
            }

            this.size++;
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
    append = async(element: any) => {
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
