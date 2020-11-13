import React from "react";
import svLocale from "date-fns/locale/sv";
import { format, lastDayOfMonth, eachWeekOfInterval } from "date-fns";
import Week from "./Week";
import Col from 'react-bootstrap/Col';

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
    <Col>
      <h2>{nameOfMonth}</h2>
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
