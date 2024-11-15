import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
function Edit() {
  const token = Cookies.get("loginToken");
  // console.log("token", token);
  const history = useNavigate("");

  const [data, setData] = useState({
    name: "",
    age: "",
    number: "",
    date: "",
    email: "",
    dob: "",
    OdRightSphDv: "",
    OdRightcylDv: "",
    OdRightAxisDv: "",
    OdRightVADV: "",
    OsLeftSphDv: "",
    OsLeftCylDv: "",
    OsLeftAxisDv: "",
    OsLeftVaDv: "",
    OdRightNvAdd: "",
    OdRightVaNvAdd: "",
    OsLeftNvAdd: "",
    OsLeftVaNvAdd: "",
    instruction: "",
    lens: "",
    frame: "",
    frameModelNumber: "",
    Advance: "",
    total: "",
    balance: "",
    ModeOfPayment: "",
    LensModelNumber: "",
    Address: "",
    lensqyt: "",
    lensprice: "",
    frameQyt: "",
    frameprice: "",
  });

  const [inputdata, setInputData] = useState({
    name: "",
    age: "",
    number: "",
    date: "",
    email: "",
    dob: "",
    OdRightSphDv: "",
    OdRightcylDv: "",
    OdRightAxisDv: "",
    OdRightVADV: "",
    OsLeftSphDv: "",
    OsLeftCylDv: "",
    OsLeftAxisDv: "",
    OsLeftVaDv: "",
    OdRightNvAdd: "",
    OdRightVaNvAdd: "",
    OsLeftNvAdd: "",
    OsLeftVaNvAdd: "",
    instruction: "",
    lens: "",
    frame: "",
    frameModelNumber: "",
    Advance: "",
    total: "",
    balance: "",
    lensqyt: "",
    lensprice: "",
    frameQyt: "",
    frameprice: "",
  });

  const setdata1 = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setInputData({ ...inputdata, [name]: value });
  };

  const setdata = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setData((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  // const [getusedata, setuserdata] = useState([]);
  // console.log(getusedata);

  const { id } = useParams("");
  // console.log(id);

  const getdata = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getuser/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // const updateuser = async (e) => {
  //   e.preventDefault();

  //   const { name, email, age, mobile, work, address, description } = data;

  //   const res2 = await fetch(`https://crudbackend-yeyx.onrender.com/updateuser/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({

  //       name, email, age, mobile, work, address, description
  //     })
  //   });

  //   const data2 = await res2.json();
  //   console.log(data2);

  //   if (res2.status === 422 || !data2) {
  //     alert("fill the data");
  //   } else {
  //     alert('data updated');
  //     history("/")
  //   }
  // }

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      name,
      age,
      number,
      date,
      email,
      dob,
      OdRightSphDv,
      OdRightcylDv,
      OdRightAxisDv,
      OdRightVADV,
      OsLeftSphDv,
      OsLeftCylDv,
      OsLeftAxisDv,
      OsLeftVaDv,
      OdRightNvAdd,
      OdRightVaNvAdd,
      OsLeftNvAdd,
      OsLeftVaNvAdd,
      instruction,
      lens,
      frame,
      frameModelNumber,
      Advance,
      total,
      balance,
      ModeOfPayment,
      LensModelNumber,
      Address,
      lensqyt,
      lensprice,
      frameQyt,
      frameprice,
    } = data;

    try {
      const reponse = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/updateuser/${id}`,
        {
          name,
          age,
          number,
          date,
          email,
          dob,
          OdRightSphDv,
          OdRightcylDv,
          OdRightAxisDv,
          OdRightVADV,
          OsLeftSphDv,
          OsLeftCylDv,
          OsLeftAxisDv,
          OsLeftVaDv,
          OdRightNvAdd,
          OdRightVaNvAdd,
          OsLeftNvAdd,
          OsLeftVaNvAdd,
          instruction,
          lens,
          frame,
          frameModelNumber,
          Advance,
          total,
          balance,
          ModeOfPayment,
          LensModelNumber,
          Address,
          lensqyt,
          lensprice,
          frameQyt,
          frameprice,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log(reponse);
      alert("updated");
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <header>
          <div className="head text-center">
            <span>
              <p>ROSHNI OPTICAL</p>
              <hr />
            </span>
          </div>
        </header>

        <div className="formcontainer opt-form">
          <form
            className="row g-3"
            style={{ backgroundColor: "#F6EABE", padding: "20px" }}
          >
            <div className="col-md-6 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Patient Name:<sup>*</sup>
              </label>
              <input
                value={data?.name}
                name="name"
                onChange={setdata}
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                required
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="age" className="form-label">
                Age:<sup>*</sup>
              </label>
              <input
                value={data.age}
                name="age"
                onChange={setdata}
                type="number"
                className="form-control"
                id="age"
                placeholder="Age"
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="date" className="form-label">
                Date:<sup>*</sup>
              </label>
              <input
                name="date"
                value={data.date}
                onChange={setdata}
                type="date"
                className="form-control"
                id="date"
                placeholder="Date"
                required
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number:<sup>*</sup>
              </label>
              <input
                name="number"
                value={data.number}
                onChange={setdata}
                type="text"
                className="form-control"
                id="contactNumber"
                pattern="[0-9]{10}"
                placeholder="Enter Contact No"
                title="Please enter a valid 10-digit contact number"
                required
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Email:<sup>*</sup>
              </label>
              <input
                name="email"
                value={data.email}
                onChange={setdata}
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email id"
                required
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Date of birth:<sup>*</sup>
              </label>
              <input
                name="dob"
                value={data.dob}
                onChange={setdata}
                type="date"
                className="form-control"
                id="dob"
                placeholder="DOB"
              />
            </div>
            <div className="col-md-12 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Address:<sup>*</sup>
              </label>
              <input
                name="Address"
                value={data.Address}
                onChange={setdata}
                type="text"
                className="form-control"
                id="dob"
                placeholder="Address"
              />
            </div>

            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered border-danger text-center">
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
                        <input
                          name="OdRightSphDv"
                          value={data.OdRightSphDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb2"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightcylDv"
                          value={data.OdRightcylDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightAxisDv"
                          value={data.OdRightAxisDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb1"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightVADV"
                          value={data.OdRightVADV}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftSphDv"
                          value={data.OsLeftSphDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftCylDv"
                          value={data.OsLeftCylDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftAxisDv"
                          value={data.OsLeftAxisDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftVaDv"
                          value={data.OsLeftVaDv}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>NV (Add)</td>
                      <td colSpan="3">
                        <input
                          name="OdRightNvAdd"
                          value={data.OdRightNvAdd}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightVaNvAdd"
                          value={data.OdRightVaNvAdd}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td colSpan="3">
                        <input
                          name="OsLeftNvAdd"
                          value={data.OsLeftNvAdd}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftVaNvAdd"
                          value={data.OsLeftVaNvAdd}
                          onChange={setdata}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-12 text-center">
              <div class="row mb-4 py-2">
                <div class="col-md-2 dropdown">
                  <select
                    class="form-select "
                    aria-label="Default select example"
                    name="instruction"
                    value={data.instruction}
                    onChange={setdata}
                  >
                    <option selected>Instruction</option>
                    <option value=" Distance Only"> Distance Only</option>
                    <option value=" NV Only"> NV Only</option>
                    <option value="  Constant Wear"> Constant Wear</option>
                    <option value="  Vocational Use"> Vocational Use</option>
                    <option value=" Bifocal"> Bifocal</option>
                    <option value=" Progressive"> Progressive</option>
                  </select>
                </div>

                <div class="col-md-2 dropdown">
                  <select
                    class="form-select "
                    aria-label="Default select example"
                    name="lens"
                    value={data.lens}
                    onChange={setdata}
                  >
                    <option selected>Lens</option>
                    <option value="Glass">Glass</option>
                    <option value="Fibre Lens">Fibre Lens</option>
                    <option value="Blue Filter">Blue Filter</option>
                    <option value="HI Index">HI Index</option>
                    <option value="White">White</option>
                    <option value="Tint">Tint</option>
                    <option value="Photochromatic">Photochromatic</option>
                    <option value="AR Coat">AR Coat</option>
                  </select>
                </div>
                <div class="col-md-1 dropdown">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="lensqyt"
                    value={data.lensqyt}
                    onChange={setdata}
                  >
                    <option selected>Qty.</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="model.no"
                    name="LensModelNumber"
                    value={data.LensModelNumber}
                    onChange={setdata}
                  />
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="Price"
                    name="lensprice"
                    value={data.lensprice}
                    onChange={setdata}
                  />
                </div>
                <div class="col-md-2 dropdown">
                  <select
                    class="form-select "
                    aria-label="Default select example"
                    name="frame"
                    value={data.frame}
                    onChange={setdata}
                  >
                    <option selected>Frame</option>
                    <option value="metal">Metal</option>
                    <option value="Rimless">Rimless</option>
                    <option value="Sheet">Sheet</option>
                  </select>
                </div>
                <div class="col-md-1 dropdown">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="frameQyt"
                    value={data.frameQyt}
                    onChange={setdata}
                  >
                    <option selected>Qty.</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="date"
                    placeholder="model.no"
                    name="frameModelNumber"
                    value={data.frameModelNumber}
                    onChange={setdata}
                  />
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="Price"
                    name="frameprice"
                    value={data.frameprice}
                    onChange={setdata}
                  />
                </div>
              </div>
            </div>

            <br />
            <br />

            <br />
            <div className="row checkbox">
              <label htmlFor="inputAddress2" className="form-label roshni-lab">
                Amount
              </label>
              <div className="col-md-3">
                <label htmlFor="total" className="form-label">
                  Total:<sup>*</sup>
                </label>
                <input
                  name="total"
                  value={
                    data.lensqyt * data.lensprice +
                    data.frameQyt * data.frameprice
                  }
                  onChange={setdata}
                  type="number"
                  className="form-control"
                  id="total"
                  placeholder="Total Balance"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="advance" className="form-label">
                  Advance:
                </label>
                <input
                  name="Advance"
                  value={data.Advance}
                  onChange={setdata}
                  type="number"
                  className="form-control"
                  id="advance"
                  placeholder="Advance Balance"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="balance" className="form-label">
                  Balance:
                </label>
                <input
                  name="balance"
                  value={
                    data.lensqyt * data.lensprice +
                    data.frameQyt * data.frameprice -
                    data.Advance
                  }
                  onChange={setdata}
                  type="number"
                  className="form-control"
                  id="balance"
                  placeholder="To Be Paid"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="balance" className="form-label">
                  Mode Of Payment:
                </label>

                <select
                  class="form-select "
                  aria-label="Default select example"
                  name="ModeOfPayment"
                  value={data.ModeOfPayment}
                  onChange={setdata}
                >
                  <option selected>Select payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                onClick={updateuser}
                className="btn-lg btn-success"
              >
                Update
              </button>
            </div>

            {/*  */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
