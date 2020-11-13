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
    //TODO eventdetails måste få bort sitt event
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
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
              </button>
            </div>
             </>
          ))}
        </div>
    </div>  
    </>
  }

  export default DayButton;