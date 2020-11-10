import {createContext, Dispatch,SetStateAction } from 'react';

export interface Event{
    title:string;
    description?:string;
    tags:string[];
    startDate:Date;
    endDate:Date;
}

interface ContextProps {
    setActiveDay: Dispatch<SetStateAction<Date | undefined>>;
    activeDay?: Date;
    events?: Event[];
}

export const Context = createContext<ContextProps>({
    setActiveDay:()=>null,
});