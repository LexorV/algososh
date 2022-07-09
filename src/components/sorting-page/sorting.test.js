import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
describe('test bubbleSort', () => {
test('Тестирование алгоритма сортировки пузырьком c массивом из нескольких элементов', () => {
    expect(bubbleSort([
            { number: 30, style: ElementStates.Default },
            { number: 67, style: ElementStates.Default }
        ],
        Direction.Ascending)).toEqual([
        [
            { number: 30, style: ElementStates.Changing },
            { number: 67, style: ElementStates.Changing }
        ],
        [
            { number: 67, style: ElementStates.Default },
            { number: 30, style: ElementStates.Modified }
        ],
        [
            { number: 67, style: ElementStates.Modified },
            { number: 30, style: ElementStates.Modified }
        ],
    ])
})
test('Тестирование алгоритма сортировки пузырьком c пустым массивом', () => {
    expect(bubbleSort([],
        Direction.Ascending)).toEqual([
        []
    ])
})


test('Тестирование алгоритма сортировки пузырьком c массивом из одного элемента', () => {
    expect(bubbleSort([{ number: 30, style: ElementStates.Default }],
        Direction.Ascending)).toEqual([
        [{ number: 30, style: ElementStates.Default }]
    ])
})
})
describe('test selectionSort', () => {
test('Тестирование алгоритма сортировки выбором c пустым массивом', () => {
    expect(selectionSort([],
        Direction.Ascending)).toEqual([
        []
    ])
})
test('Тестирование алгоритма сортировки выбором c массивом из одного элемента', () => {
    expect(selectionSort([{ number: 30, style: ElementStates.Default }],
        Direction.Ascending)).toEqual([
        [{ number: 30, style: ElementStates.Default }]
    ])
})
test('Тестирование алгоритма сортировки выбором c массивом из нескольких элементов  ', () => {
    expect(selectionSort([{ number: 67, style: ElementStates.Default }, { number: 30, style: ElementStates.Default }],
        Direction.Ascending)).toEqual([
        [
            { number: 67, style: 'changing' },
            { number: 30, style: 'changing' }
        ],
        [
            { number: 67, style: 'default' },
            { number: 30, style: 'changing' }
        ],
        [
            { number: 67, style: 'default' },
            { number: 30, style: 'modified' }
        ],
        [
            { number: 30, style: 'modified' },
            { number: 67, style: 'default' }
        ],
        [
            {number: 30, style: 'modified'},
            {number: 67, style: 'modified'}
        ]


    ])
})
})