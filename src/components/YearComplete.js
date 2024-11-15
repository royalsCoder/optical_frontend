


import React, { useContext, useState } from 'react'
import { adddata } from './context/ContestProvider';
import { Modal, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';


const YearComplete = () => {
    const [oneYearCompleteData, birthdata, lastStockData] = useContext(adddata);

    const [modalShow, setModalShow] = React.useState(false);

    const [userNumber, setUserNumber] = useState("");

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        mobileNumber: "",
        message: "",
    });


    const sendMessage = (number) => {
        setFormData({ mobileNumber: number, message: "" });
        setModalShow(true);
        setUserNumber(number);
    };

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
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        {oneYearCompleteData?.map((ele, index) => {
                            return (
                                <>
                                    <div className="col-md-6 p-2">
                                        <div className=" p-2" style={{ backgroundColor: "#ddd" }}>
                                            <h6 className="text-danger">🎂 Birthday Alert!🎉🎉</h6>
                                            <p className="m-0 ">
                                                1 year complete  <b className="m-0">{ele?.name} </b>
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
                </div>

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





            </div>
        </>
    )
}

export default YearComplete

