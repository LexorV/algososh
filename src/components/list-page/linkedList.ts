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
    addByIndex: (element:TobjectText, index: number) => void;
    deleteByIndex: (index:number,) => void;
    deleteHead: () => void;
    deleteTail: () => void;
}
export class LinkedList<T> implements ILinkedList {
    private head:  Node<TobjectText> | null;
    private size: number;
    private tail: Node<TobjectText> | null;
    arr: Node<TobjectText>[];
    constructor(
        arr: Node<TobjectText>[],)
        {
        this.arr = arr;
        this.head = null;
        this.size = 0;
        this.tail = null;
    }

    addByIndex = async (element: TobjectText, index: number) => {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);
            if (index === 0 && this.head) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;
                let prev = null;
                while (currIndex < index) {
                    prev = curr;
                    curr && (curr = curr.next);
                    currIndex++
                }
                node.next = curr;
                prev && (prev.next = node);
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
    deleteByIndex = async (index: number) => {
        if (index >= this.size) {
            throw new Error("error size");
        }
        if (index === 0) {
            return this.deleteHead();
        }
        let prev = null;
        let curr = this.head;
        let currentIndex = 0;
        while (currentIndex < index) {
            currentIndex++
            prev = curr;
            curr && (curr = curr.next);
        }
        if(prev && curr) {
            curr.next == null;
            prev.next = curr.next;
        }
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
