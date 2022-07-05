import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
describe('test button', () => {
    it('Отрисовка кнопки с текстом', () => {
        const tree = renderer
            .create(<Button text = 'test'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Отрисовка кнопки без текста', () => {
        const tree = renderer
            .create(<Button/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Отрисовка заблокированной кнопки', () => {
        const tree = renderer
            .create(<Button disabled={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Отрисовка кнопки с индикацией загрузки', () => {
        const tree = renderer
            .create(<Button isLoader={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Проверка вызова колбека', () => {
        const tree = renderer
            .create(<Button onClick={()=> alert('test')} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }); 

})
