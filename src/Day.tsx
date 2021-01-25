import React, { useContext, useState  } from "react";
import { format, isWithinInterval, startOfDay, endOfDay, isToday,isEqual } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { Context } from './Context';

interface DayProps {
  day?: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {
  if (!day) {
    return null;
  }
  // const [chosenDay, setChosenDay] = useState(false);
  let chosenDay = false;
  const {setActiveDay, events, activeStartDay, setActiveStartDay, activeEndDay, setActiveEndDay} = useContext(Context);
  const isTodayClass = isToday(day) ? "today" : "";
  const numberOfDay = format(day, "dd", { locale: svLocale });
  let bookedClass = "";
  const filteredEvents = events?.filter((e) => {
    //try catch!
    return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
  });
  
  if (isEqual(day, activeStartDay) || isEqual(day, activeEndDay)) {
    chosenDay = true;
  }
  if (activeStartDay != null && activeEndDay != null && isWithinInterval(day, { start: startOfDay(new Date(activeStartDay)), end: endOfDay(new Date(activeEndDay)) })) {
    chosenDay = true;
  }
  const privateEvents = filteredEvents.filter((dayEvent) => { return dayEvent.private });
  
  if (privateEvents.length > 0) {
    bookedClass = "booked-private";
  } else if (filteredEvents.length > 0 && privateEvents.length === 0) {
    bookedClass = "booked-open"  
  }
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setActiveDay(day);
    if (filteredEvents.length > 0 && privateEvents.length > 0) {
        return;
    }
    if (!activeStartDay) {
      setActiveStartDay(day);
      if(!activeEndDay){setActiveEndDay(day)}
    } else if (activeStartDay > day) {
      setActiveStartDay(day);
    } else if (activeStartDay < day) {
      setActiveEndDay(day);
    } else if(isEqual(day, activeStartDay)){
      setActiveStartDay(null);
      if (activeEndDay != null) {
        setActiveEndDay(null);
      }
    }

     if(isEqual(day, activeEndDay)) {
      setActiveEndDay(null);
      if (activeStartDay != null) {
        setActiveStartDay(null);
      }
    }
  }

  return (
    <>
      <td key={day.toString()} className={`day ${bookedClass}`}>
        <div onClick={handleClick} className={chosenDay ? `is-chosen ${bookedClass}` : bookedClass}>
          <div className={`day-number ${isTodayClass}`}>{numberOfDay}</div>
            {filteredEvents?.map((dayEvent)=>(
              <>
              <div>
                <span className="event-title" key={dayEvent.title}>{dayEvent.title} </span>
              </div>
              </>
            ))}
          </div>
      </td>
    </>
  );
};

export default Day;
