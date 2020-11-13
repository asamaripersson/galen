import React, { useContext  } from "react";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import DayButton from "./DayButton";
import {Context} from './Context';

interface DayProps {
  day?: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {
  if (!day) {
    return null;
  }
  const {setActiveDay, events} = useContext(Context);

  const filteredEvents = events?.filter((e)=>{
    return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
   });

  const handleClick =(event:React.MouseEvent<HTMLDivElement>)=> {
    setActiveDay(day);
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
