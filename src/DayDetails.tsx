import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { Context } from "./Context";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import Col from 'react-bootstrap/Col';

interface DayDetailsPropps {
    day:Date;
}

const DayDetails: React.FC<DayDetailsPropps> = ({ day }) => {

    const {deleteEvent, setAddEvent, events} = useContext(Context);

    const filteredEvents = events?.filter((e)=>{
        return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
       });
    const handleRemoveEventClick =(event:React.MouseEvent<HTMLElement>)=> {

        deleteEvent((event.target as HTMLInputElement).value);
      }

      const handleAddEventClick =(event:React.MouseEvent<HTMLElement>)=> {
        setAddEvent(true);
      }
 
    const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
    const nameOfDay = format(day, "EEEE", {locale:svLocale});
    return <>
        <Col className="day-details" >
            <h2 className="day-number">{nameOfDay} {dateOfDay}</h2>
            <div className="day-details-inner">
                <button className="add-event btn btn-outline-success" onClick={handleAddEventClick}>&#43;</button>

                {filteredEvents?.map((dayEvent)=>{
                    return <>
                    <div className="event-details">
                        {dayEvent.tags?.map((tag)=>{
                            return <div key={tag} className={`tag ${tag}`}>{tag}</div>
                        })}
                        <h3 key={dayEvent.title}>{dayEvent.title} </h3>
                        <p key={dayEvent.description}>{dayEvent.description}</p>
                        <button onClick={handleRemoveEventClick} value={dayEvent.id} className="remove-event">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </button>
                    </div>
                    </>
                })}
            </div>
        </Col>  
        </>
}

  export default DayDetails;