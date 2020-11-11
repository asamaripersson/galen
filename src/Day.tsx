import React, { useState, useContext  } from "react";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import DayButton from "./DayButton";
import {Context} from './Context';

interface DayProps {
  day?: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {

  const {setActiveDay} = useContext(Context);
  const {setActiveEvents} = useContext(Context);
  const { events } = useContext(Context);//Hämtar DayEvent från context

  const filteredEvents = events?.filter((e)=>{
    return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
   });

  if (!day) {
    return null;
  }

  const handleClick =(event:React.MouseEvent<HTMLDivElement>)=> {
    setActiveDay(day);
    setActiveEvents(filteredEvents);
  }
  return (
    <>
      <td key={day.toString()} className="day">
        <DayButton key={day.getMilliseconds().toString()} day={day} eventsOfDay={filteredEvents} onClick={handleClick}></DayButton>
      </td>
    </>
  );
};

export default Day;
