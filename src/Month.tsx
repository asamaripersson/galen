import React from "react";
import svLocale from "date-fns/locale/sv";
import { format, lastDayOfMonth, eachWeekOfInterval } from "date-fns";
import Week from "./Week";
import Row from 'react-bootstrap/Row';
import MonthHeader from './MonthHeader';

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
    <MonthHeader month={month}></MonthHeader>
    <Row>
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
      </Row>
    </>
  );
};

export default Month;
