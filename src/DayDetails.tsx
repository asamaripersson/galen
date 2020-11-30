import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { Context } from "./Context";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import Col from 'react-bootstrap/Col';

interface DayDetailsPropps {
    day:Date;
}

const DayDetails: React.FC<DayDetailsPropps> = ({ day }) => {

    const {deleteEvent, setShowAddDayEvent, events} = useContext(Context);

    const filteredEvents = events?.filter((e)=>{
        return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
    });
    const handleRemoveEventClick =(event:any)=> {
        deleteEvent((event.target as HTMLInputElement).value);
    }
    const handleAddEventClick =(event:React.MouseEvent<HTMLElement>)=> {
        setShowAddDayEvent(true);
    }
 
    const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
    const nameOfDay = format(day, "EEEE", {locale:svLocale});
    return <>
        <Col className="day-details col-md-6" >
            <h2 className="day-number">{nameOfDay} {dateOfDay}</h2>
            <div className="day-details-inner">
                <button className="add-event btn btn-outline-success" onClick={handleAddEventClick}>&#43;</button>

                {filteredEvents?.map((dayEvent)=>{
                    return <>
                    <div className="event-details">
                        <h3 key={dayEvent.title}>{dayEvent.title} </h3>
                        <p key={dayEvent.description}>{dayEvent.description}</p>
                        <button onClick={handleRemoveEventClick} value={dayEvent._id} className="remove-event">
                         x
                        </button>
                    </div>
                    </>
                })}
            </div>
        </Col>  
        </>
}

  export default DayDetails;