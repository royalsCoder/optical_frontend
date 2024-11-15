import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const adddata = createContext("");

function ContestProvider({ children }) {
  const [oneYearCompleteData, setOneYearCompleteData] = useState([]);
  const [birthdata, setBirthdata] = useState([]);
  const [lastStockData, setLastStockData] = useState([]);


  console.log("lastStockData1", lastStockData);
  console.log("birthdata1", birthdata);
  console.log("oneYearCompleteData1", oneYearCompleteData);


  const birthday = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/birthday`
      );
      setBirthdata(res?.data);
    } catch (error) {
      console.log(error);

    }
  };

  const lastStock = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/quantity-range`
      );

      setLastStockData(res?.data);
    } catch (error) {
      console.log(error);

    }
  };
  const oneYearComplete = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/records/year`
      );

      setOneYearCompleteData(res?.data);
    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    birthday()
    lastStock()
    oneYearComplete()
  }, [])
  return (
    <adddata.Provider value={[oneYearCompleteData, birthdata, lastStockData]}>
      {children}
    </adddata.Provider>
  );
}

export default ContestProvider;
