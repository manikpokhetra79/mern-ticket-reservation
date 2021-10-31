import React, { useState } from 'react';
import { bookingApi, deleteSeatsApi } from '../utils/urls';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import SeatsNumber from './SeatsNumber';

const App = () => {
  const [seats, setSeats] = useState(0);
  const [seatsArray, setSeatsArray] = useState([]);
  const [coachArray, setCoachArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updater, setUpdater] = useState(false);

  let handleInputChange = (e) => {
    let value = e.target.value;
    setSeats(value);
  };
  let handleDeleteAll = () => {
    fetch(deleteSeatsApi, {
      method: 'DELETE',
    }).catch((err) => console.log(err));
    setSeatsArray([]);
  };
  let bookSeats = () => {
    fetch(bookingApi, {
      method: 'POST',
      body: JSON.stringify({
        seats: seats,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCoachArray(data.coach);
        if ((data.status = 'success')) {
          setSeatsArray(data.seats);
          // setTimeout(() => {
          setLoading(false);
          // }, 500);
        }
      })
      .catch((err) => console.log(err));
    setUpdater(false);
  };
  let handleSubmit = () => {
    if (seats > 7 || seats < 1) {
      alert('Please enter numbers from 1 - 7 only');
    } else {
      //fetch api
      bookSeats();
      setLoading(true);
    }
  };
  return (
    <>
      {' '}
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <h1 className="text-primary mt-5 text-center">
              Railway Ticket Booking
            </h1>
            <InputGroup className="mb-3 mt-5">
              <FormControl
                type="text"
                name="totalSeats"
                placeholder="No of seats 1-7"
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit}>Book Seats</Button>
            </InputGroup>
          </Col>
          <Col md={6} sm={12}>
            {' '}
            <ul className="mt-5">
              <h2>Notes </h2>
              <li>Total Seats : 80</li>
              <li>You can book only 1-7 input at one time</li>
              <li>
                Remaining seats will be shown once user has booked some tickets
              </li>
              <li>Output will be the Seat Number along with its Status</li>
              <li>
                You can reset tickets Database by clicking on{' '}
                <b className="text-primary">
                  Reset Tickets for Testing Purpose{' '}
                </b>
                Button
              </li>
              <li>After resetting Database, please refresh the page.</li>
            </ul>
          </Col>
        </Row>

        <Row>
          <SeatsNumber
            seatsArray={seatsArray}
            loading={loading}
            remSeats={coachArray.remSeats}
            handleDeleteAll={handleDeleteAll}
            setUpdater={setUpdater}
            updater={updater}
          />
        </Row>
      </Container>
    </>
  );
};

export default App;
