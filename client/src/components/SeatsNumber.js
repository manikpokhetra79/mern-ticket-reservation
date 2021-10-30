import React from 'react';
import { Container, ListGroup, Spinner, Button } from 'react-bootstrap';

const SeatsNumber = ({
  seatsArray,
  loading,
  remSeats,
  handleDeleteAll,
  setUpdater,
  updater,
}) => {
  let ticketsLeft = remSeats;

  let handleButtonClick = () => {
    handleDeleteAll();
    setUpdater(true);
  };
  return (
    <>
      {' '}
      <h2 className=" text-center">Booked Ticket Details</h2>
      <h2>Remaining seats : {updater ? 80 : ticketsLeft}</h2>
      {updater && <h2> Please refresh the page</h2>}
      {remSeats === 0 && (
        <Button className="mb-3" onClick={handleButtonClick}>
          Reset Tickets for Testing Purpose
        </Button>
      )}
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          <ListGroup>
            {seatsArray &&
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
              ))}
          </ListGroup>
        </Container>
      )}
    </>
  );
};

export default SeatsNumber;
