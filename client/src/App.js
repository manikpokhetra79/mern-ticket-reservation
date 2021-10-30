import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
import Coach from './components/Coach';
import { bookingApi } from './utils/urls';
const App = () => {
  const [seats, bookSeats] = useState(0);
  let handleSeatBooking = (value) => {
    bookSeats(value);
    //send data to fetch
    bookingSeats();
  };
  let bookingSeats = () => {
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
      });
  };

  return (
    <>
      <InputComponent handleBooking={handleSeatBooking} />
      <Coach seats={seats} />
    </>
  );
};

export default App;
