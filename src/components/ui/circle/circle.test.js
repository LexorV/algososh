import React from "react";
import {Circle} from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

it('Отрисовка Circle без буквы', () => {
    const tree = renderer
        .create(<Circle />)
        .toJSON();
    expect(tree).toMatchSnapshot();
}); 
it('Отрисовка Circle с буквами', () => {
    const tree = renderer
        .create(<Circle letter={'test'} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
}); 
it('Отрисовка Circle с head', () => {
    const tree = renderer
        .create(<Circle head={'test'} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle с react-элементом в head', () => {
    const tree = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle с tail;', () => {
    const tree = renderer
        .create(<Circle tail={'test'} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle с react-элементом в tail', () => {
    const tree = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle с index', () => {
    const tree = renderer
        .create(<Circle indent={1} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle с пропом isSmall', () => {
    const tree = renderer
        .create(<Circle isSmall = {true} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle в состоянии default', () => {
    const tree = renderer
        .create(<Circle states={ElementStates.Default} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle в состоянии changing', () => {
    const tree = renderer
        .create(<Circle states={ElementStates.Changing} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('Отрисовка Circle в состоянии modified', () => {
    const tree = renderer
        .create(<Circle states={ElementStates.Modified} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

