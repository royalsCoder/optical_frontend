import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Login from "./Login";
function Register() {
  const token = Cookies.get("loginToken");
  // console.log("token", token);
  const history = useNavigate("");

  const [lenses, setLenses] = useState([])
  const [frame, setFrame] = useState([])
  const [lenseId,setLenseId] = useState("")
  const [frameId,setFrameId] = useState("")

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
    LensModelNumber: "",
    Advance: "0",
    total: "",
    balance: "",
    ModeOfPayment: "",
    Qty: "",
    Address: "",
    lensqyt: "",
    lensprice: "",
    frameQyt: "",
    frameprice: "",
  });

  console.log("inputdata",inputdata);


  const lensesOption = lenses?.map((item, title) => {
    return (
      <>
        <option value={item?._id}>{item?.itemName}</option>
      </>
    )
  })
  const frameOption = frame?.map((item, title) => {
    return (
      <>
        <option value={item?._id}>{item?.itemName}</option>
      </>
    )
  })

  // const [balance, setBalance] = useState(0);

  const setdata1 = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setInputData({ ...inputdata, [name]: value });
  };

  const setdata12 = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedValue = e.target.options[selectedIndex].value;
    const selectedLabel = e.target.options[selectedIndex].text;
    setLenseId(selectedValue)
    setInputData(prev => ({
      ...prev,
      lens: selectedLabel
    }));
  };
  const setdata13 = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedValue = e.target.options[selectedIndex].value;
    const selectedLabel = e.target.options[selectedIndex].text;
    setFrameId(selectedValue)
    setInputData(prev => ({
      ...prev,
      frame: selectedLabel
    }));
  };

  


  const updateproduct = () => {

    axios.patch(`${process.env.REACT_APP_BASE_URL}/updateStock`, {
      lensId: lenseId, frameId: frameId, lensQuantity: inputdata?.lensqyt, frameQuantity: inputdata?.frameQyt
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }


  


  const addinputdata = async (e) => {
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
      LensModelNumber,
      Advance,
      total,
      balance,
      ModeOfPayment,
      Qty,
      Address,
      lensqyt,
      lensprice,
      frameQyt,
      frameprice,
    } = inputdata;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
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
        LensModelNumber,
        Advance,
        total,
        balance,
        ModeOfPayment,
        Qty,
        Address,
        lensqyt,
        lensprice,
        frameQyt,
        frameprice,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      alert("data added");
      updateproduct()
      console.log("data added");
      history("/");
    }
  };


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/getLenses`).then((res) => {

      setLenses(res?.data)
    }).catch((error) => {
      console.log(error);
    })
    axios.get(`${process.env.REACT_APP_BASE_URL}/getframes`).then((res) => {

      setFrame(res?.data)
    }).catch((error) => {
      console.log(error);
    })


  }, [])

  // if (!token) {
  //   return <Login />;
  // }

  return (
    <>
      <div className="">
        <header>
          <div className="head text-center ">
            <span>
              <p style={{ fontSize: "2rem" }}>ROSHNI OPTICALS</p>
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
                value={inputdata.name}
                name="name"
                onChange={setdata1}
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
                value={inputdata.age}
                name="age"
                onChange={setdata1}
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
                value={inputdata.date}
                onChange={setdata1}
                type="date"
                className="form-control"
                id="date"
                placeholder="Date"
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number:<sup>*</sup>
              </label>
              <input
                name="number"
                value={inputdata.number}
                onChange={setdata1}
                type="text"
                className="form-control"
                id="contactNumber"
                pattern="[0-9]{10}"
                placeholder="Enter Contact No"
                title="Please enter a valid 10-digit contact number"
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Email:<sup>*</sup>
              </label>
              <input
                name="email"
                value={inputdata.email}
                onChange={setdata1}
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email id"
              />
            </div>
            <div className="col-md-6 roshni-lab">
              <label htmlFor="fname" className="form-label">
                Date of birth:<sup>*</sup>
              </label>
              <input
                name="dob"
                value={inputdata.dob}
                onChange={setdata1}
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
                value={inputdata.Address}
                onChange={setdata1}
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
                          value={inputdata.OdRightSphDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb2"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightcylDv"
                          value={inputdata.OdRightcylDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightAxisDv"
                          value={inputdata.OdRightAxisDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb1"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightVADV"
                          value={inputdata.OdRightVADV}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftSphDv"
                          value={inputdata.OsLeftSphDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftCylDv"
                          value={inputdata.OsLeftCylDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftAxisDv"
                          value={inputdata.OsLeftAxisDv}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftVaDv"
                          value={inputdata.OsLeftVaDv}
                          onChange={setdata1}
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
                          value={inputdata.OdRightNvAdd}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OdRightVaNvAdd"
                          value={inputdata.OdRightVaNvAdd}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td colSpan="3">
                        <input
                          name="OsLeftNvAdd"
                          value={inputdata.OsLeftNvAdd}
                          onChange={setdata1}
                          type="text"
                          className="form-control"
                          id="numb"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <input
                          name="OsLeftVaNvAdd"
                          value={inputdata.OsLeftVaNvAdd}
                          onChange={setdata1}
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
                    value={inputdata.instruction}
                    onChange={setdata1}
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
                    value={inputdata.lens}
                    onChange={setdata12}
                  >
                    <option value="">Lens</option>
                    {lensesOption}
                
                  </select>
                </div>
                <div class="col-md-1 dropdown">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="lensqyt"
                    value={inputdata.lensqyt}
                    onChange={setdata1}
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
                    value={inputdata.LensModelNumber}
                    onChange={setdata1}
                  />
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="Price"
                    name="lensprice"
                    value={inputdata.lensprice}
                    onChange={setdata1}
                  />
                </div>
                <div class="col-md-2 dropdown">
                  <select
                    class="form-select "
                    aria-label="Default select example"
                    name="frame"
                    value={inputdata.frame}
                    onChange={setdata13}
                  >
                    <option selected>Frame</option>
                   {frameOption}
                    </select>
                </div>
                <div class="col-md-1 dropdown">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="frameQyt"
                    value={inputdata.frameQyt}
                    onChange={setdata1}
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
                    value={inputdata.frameModelNumber}
                    onChange={setdata1}
                  />
                </div>
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    id="text"
                    placeholder="Price"
                    name="frameprice"
                    value={inputdata.frameprice}
                    onChange={setdata1}
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
                    inputdata.lensqyt * inputdata.lensprice +
                    inputdata.frameQyt * inputdata.frameprice
                  }
                  onChange={setdata1}
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
                  value={inputdata.Advance}
                  onChange={setdata1}
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
                    inputdata.lensqyt * inputdata.lensprice +
                    inputdata.frameQyt * inputdata.frameprice -
                    inputdata.Advance
                  }
                  onChange={setdata1}
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
                  value={inputdata.ModeOfPayment}
                  onChange={setdata1}
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
                onClick={addinputdata}
                className="btn-lg btn-success"
              >
                Submit
              </button>
            </div>

            {/*  */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
