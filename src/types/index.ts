import {ReactNode, ReactElement} from "react";
export type TobjectText = {
    id?: number,
    text: string,
    style:any,
    head?:string | ReactElement,
    tail?:string | ReactElement
}