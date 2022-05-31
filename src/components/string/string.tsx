import React from "react";
import { SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stringStyle from './string.module.css'


export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={stringStyle.box_main}>
      <div className={stringStyle.box_input}>
      <Input type="text" isLimitText={true} maxLength={11} />
      <Button text='Развернуть' />
      </div>
      </div>
     
    </SolutionLayout>
  );
};
