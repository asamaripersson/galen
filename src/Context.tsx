import {createContext, Dispatch,SetStateAction } from 'react';

export interface DayEvent{
    id?:string;
    title:string;
    description?:string;
    private:boolean;
    startDate:Date;
    endDate:Date;
}

interface ContextProps {
    activeDay?: Date;
    activeEndDay?: Date;
    setActiveEndDay: Dispatch<SetStateAction<Date | undefined>>;
    activeStartDay?: Date;
    setActiveStartDay:Dispatch<SetStateAction<Date | undefined>>;
    setActiveDay: Dispatch<SetStateAction<Date | undefined>>;
    setActiveMonth: Dispatch<SetStateAction<Date | undefined>>;
    activeMonth?: Date;
    events?: DayEvent[];
    setEvents: Dispatch<SetStateAction<[]>>;
    showAddDayEvent: boolean;
    setShowAddDayEvent: Dispatch<SetStateAction<boolean>>;
    addEventToDb:(event:FormData)=>void;
    deleteEvent: (id:string)=>void;
}

export const Context = createContext<ContextProps>({
    setActiveEndDay:()=>null,
    setActiveStartDay:()=>null,
    setEvents:()=>null,
    setActiveDay:()=>null,
    setActiveMonth:()=>null,
    setShowAddDayEvent:()=>false,
    showAddDayEvent:false,
    addEventToDb:()=>null,
    deleteEvent:()=>null
});