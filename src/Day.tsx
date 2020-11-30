import React, { useContext  } from "react";
import { format, isWithinInterval, startOfDay, endOfDay, isToday } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { Context } from './Context';

interface DayProps {
  day?: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {
  if (!day) {
    return null;
  }
  const {setActiveDay, events} = useContext(Context);
  const {deleteEvent} = useContext(Context);

  const isTodayClass = isToday(day) ? "today" : "";
  const numberOfDay = format(day, "dd", { locale: svLocale });


  const filteredEvents = events?.filter((e)=>{
    return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
   });

  const handleClick =(event:React.MouseEvent<HTMLDivElement>)=> {
    setActiveDay(day);
  }

  const handleRemoveEventClick =(event:React.MouseEvent<HTMLElement>)=> {
    deleteEvent((event.target as HTMLInputElement).value);
  }

  return (
    <>
      <td key={day.toString()} className="day">
        <div onClick={handleClick}>
          <div className={`day-number ${isTodayClass}`}>{numberOfDay}</div>
          <div>
            {filteredEvents?.map((dayEvent)=>(
              <>
              <div>
                <span className="event-title" key={dayEvent.title}>{dayEvent.title} </span>
                <button key={dayEvent.description} onClick={handleRemoveEventClick} value={dayEvent._id} className="remove-event">
                  x
                </button>
              </div>
              </>
            ))}
          </div>
        </div>  
      </td>
    </>
  );
};

export default Day;
