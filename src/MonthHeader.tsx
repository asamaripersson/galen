import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import Row from 'react-bootstrap/Row';
import { Context } from './Context';
import { Accordion, Button, Card } from "react-bootstrap";

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
 
     
      {filteredEvents?.map((monthEvent)=>(
          <>
            <Accordion>
              <Card>
                <Card.Header className={`monthly-event-title tag ${monthEvent.tags.toString()}`}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  {monthEvent.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{monthEvent.description}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </>
      ))}

      </div>
    </Row>
    </>
  );
};

export default MonthHeader;
