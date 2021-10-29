import React, { useState } from 'react';

const InputComponent = ({ handleBooking }) => {
  const [input, setInput] = useState();

  let handleInputChange = (e) => {
    let value = e.target.value;
    setInput(value);
  };
  let handleSubmit = () => {
    if (input > 7 || input < 1) {
      alert('Enter value between 1 -7');
    } else {
      handleBooking(input);
    }
  };
  return (
    <>
      {' '}
      <input
        type="text"
        name="totalSeats"
        placeholder="enter number of seats from 1-7"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Book Seats</button>
    </>
  );
};

export default InputComponent;
