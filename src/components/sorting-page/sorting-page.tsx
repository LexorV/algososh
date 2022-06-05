import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useState, ChangeEvent, SyntheticEvent} from "react";
import { Button } from "../ui/button/button";
import { uid } from '../../helper/helper';
import sortingStyle from './sorting-page.module.css'
import {RadioInput} from '../ui/radio-input/radio-input';
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyle.main}>
      <div className={sortingStyle.box_menu}>
      <RadioInput extraClass={'mr-20'} label="Выбор" />
      <RadioInput extraClass={'mr-25'} label="Пузырёк" />
      <Button sorting={Direction.Ascending} extraClass={'mr-6'} text="По возрастанию" />
      <Button sorting={Direction.Descending} extraClass={'mr-40'} text="По убыванию" />
      <Button text="Новый массив" />
      </div>
      <ul className={sortingStyle.box_diogram}>

      </ul>

      </div>


    </SolutionLayout>
  );
};
