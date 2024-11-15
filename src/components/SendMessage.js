import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const FromDateToDate = () => {
  const getdata = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/getdata`);
      console.log(data);
      setData1(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // const data = [
  //     {
  //         id: 1,
  //         name: "user1",
  //         income: "200",
  //         date: "2022-1-12",
  //         dob: "2022-12-13"
  //     },
  //     {
  //         id: 2,
  //         name: "user2",
  //         income: "100",
  //         date: "2022-1-13",
  //         dob: "2022-12-13"
  //     },
  //     {
  //         id: 3,
  //         name: "user3",
  //         income: "300",
  //         date: "2022-1-15",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 4,
  //         name: "user4",
  //         income: "203",
  //         date: "2023-1-16",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 5,
  //         name: "user5",
  //         income: "20",
  //         date: "2023-1-18",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 6,
  //         name: "user6",
  //         income: "500",
  //         date: "2023-1-19",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 7,
  //         name: "user7",
  //         income: "223",
  //         date: "2022-2-1",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 8,
  //         name: "user8",
  //         income: "76",
  //         date: "2023-2-4",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 9,
  //         name: "user9",
  //         income: "232",
  //         date: "2022-2-8",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 10,
  //         name: "user10",
  //         income: "250",
  //         date: "2023-3-1",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 11,
  //         name: "user11",
  //         income: "450",
  //         date: "2023-3-4",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 12,
  //         name: "user12",
  //         income: "340",
  //         date: "2022-3-6",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 13,
  //         name: "user13",
  //         income: "264",
  //         date: "2023-3-8",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 14,
  //         name: "user14",
  //         income: "240",
  //         date: "2023-3-10",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 15,
  //         name: "user15",
  //         income: "340",
  //         date: "2022-3-13",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 16,
  //         name: "user16",
  //         income: "340",
  //         date: "2023-3-15",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 17,
  //         name: "user17",
  //         income: "245",
  //         date: "2023-3-20",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 18,
  //         name: "user18",
  //         income: "2650",
  //         date: "2022-4-2",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 19,
  //         name: "user19",
  //         income: "267",
  //         date: "2023-4-5",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 20,
  //         name: "user20",
  //         income: "540",
  //         date: "2023-4-12",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 21,
  //         name: "user21",
  //         income: "265",
  //         date: "2022-4-14",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 22,
  //         name: "user22",
  //         income: "264",
  //         date: "2023-4-17",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 23,
  //         name: "user23",
  //         income: "7560",
  //         date: "2023-4-20",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 24,
  //         name: "user24",
  //         income: "230",
  //         date: "2023-4-25",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 25,
  //         name: "user25",
  //         income: "540",
  //         date: "2023-5-10",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 26,
  //         name: "user26",
  //         income: "287",
  //         date: "2023-5-13",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 27,
  //         name: "user27",
  //         income: "287",
  //         date: "2023-5-10",
  //         dob: "2023-12-12"
  //     },
  //     {
  //         id: 28,
  //         name: "user28",
  //         income: "340",
  //         date: "2023-5-15",
  //         dob: "2023-12-12"
  //     },

  // ]

  const [data1, setData1] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  console.log(data1);
  const [inputdata, setInputData] = useState({
    from: "",
    to: "",
  });
  const onChangeData = (e) => {
    setInputData({ ...inputdata, [e.target.name]: e.target.value });
  };
  const filterData = () => {
    const fromDate = new Date(inputdata.from);
    const toDate = new Date(inputdata.to);
    const filteredData = data1.filter((item) => {
      const currentDate = new Date(item.date);
      return currentDate >= fromDate && currentDate <= toDate;
    });
    setData1(filteredData);

    const monthlyIncome = filteredData.reduce((acc, item) => {
      const monthYear = `${new Date(item.date).getMonth() + 1}-${new Date(
        item.date
      ).getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + parseFloat(item.Advance);
      return acc;
    }, {});
    setMonthlyIncome(monthlyIncome);
    console.log("Monthly Income:", monthlyIncome);
  };
  const downloadExcelData = () => {
    const ws = XLSX.utils.json_to_sheet(data1);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };
  return (
    <div>
      <span>from</span>
      <input
        type="date"
        placeholder="from"
        name="from"
        value={inputdata.from}
        onChange={onChangeData}
      />
      <span>To</span>
      <input
        type="date"
        name="to"
        value={inputdata.to}
        onChange={onChangeData}
      />
      <button onClick={filterData}>set</button>
      <button onClick={downloadExcelData}>download excel data</button>
      <div>
        <div>
          {Object.entries(monthlyIncome).map(([monthYear, income]) => (
            <p key={monthYear}>{`${monthYear}: ${income}`}</p>
          ))}
        </div>
      </div>
      {data1.map((elm, ind) => {
        return (
          <>
            <div key={elm.id}>
              <p>{`${elm.name} - ${elm.date} - in-${elm.Advance}`}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default FromDateToDate;
