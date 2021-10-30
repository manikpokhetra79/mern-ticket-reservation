import React, { useState } from 'react';
import { bookingApi } from '../utils/urls';
const App = () => {
  const [seats, setSeats] = useState(0);

  let handleInputChange = (e) => {
    let value = e.target.value;
    setSeats(value);
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
      });
  };
  let handleSubmit = () => {
    //fetch api
    bookSeats();
  };
  return (
    <>
      {' '}
      <input
        type="text"
        name="totalSeats"
        placeholder="No of seats 1-7"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Book Seats</button>
    </>
  );
};

export default App;
