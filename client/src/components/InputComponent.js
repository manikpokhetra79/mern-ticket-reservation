import React, { useState } from 'react';

const InputComponent = ({ handleBooking }) => {
  const [input, setInput] = useState(0);

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
    setInput(0);
  };
  return (
    <>
      {' '}
      <input
        type="text"
        name="totalSeats"
        placeholder="No of seats 1-7"
        onChange={handleInputChange}
        value={input}
      />
      <button onClick={handleSubmit}>Book Seats</button>
    </>
  );
};

export default InputComponent;
