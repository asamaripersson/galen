import {createContext, Dispatch,SetStateAction } from 'react';

export interface DayEvent{
    id?:string;
    title:string;
    description?:string;
    tags:string[];
    startDate:Date;
    endDate:Date;
}

interface ContextProps {
    setActiveDay: Dispatch<SetStateAction<Date | undefined>>;
    activeDay?: Date;
    events?: DayEvent[];
    setActiveEvents: Dispatch<SetStateAction<DayEvent[] | undefined>>;
    activeEvents?: DayEvent[];
}

export const Context = createContext<ContextProps>({
    setActiveDay:()=>null,
    setActiveEvents:()=>null
});