import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";
import Cookies from "js-cookie";
import Login from "./Login";

function Details() {
  const token = Cookies.get("loginToken");
  // console.log("token", token);
  const navigator = useNavigate();

  const printdetails = () => {
    let printContents = document.getElementById("printdetails").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const [getusedata, setuserdata] = useState([]);
  // console.log(getusedata);

  const { id } = useParams("");
  // console.log(id);

  // const history = useNavigate("");

  const getdata = async (e) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getuser/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setuserdata(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigator("/login");
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/deleteuser/${id}`)
      .then((res) => {
        alert("user deleted");
        navigator("/");
      })
      .catch((error) => {
        console.log(error);
        navigator("/login");
      });
  };

  // if (!token) {
  //   return <Login />;
  // }

  return (
    <>
      <div className="container" id="printdetails">
        <header>
          <div className="head text-center">
            <span>
              <h2 className="cusdfrm">Coustomer Details</h2>
              <hr />
            </span>
          </div>
        </header>

        <form className="row">
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Patient Name -</h6>
            <p className="ps-3">{getusedata.name}</p>
          </div>
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Age -</h6>
            <p className="ps-3">{getusedata.age}</p>
          </div>
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Date -</h6>
            <p className="ps-3">{getusedata.date}</p>
          </div>
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Contact No -</h6>
            <p className="ps-3">{getusedata.number}</p>
          </div>
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Email</h6>
            <p className="ps-3">{getusedata.email}</p>
          </div>
          <div className="col-md-6 roshni-lab d-flex">
            <h6>Date Of Birth -</h6>
            <p className="ps-3">{getusedata.dob}</p>
          </div>

          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered border-secondary text-center">
                <thead>
                  <tr>
                    <th></th>

                    <th colSpan="4">OD Right</th>
                    <th colSpan="4">OS Left</th>
                  </tr>
                  <tr>
                    <th scope="col"></th>

                    <th scope="col">
                      <label htmlFor="numb2">Sph</label>
                    </th>
                    <th scope="col">Cyl</th>
                    <th scope="col">
                      <label htmlFor="numb1">Axis</label>
                    </th>
                    <th scope="col">VA</th>
                    <th scope="col">Sph</th>
                    <th scope="col">Cyl</th>
                    <th scope="col">Axis</th>
                    <th scope="col">VA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DV</td>

                    <td>
                      <p>{getusedata.OdRightSphDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OdRightcylDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OdRightAxisDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OdRightVADV}</p>
                    </td>
                    <td>
                      <p>{getusedata.OsLeftSphDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OsLeftCylDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OsLeftAxisDv}</p>
                    </td>
                    <td>
                      <p>{getusedata.OsLeftVaDv}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>NV (Add)</td>
                    <td colSpan="3">
                      <p>{getusedata.OdRightNvAdd}</p>
                    </td>
                    <td>
                      <p>{getusedata.OdRightVaNvAdd}</p>
                    </td>
                    <td colSpan="3">
                      <p>{getusedata.OsLeftNvAdd}</p>
                    </td>
                    <td>
                      <p>{getusedata.OsLeftVaNvAdd}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 text-center">
            <div className="row">
              <div className="col-md-3 d-flex">
                <h6>Instruction</h6>
                <p className="ps-3">{getusedata.instruction}</p>
              </div>
              <div className="col-md-3 d-flex">
                <h6>Lens</h6>
                <p className="ps-3">{getusedata.lens}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6> Lens Qyt</h6>
                <p className="ps-3">{getusedata.lensqyt}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Lens Price</h6>
                <p className="ps-3">{getusedata.lensprice}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Lens Modal no</h6>
                <p className="ps-3">{getusedata.LensModelNumber}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Frame</h6>
                <p className="ps-4">{getusedata.frame}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Frame Qyt</h6>
                <p className="ps-4">{getusedata.frameQyt}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Frame Price</h6>
                <p className="ps-4">{getusedata.frameprice}</p>
              </div>
              <div className="col-md-2 d-flex">
                <h6>Frame Modal no</h6>
                <p className="ps-4">{getusedata.frameModelNumber}</p>
              </div>
              {/* *****row end**** */}
            </div>
            {/* *****col-12 end****** */}
          </div>
          <br />
          <br />
          <div className="row checkbox">
            <label htmlFor="inputAddress2" className="form-label roshni-lab">
              Amount
            </label>
            <div className="col-md-4 d-flex">
              <h5>Total:</h5>
              <p className="ps-3">
                {getusedata.frameQyt * getusedata.frameprice +
                  getusedata.lensqyt * getusedata.lensprice}
              </p>
            </div>
            <div className="col-md-4 d-flex">
              <h5>Advance:</h5>
              <p className="ps-3">{getusedata.Advance}</p>
            </div>
            <div className="col-md-4 d-flex">
              <h5>Balance:</h5>
              <p className="ps-3">
                {getusedata.frameQyt * getusedata.frameprice +
                  getusedata.lensqyt * getusedata.lensprice -
                  getusedata.Advance}
              </p>
            </div>
          </div>

          {/*  */}
        </form>
      </div>

      <div className="col-12 text-center">
        <button onClick={printdetails} className="btn btn-secondary">
          Print
        </button>
      </div>
    </>
  );
}

export default Details;
