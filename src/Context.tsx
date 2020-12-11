import {createContext, Dispatch,SetStateAction } from 'react';

export interface DayEvent{
    _id?:string;
    title:string;
    description?:string;
    tags:string[];
    startDate:Date;
    endDate:Date;
}
export interface MonthEvent{
    _id:string;
    title:string;
    description:string;
    tags:string[];
    geoZones:string[];
    startDate:Date;
    endDate:Date;
}
interface ContextProps {
    activeDay?: Date;
    setActiveDay: Dispatch<SetStateAction<Date | undefined>>;
    events?: DayEvent[];
    setEvents: Dispatch<SetStateAction<[]>>;
    showAddDayEvent: boolean;
    setShowAddDayEvent: Dispatch<SetStateAction<boolean>>;
    addEventToDb:(event:FormData)=>void;
    deleteEvent: (id:string)=>void;
}

export const Context = createContext<ContextProps>({
    setEvents:()=>null,
    setActiveDay:()=>null,
    setShowAddDayEvent:()=>false,
    showAddDayEvent:false,
    addEventToDb:()=>null,
    deleteEvent:()=>null
});