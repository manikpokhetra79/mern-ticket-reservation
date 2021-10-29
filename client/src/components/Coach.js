import React, { useEffect } from 'react';
import { bookingApi } from '../utils/urls';
import axios from 'axios';
const Coach = ({ seats }) => {
  const s = seats;
  useEffect(() => {
    let bookSeats = () => {
      let url = bookingApi;
      axios
        .post(url, s)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.data));
    };
    bookSeats();
  }, [s]);
  return <div></div>;
};

export default Coach;
