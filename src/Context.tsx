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
    setEvents: Dispatch<SetStateAction<[]>>;
    setActiveEvents: Dispatch<SetStateAction<DayEvent[] | undefined>>;
    activeEvents?: DayEvent[];
    addEvent: boolean;
    setAddEvent: Dispatch<SetStateAction<boolean>>;
    addEventToDb:(event:FormData)=>void;
    deleteEvent: (id:string)=>void;
}

export const Context = createContext<ContextProps>({
    setEvents:()=>null,
    setActiveDay:()=>null,
    setActiveEvents:()=>null,
    addEvent:false,
    setAddEvent:()=>false,
    addEventToDb:()=>null,
    deleteEvent:()=>null
});