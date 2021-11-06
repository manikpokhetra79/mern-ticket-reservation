import React from 'react';
import RowScreen from './RowScreen';
import { Row } from 'react-bootstrap';
const CoachScreen = (props) => {
  const rows = props.coach.rows;
  const totalRowSeats = 7;
  const lastRowSeats = 3;
  return (
    <>
      {rows &&
        rows.map((row) => (
          <Row>
            <RowScreen
              totalSeats={row.rowLetter === 'L' ? lastRowSeats : totalRowSeats}
            />
          </Row>
        ))}
    </>
  );
};

export default CoachScreen;
