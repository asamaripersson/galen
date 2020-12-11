import React from "react";
import svLocale from "date-fns/locale/sv";
import { format, lastDayOfMonth, eachWeekOfInterval } from "date-fns";
import Week from "./Week";
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";

interface MonthProps {
  month?: Date;
}

const Month: React.FC<MonthProps> = ({ month }) => {
  if (!month) {
    return null;
  }
  const nameOfMonth = format(month, "MMMM", { locale: svLocale });

  const weeks = eachWeekOfInterval({
    start: month,
    end: lastDayOfMonth(month),
  });

  return (
    <>
    <Col className="md-6">
      
    <button>Active Month.getNextMonth</button>
    <h1>{nameOfMonth}</h1>
    <button>Active Month.getPrevMonth</button>

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
            <Week startDay={w} key={w.toString()} />
          ))}
        </tbody>
      </table>

      </Col>
    </>
  );
};

export default Month;
