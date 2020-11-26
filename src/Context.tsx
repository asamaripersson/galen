import {createContext, Dispatch,SetStateAction } from 'react';

export interface DayEvent{
    id?:string;
    title:string;
    description?:string;
    tags:string[];
    startDate:Date;
    endDate:Date;
}
export interface MonthEvent{
    id:string;
    tags:string[];
    geoZones:string[];
    startDate:Date;
    endDate:Date;
}
interface ContextProps {
    setActiveDay: Dispatch<SetStateAction<Date | undefined>>;
    activeDay?: Date;
    events?: DayEvent[];
    setEvents: Dispatch<SetStateAction<[]>>;
    monthEvents?: MonthEvent[];
    setMonthEvents:Dispatch<SetStateAction<[]>>;
    showAddDayEvent: boolean;
    setShowAddDayEvent: Dispatch<SetStateAction<boolean>>;
    addEventToDb:(event:FormData)=>void;
    deleteEvent: (id:string)=>void;
    activeZone?:string;
    setActiveZone:(key:string)=>void;
}

export const Context = createContext<ContextProps>({
    setEvents:()=>null,
    setActiveDay:()=>null,
    setShowAddDayEvent:()=>false,
    showAddDayEvent:false,
    addEventToDb:()=>null,
    deleteEvent:()=>null,
    setActiveZone:()=>null,
    setMonthEvents:()=>null
});