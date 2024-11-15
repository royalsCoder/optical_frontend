import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { Space, Spin } from "antd";
import { FaWhatsapp } from "react-icons/fa";

import { Modal, Button } from "react-bootstrap"; // Importing Modal and Button from React Bootstrap
import UserDeleteButton from "./UserDeleteButton";
import Cookies from "js-cookie";

const Today = (dobData) => {
  let currentDay = new Date().getDate();
  let currentMonth = new Date().getMonth();

  let filter = dobData.filter((data) => {
    let day = new Date(data.birthday).getDate();
    let month = new Date(data.birthday).getMonth();

    return currentDay == day && currentMonth == month;
  });
  return filter;
};

const token = Cookies.get("loginToken");

function Home() {
  const navigator = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);

  const CHARACTER_LIMIT = 100;

  // const [numberEmptyError, setNumberEmptyError] = useState(false);
  // const [messageEmptyError, setMessageEmptyError] = useState(false);
  const [userNumber, setUserNumber] = useState("");

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    mobileNumber: "",
    message: "",
  });

  const onSubmitMessage = () => {
    if (message.length > 0) {
      // Construct WhatsApp URL
      let number = userNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
      let url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
        message
      )}&app_absent=${0}`;
      window.open(url);
      setModalShow(false);
      setUserNumber(""); // Reset user number
      setMessage(""); // Reset message
    }
  };

  // const { mobileNumber, message } = formData;

  // const onChange = (e) => {
  //   e.preventDefault();
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const sendMessage = (number) => {
    setFormData({ mobileNumber: number, message: "" });
    setModalShow(true);
    setUserNumber(number);
  };

  const [getusedata, setuserdata] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  // const [birthdayData, setBirthdata] = useState([]);
  // const [lastStockData, setLastStockData] = useState([]);
  // const [oneYearCompleteData, setOneYearCompleteData] = useState([]);



  const onchangepage = () => {
    if (currentPage <= 2) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // const birthday = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/birthday`,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     setBirthdata(res?.data);
  //   } catch (error) {
  //     console.log(error);
  //     navigator("/login");
  //   }
  // };

  // const lastStock = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/quantity-range`
  //     );
  //     console.log("last stock data", res?.data);
  //     setLastStockData(res?.data);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // };
  // const oneYearComplete = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/records/year`
  //     );
  //     console.log("OneYearCompleteData", res?.data);
  //     setOneYearCompleteData(res?.data);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // };

  const getdata = async (pageNumber) => {
    // Pass the page number as an argument
    try {
      const resdata = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getdata?page=${currentPage}&searchQuery=${query}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setuserdata(resdata?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigator("/login");
      setLoading(true);
    }
  };

  useEffect(() => {
    getdata(currentPage);
  }, [currentPage, query]); // Fetch data whenever currentPage changes

  // useEffect(() => {
  //   birthday();
  //   lastStock();
  //   oneYearComplete();
  // }, []);

  return (
    <>
      {/* <div className="container">
        <div style={{ maxHeight: "12rem", overflow: "auto" }} className="row">
          {birthdayData.map((ele, index) => {
            return (
              <>
                <div className="col-md-6 p-2">
                  <div className=" p-2" style={{ backgroundColor: "#ddd" }}>
                    <h6 className="text-danger">🎂 Birthday Alert!🎉🎉</h6>
                    <p className="m-0 ">
                      Kindly wish <b className="m-0">{ele?.name} </b>today
                      his/her birthday & his/her contact no is
                      <b> {ele?.number}</b>
                    </p>

                    <button
                      style={{
                        backgroundColor: "#25d366",
                        fontWeight: "bolder",
                      }}
                      onClick={() => sendMessage(ele?.number)}
                      className="btn h3 "
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div> */}

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send WhatsApp Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Mobile Number: {userNumber}</p>

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setMessage(e.target.value)}
          >
            <option selected>Open this select menu</option>
            <option
              value="
              Thank you for visiting Roshni Opticals!
            Feel free to contact us 9616917142, 7985798138"
            >
              Thank you for visiting Roshni Opticals! Feel free to contact
            </option>
            <option
              value="Dear Sir/Maa'm,
            Your order is ready for pickup. Kindly collect it at your earliest convenience. 
            Have questions? Let us know. Thanks!"
            >
              Dear Sir/Maa'm, Your order is ready for pickup. Kindly
            </option>
            <option value="🎁 Happy Birthday to our amazing customer! Your support means the world to us. Wishing you a day as fabulous as our latest eyewear collection! 🕶🎉 from Roshni Opticals">
              🎁 Happy Birthday to our amazing customer! Your support means the
            </option>
            <option value="Happy Holi from Roshni Opticals! 🎉🌈 May your life be filled with vibrant colors and joyous moments. Have a wonderful and safe celebration!">
              Happy Holi from Roshni Opticals! 🎉🌈 May
            </option>
          </select>

          <textarea
            className="form-control my-4"
            rows="5"
            cols="50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmitMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="homecontainer mt-5">
        <div className="homeaddsection d-flex justify-content-between">
          <input
            id="rearchinput"
            type="text"
            placeholder="search......"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="btn btn-lg btn-primary">
            <NavLink to="/register">
              <i class="fa-solid fa-plus"></i> Add Coustomer Details
            </NavLink>{" "}
          </button>

          <button
            className="h4 btn btn-primary"
            onClick={() => setCurrentPage(1)}
          >
            Reset
          </button>
        </div>

        <div className="homedata mt-3">
          <table class="table table-striped table-bordered border-black">
            <thead>
              <tr className="table-dark">
                <th scope="col">S.no</th>
                <th scope="col">UserName</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Total</th>
                <th scope="col">Advance</th>
                <th scope="col">Balance</th>
                <th scope="col">Payment mode</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div id="loading">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Spin tip="Loading" size="large">
                        <div className="content" />
                      </Spin>
                    </Space>
                  </Space>
                </div>
              ) : (
                getusedata?.map((element, id) => {
                  const serialNumber = (currentPage - 1) * 10 + id + 1;

                  return (
                    <>
                      <tr>
                        <th scope="row">{serialNumber}</th>
                        <td>{element.name}</td>
                        <td>{element.number}</td>
                        <td>
                          {element.frameQyt * element.frameprice +
                            element.lensqyt * element.lensprice}
                        </td>
                        <td>{element.Advance}</td>
                        <td>
                          {element.frameQyt * element.frameprice +
                            element.lensqyt * element.lensprice -
                            element.Advance}
                        </td>
                        <td>{element.ModeOfPayment}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`view/${element._id}`}>
                            <button className="btn btn-info ">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>
                          <NavLink to={`edit/${element._id}`}>
                            <button className="btn btn-secondry">
                              <EditIcon />
                            </button>
                          </NavLink>
                          <NavLink to={`invice1/${element._id}`}>
                            <button className="btn btn-warning text-white">
                              {" "}
                              Local
                            </button>
                          </NavLink>
                          <NavLink to={`invice/${element._id}`}>
                            <button className="btn btn-success">
                              Original{" "}
                            </button>
                          </NavLink>
                          <button
                            style={{
                              backgroundColor: "#25d366",
                              fontWeight: "bolder",
                            }}
                            onClick={() => sendMessage(element?.number)}
                            className="btn h3 "
                          >
                            <FaWhatsapp />
                          </button>

                          <UserDeleteButton
                            userId={element._id}
                            onDelete={(deletedUserId) => {
                              // Handle deletion in your state
                              const updatedData = getusedata.filter(
                                (user) => user._id !== deletedUserId
                              );
                              setuserdata(updatedData);
                            }}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="d-flex gap-5 justify-content-evenly align-items-center">
            <p
              className="h4"
              style={{ cursor: "pointer" }}
              onClick={onchangepage}
            >
              previous
            </p>
            <p className="h6">{currentPage}</p>
            <p
              className="h4"
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
