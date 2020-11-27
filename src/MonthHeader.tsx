import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import Row from 'react-bootstrap/Row';
import { Context } from './Context';

interface MonthHeaderProps {
  month?: Date;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ month }) => {
  if (!month) {
    return null;
  }
  const nameOfMonth = format(month, "MMMM", { locale: svLocale });
  const {activeZone, monthEvents} = useContext(Context);

  var filteredEvents = monthEvents?.filter((e)=>{
    return isWithinInterval(month,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
  });

  if(activeZone != null){
    filteredEvents = filteredEvents.filter((ez)=>{
      return ez.geoZones.includes(activeZone);
    })
  }

  return (
    <>
    <Row>
      <div>
      <h2>{nameOfMonth}</h2>
      {filteredEvents?.map((monthEvent)=>{
        return <p>{monthEvent.tags.toString()}</p>
      })}  
      </div>
    </Row>
    </>
  );
};

export default MonthHeader;
