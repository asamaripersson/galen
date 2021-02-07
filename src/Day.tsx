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
  if (activeStartDay != null && activeEndDay != null
    && activeStartDay < activeEndDay
    && isWithinInterval(day, { start: startOfDay(new Date(activeStartDay)), end: endOfDay(new Date(activeEndDay)) })) {
    chosenDay = true;
  }
  const privateEvents = filteredEvents.filter((dayEvent) => { return dayEvent.private });
  // let whithinPrivateEvents = [];
  //if (activeStartDay != null && activeEndDay != null){
  //  
  //}
  
  let okToBook = false;
     
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
      setActiveStartDay(day); //finns ingen start, kbk
      if (!activeEndDay) { setActiveEndDay(day) } //för en dag
      
    } else if (activeStartDay > day) {
      setActiveStartDay(day); // nyare startdag

    } else if (activeStartDay < day) {
      //kolla om det är obokbara datum inom spannet här åsså?
      setActiveEndDay(day); //start är satt, det blir en end day
      
      // if (activeEndDay != null && activeStartDay != null) {

      // }
      

    } else if (isEqual(day, activeStartDay)) { //samma, nulla en eller båda
      
      setActiveStartDay(null);

      if (activeEndDay != null) {
        setActiveEndDay(null);
      }
    }

     if(isEqual(day, activeEndDay)) { //samma, nulla en eller båda
      setActiveEndDay(null);
      if (activeStartDay != null) {
        setActiveStartDay(null);
      }
    }
  }

  return (
    <>
      <td key={day.toString() + Math.floor(Math.random() * Math.floor(9999999))} className={`day ${bookedClass}`}>
        <div key={day.toString() + Math.floor(Math.random() * Math.floor(9999999))} onClick={handleClick} className={chosenDay ? `is-chosen ${bookedClass}` : bookedClass}>
          <div key={"ho" + Math.floor(Math.random() * Math.floor(9999999))} className={`day-number ${isTodayClass}`}>{numberOfDay}</div>
           <p className={`red-booked-text ${bookedClass}`}>{bookedClass == "booked-private" ? "BOKAT" : bookedClass == "booked-open" ?"Delvis bokat" : ""} </p>
          {filteredEvents?.map((dayEvent) => (
            <>
                <span className="event-title" key={dayEvent.title + + Math.floor(Math.random() * Math.floor(9999999))}>{dayEvent.title}  </span>
              </>
            ))}
          </div>
      </td>
    </>
  );
};

export default Day;
