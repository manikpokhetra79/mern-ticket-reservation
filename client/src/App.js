import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
import Coach from './components/Coach';
const App = () => {
  const [seats, bookSeats] = useState(-1);
  console.log(seats);
  return (
    <>
      <InputComponent handleBooking={bookSeats} />
      {seats > 0 && <Coach seats={seats} />}
    </>
  );
};

export default App;
