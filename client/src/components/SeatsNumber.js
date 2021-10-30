import React from 'react';
import { Container, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';

const SeatsNumber = ({ seatsArray, loading, remSeats }) => {
  return (
    <>
      {' '}
      <h2 className=" text-center">Booked Ticket Details</h2>
      <h2>Remaining seats : {remSeats}</h2>
      {remSeats == 0 && (
        <Button className="mb-3">Reset Tickets for Testing Purpose</Button>
      )}
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <ListGroup>
            {seatsArray ? (
              seatsArray.map((seat, index) => (
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
              ))
            ) : (
              <Alert variant="danger">Entered Tickets Not Available</Alert>
            )}
          </ListGroup>
        </Container>
      )}
    </>
  );
};

export default SeatsNumber;
