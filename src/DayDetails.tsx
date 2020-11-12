import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import { DayEvent, Context } from "./Context";

interface DayDetailsPropps {
    day:Date;
    eventsForToday:DayEvent[]
}

const DayDetails: React.FC<DayDetailsPropps> = ({ day, eventsForToday }) => {

    const {deleteEvent, setAddEvent} = useContext(Context);
    const handleRemoveEventClick =(event:React.MouseEvent<HTMLElement>)=> {
        deleteEvent((event.target as HTMLInputElement).value);
      }

      const handleAddEventClick =(event:React.MouseEvent<HTMLElement>)=> {
        setAddEvent(true);
      }
 
    const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
    const nameOfDay = format(day, "EEEE", {locale:svLocale});
    return <>
        <div className="day-details" >
            <h2 className="day-number">{nameOfDay} {dateOfDay}</h2>
            <button className="add-event" onClick={handleAddEventClick}>&#43;</button>

            {eventsForToday?.map((dayEvent)=>{
                return <>
                <div className="event-details">
                    <button onClick={handleRemoveEventClick} className="remove-event">&#8211;</button>

                    {dayEvent.tags?.map((tag)=>{
                        return <div key={tag} className={`tag ${tag}`}>{tag}</div>
                    })}
                    <h3 key={dayEvent.title}>{dayEvent.title} </h3>
                    <p key={dayEvent.description}>{dayEvent.description}</p>
                </div>
                </>
            })}
        </div>  
        </>
}

  export default DayDetails;