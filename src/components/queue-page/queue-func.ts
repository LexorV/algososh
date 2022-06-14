import { TobjectText } from '../../types';
interface IQueue {
    enqueue: (
        item: string,
        queueArray: TobjectText[],
    ) => void;
    dequeue: (
        queueArray: TobjectText[],
    ) => void;
    getElements: () => TobjectText[];
    clear: () => void;
}
export class Queue implements IQueue {
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
    private arrObj: TobjectText[] = [];
    constructor(size: number) {
        this.size = size;
    }
    enqueue = (
        item: string,
        queueArray: TobjectText[],
    ) => {
        this.arrObj = (JSON.parse(JSON.stringify(queueArray)));
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (this.tail === this.size && this.tail <= this.size) {
            this.arrObj[this.tail].tail = '';
        }
        this.arrObj[this.tail].text = item;
        this.arrObj[this.tail].tail = 'tail';
        if (this.length >= 1) {
            this.arrObj[this.tail - 1].tail = ''
        }
        if (this.head == 0) {
            this.arrObj[this.head].head = 'head';
        }
        if (this.length > 0) {
        }
        this.length++;
        this.tail++;
        return this.arrObj
    };
    dequeue = (
        queueArray: TobjectText[],
    ) => {
        if (this.head === this.size) {
            this.head = 0;
        }
        this.arrObj = JSON.parse(JSON.stringify(queueArray));
        this.head++
        this.length--;
        if (this.isEmpty()) {
        }
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
        return this.arrObj
    };
    getElements = () => this.arrObj;
    isEmpty = () => this.length === 0;
    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.arrObj = [];
    };

}