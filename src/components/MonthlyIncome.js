import { Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import Login from "./Login";
import moment from "moment";
const MonthlyIncome = () => {
  const token = Cookies.get("loginToken");
  // console.log("token", token);
  const [data1, setData1] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [Income, setIncome] = useState();
  // console.log(data1);
  const [inputdata, setInputData] = useState({
    from: moment().format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  });

  console.log("dfgdfgfdgfd", Income);
  const getdata = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/custom?startDate=${inputdata?.from}&endDate=${inputdata?.to}`
      );
      // console.log(data);
      setData1(data?.data?.data);
      setIncome(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeData = (e) => {
    setInputData({ ...inputdata, [e.target.name]: e.target.value });
  };

  const filterData = () => {
    getdata();
  };

  const downloadExcelData = () => {
    const ws = XLSX.utils.json_to_sheet(data1);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  const dataSource = data1;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "Advance",
      key: "Advance",
    },
  ];

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div style={{ width: "80%", margin: "1rem auto" }}>
      <Row style={{ margin: "1rem" }}>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>from</span>
          <input
            className="form-control"
            type="date"
            placeholder="from"
            name="from"
            value={inputdata.from}
            onChange={onChangeData}
          />
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>To</span>
          <input
            className="form-control"
            type="date"
            name="to"
            value={inputdata.to}
            onChange={onChangeData}
          />
        </Col>
        <Col>
          <button className="btn btn-primary" onClick={filterData}>
            set
          </button>
        </Col>
        <Col>
          <button className="btn btn-primary" onClick={downloadExcelData}>
            downloadExcelData
          </button>
        </Col>
      </Row>
      <h5>Income:- {Income?.income}</h5>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default MonthlyIncome;
