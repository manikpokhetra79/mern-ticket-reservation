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
          <h1 className="text-primary mt-5 text-center">
            Railway Ticket Booking
          </h1>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                name="totalSeats"
                placeholder="No of seats 1-7"
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit}>Book Seats</Button>
            </InputGroup>
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
