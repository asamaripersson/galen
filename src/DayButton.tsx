import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import { DayEvent, Context } from './Context';

interface DayButtonPropps {
    day:Date;
    eventsOfDay:DayEvent[];
    onClick: (DayEvent: React.MouseEvent<HTMLDivElement>) => void;
}
const DayButton: React.FC<DayButtonPropps> = ({ day, eventsOfDay, ...rest }) => {

const {deleteEvent} = useContext(Context);

  const handleRemoveEventClick =(event:React.MouseEvent<HTMLElement>)=> {
    deleteEvent((event.target as HTMLInputElement).value);
  }

  const numberOfDay = format(day, "dd", { locale: svLocale });

return <>
    <div {...rest}>
        <div className="day-number">{numberOfDay}</div>
        <div>
          {eventsOfDay?.map((dayEvent)=>(
            <>
            <div>
              <span className="event-title" key={dayEvent.title}>{dayEvent.title} </span>
              <button key={dayEvent.description} onClick={handleRemoveEventClick} value={dayEvent.id} className="remove-event">
             x
              </button>
            </div>
             </>
          ))}
        </div>
    </div>  
    </>
  }

  export default DayButton;