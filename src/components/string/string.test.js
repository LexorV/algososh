import { stringSort } from './srtringSort';
describe('test string', () => {
test('Корректность разворачивание строки с чётным количеством символов', () => {
    expect(stringSort([
        { id: 0, text: '1', style: 'default' },
        { id: 1, text: '2', style: 'default' },
        { id: 2, text: '3', style: 'default' },
        { id: 3, text: '4', style: 'default' }
    ])).toEqual(
        [
            [
                { id: 0, text: '1', style: 'default' },
                { id: 1, text: '2', style: 'default' },
                { id: 2, text: '3', style: 'default' },
                { id: 3, text: '4', style: 'default' }
            ],
            [
                { id: 0, text: '1', style: 'changing' },
                { id: 1, text: '2', style: 'default' },
                { id: 2, text: '3', style: 'default' },
                { id: 3, text: '4', style: 'changing' }
            ],
            [
                { id: 3, text: '4', style: 'modified' },
                { id: 1, text: '2', style: 'default' },
                { id: 2, text: '3', style: 'default' },
                { id: 0, text: '1', style: 'modified' }
            ],
            [
                { id: 3, text: '4', style: 'modified' },
                { id: 1, text: '2', style: 'changing' },
                { id: 2, text: '3', style: 'changing' },
                { id: 0, text: '1', style: 'modified' }
            ],
            [
                { id: 3, text: '4', style: 'modified' },
                { id: 2, text: '3', style: 'modified' },
                { id: 1, text: '2', style: 'modified' },
                { id: 0, text: '1', style: 'modified' }
            ]
        ])
})
test('Корректность разворачивание строки с нечетным количеством символов', () => {
    expect(stringSort([
        { id: 0, text: '1', style: 'default' },
        { id: 1, text: '2', style: 'default' },
        { id: 2, text: '3', style: 'default' },
    ])).toEqual(
        [
            [
                { id: 0, text: '1', style: 'default' },
                { id: 1, text: '2', style: 'default' },
                { id: 2, text: '3', style: 'default' },
            ],
            [
                { id: 0, text: '1', style: 'changing' },
                { id: 1, text: '2', style: 'default' },
                { id: 2, text: '3', style: 'changing' },
            ],
            [
                { id: 2, text: '3', style: 'modified' },
                { id: 1, text: '2', style: 'default' },
                { id: 0, text: '1', style: 'modified' }
            ],
            [
                { id: 2, text: '3', style: 'modified' },
                { id: 1, text: '2', style: 'changing' },
                { id: 0, text: '1', style: 'modified' }
            ],
            [
                { id: 2, text: '3', style: 'modified' },
                { id: 1, text: '2', style: 'modified' },
                { id: 0, text: '1', style: 'modified' }
            ]
        ])
})
test('Корректность разворачивание строки с одним символом', () => {
    expect(stringSort([
        { id: 0, text: '1', style: 'default' }
    ])).toEqual(
        [
            [
                { id: 0, text: '1', style: 'default' },

            ],
            [
                { id: 0, text: '1', style: 'changing' },
            ],
            [
                { id: 0, text: '1', style: 'modified' }
            ]
        ])
})
test('Корректность разворачивание строки с пустой строкой', () => {
    expect(stringSort([])).toEqual(
        [
            []
        ])
})
})