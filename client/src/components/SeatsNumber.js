import React from 'react';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';

const SeatsNumber = ({ seatsArray, loading, bookingError }) => {
  return (
    <>
      {' '}
      <h2 className=" text-center">Booked Ticket Details</h2>
      {bookingError && (
        <Alert variant="danger">This is a alert—check it out!</Alert>
      )}
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <ListGroup>
            {seatsArray.map((seat, index) => (
              <ListGroup.Item key={index}>
                <p className="fs-6">
                  <span>Seat Number: </span>
                  {seat.rowLetter + seat.seatNumber}
                  <br /> <span>Status </span>
                  <span className="badge bg-primary text-wrap text-capitalize ">
                    {seat.status}
                  </span>
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      )}
    </>
  );
};

export default SeatsNumber;
