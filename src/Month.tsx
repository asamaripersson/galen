import React, { useContext  } from "react";
import { lastDayOfMonth, startOfMonth, eachWeekOfInterval } from "date-fns";
import Week from "./Week";
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";
import { Context } from './Context';


const Month: React.FC = () => {
  const {activeMonth, setActiveMonth, events} = useContext(Context);
  if (!activeMonth) {
    return null;
  }
  const weeks = eachWeekOfInterval({
    start: startOfMonth(activeMonth),
    end: lastDayOfMonth(activeMonth),
  });

  return (
    <>
    <Col className="md-3">
      <table>
        <thead>
          <tr className="weekdays">
          <th>Sön</th>
            <th>Mån</th>
            <th>Tis</th>
            <th>Ons</th>
            <th>Tor</th>
            <th>Fre</th>
            <th>Lör</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((w) => (
            <Week startDay={w} key={w.toString()+ Math.floor(Math.random() * Math.floor(9999999))} />
          ))}
        </tbody>
      </table>

      </Col>
    </>
  );
};

export default Month;
