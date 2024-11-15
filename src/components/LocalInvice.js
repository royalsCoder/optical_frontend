import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadEye from "../img/invice_logo.jpg";
import Stamp from "../img/stamp.jpg";
import Cookies from "js-cookie";
import Login from "./Login";

const LocalInvice = () => {
  const token = Cookies.get("loginToken");
  // console.log("token", token);
  const navigator = useNavigate();

  const [invicedata, setInviceData] = useState([]);
  const { id } = useParams("");
  const getinviceData = async () => {
    try {
      const invicedata = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getuser/${id}`
      );
      // console.log(invicedata);
      setInviceData(invicedata.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getinviceData();
  }, []);

  const printinvice = () => {
    let printContents = document.getElementById("printinvice2").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const printinvice1 = () => {
    let printContents = document.getElementById("printinvice21").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const lencePrice = invicedata.lensprice * invicedata.lensqyt;
  const framePrice = invicedata.frameprice * invicedata.frameQyt;
  const total = lencePrice + framePrice;

  const d = new Date().toLocaleString();

  // if (!token) {
  //   return <Login />;
  // }

  return (
    <>
      <div className="backtoHome">
        <button className="btn btn-primary m-4" onClick={() => navigator("/")}>
          back
        </button>
      </div>

      <div className="printbutton d-flex justify-content-around">
        <button className="btn btn-success " onClick={printinvice}>
          Local Print
        </button>
      </div>

      <div className="bill-invoice" id="printinvice2">
        <header className="lgo">
          <img src={HeadEye} alt="" />
        </header>
        <div className="both">
          <div className="top-left">
            <p>
              <b>Date:</b> {d}
            </p>

            <p>
              <b>Invoice Number:</b> {invicedata?.invoiceNumber}
            </p>
            <p>
              <b>Customer Name:</b> {invicedata.name}
            </p>
            <p>
              <b>Mobile No:</b> {invicedata.number}
            </p>
            <p>
              <b>Address:</b> {invicedata.Address}
            </p>
          </div>
          <div className="top-right">
            <h4 className="rsni-opt">Roshni Opticals</h4>
            <p>
              <b>Mobile No:</b> 9616917142, 7985798138
            </p>
            <p>
              <b>Address: </b> Near Maharishi University IIM Road
              <br />
              <br />
              Lucknow Opposite Ayushman Hospital 226013
            </p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sr. no</th>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{invicedata.lens}</td>
              <td>{invicedata.LensModelNumber}</td>
              <td>{invicedata.lensqyt}</td>
              <td>{invicedata.lensprice}</td>
              <td>{invicedata.lensprice * invicedata.lensqyt}</td>
            </tr>
            <tr>
              <td>2</td>

              <td>{invicedata.frame}</td>
              <td>{invicedata.frameModelNumber}</td>
              <td>{invicedata.frameQyt}</td>
              <td>{invicedata.frameprice}</td>
              <td>{invicedata.frameQyt * invicedata.frameprice}</td>
            </tr>
            <tr>
              <td colSpan="5" className="ttl">
                Total
              </td>
              <td>{lencePrice + framePrice} </td>
            </tr>
            <tr>
              <td colSpan="5" className="ttl">
                Advance
              </td>
              <td>{invicedata.Advance} </td>
            </tr>
            <tr>
              <td colSpan="5" className="ttl">
                Balance
              </td>
              <td>{total - invicedata.Advance} </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="ttl">
                Payment Mode
              </td>
              <td>{invicedata.ModeOfPayment}</td>
            </tr>
          </tfoot>
        </table>
        <br />

        <div className="ctr">Thank You For Visiting Roshni Opticals</div>
        <div className="footer-section">
          <div className="btm-logo">
            <img src={Stamp} alt="Stamp Image" />
          </div>
          <p className="ophthalmologist-text">Optometrist</p>
        </div>

        <div className="background-text">
          <h1>Roshni Opticals</h1>
        </div>
      </div>
    </>
  );
};

export default LocalInvice;
