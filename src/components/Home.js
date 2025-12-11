import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import CakeIcon from "@mui/icons-material/Cake";
import { Space, Spin, message as antMessage } from "antd";
import { Modal, Button } from "react-bootstrap";
import UserDeleteButton from "./UserDeleteButton";
import Cookies from "js-cookie";
// import "./Home.css";

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
  const [modalShow, setModalShow] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const [getusedata, setuserdata] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [birthdayData, setBirthdata] = useState([]);

  // Birthday message templates
  const messageTemplates = [
    {
      title: "Thank You Message",
      value:
        "Thank you for visiting Roshni Opticals! Feel free to contact us 9616917142, 7985798138",
    },
    {
      title: "Order Ready",
      value:
        "Dear Sir/Maa'm, Your order is ready for pickup. Kindly collect it at your earliest convenience. Have questions? Let us know. Thanks!",
    },
    {
      title: "Birthday Wish",
      value:
        "🎁 Happy Birthday to our amazing customer! Your support means the world to us. Wishing you a day as fabulous as our latest eyewear collection! 🕶🎉 from Roshni Opticals",
    },
    {
      title: "Festival Greeting",
      value:
        "Happy Holi from Roshni Opticals! 🎉🌈 May your life be filled with vibrant colors and joyous moments. Have a wonderful and safe celebration!",
    },
  ];

  const sendWhatsappMessage = (number, name) => {
    setUserNumber(number);
    setSelectedUserName(name);
    setWhatsappMessage(messageTemplates[0].value);
    setModalShow(true);
  };

  const onSubmitMessage = () => {
    if (whatsappMessage.trim()) {
      let number = userNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
      let url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
        whatsappMessage
      )}&app_absent=${0}`;
      window.open(url, "_blank");
      setModalShow(false);
      antMessage.success("WhatsApp window opened!");
    } else {
      antMessage.warning("Please select or enter a message");
    }
  };

  const getdata = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const resdata = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getdata?page=${pageNumber}&searchQuery=${query}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setuserdata(resdata?.data?.data || []);
      setTotalPages(resdata?.data?.totalPages || 1);
      setTotalRecords(resdata?.data?.totalRecords || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      antMessage.error("Failed to load data");
      setLoading(false);
      if (error.response?.status === 401) {
        navigator("/login");
      }
    }
  };

  const getBirthdayData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/birthday`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setBirthdata(res?.data || []);
    } catch (error) {
      console.error("Error fetching birthday data:", error);
    }
  };

  useEffect(() => {
    getdata(currentPage);
    getBirthdayData();
  }, [currentPage, query]);

  const calculateTotal = (element) => {
    return (
      element.frameQyt * element.frameprice +
      element.lensqyt * element.lensprice
    );
  };

  const calculateBalance = (element) => {
    const total = calculateTotal(element);
    return total - element.Advance;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="home-container">
      {/* Birthday Alert Section */}
      {/* {birthdayData.length > 0 && (
        <div className="birthday-alert-section">
          <div className="birthday-header">
            <CakeIcon className="birthday-icon" />
            <h4>🎉 Birthday Alerts</h4>
          </div>
          <div className="birthday-cards">
            {birthdayData.map((ele, index) => (
              <div key={index} className="birthday-card">
                <div className="birthday-content">
                  <CakeIcon className="cake-icon" />
                  <div className="birthday-info">
                    <h6>{ele?.name}</h6>
                    <p className="birthday-text">🎂 Birthday Today! 🎉</p>
                    <p className="contact-number">{ele?.number}</p>
                  </div>
                </div>
                <button
                  className="whatsapp-birthday-btn"
                  onClick={() => sendWhatsappMessage(ele?.number, ele?.name)}
                >
                  <WhatsAppIcon /> Wish on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* WhatsApp Modal */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        className="whatsapp-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <WhatsAppIcon className="modal-whatsapp-icon" /> Send WhatsApp
            Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customer-info-modal">
            <p>
              <strong>Customer:</strong> {selectedUserName}
            </p>
            <p>
              <strong>Mobile:</strong> {userNumber}
            </p>
          </div>

          <div className="message-templates">
            <label className="form-label">Quick Templates</label>
            <select
              className="form-select template-select"
              onChange={(e) => setWhatsappMessage(e.target.value)}
              value={whatsappMessage}
            >
              {messageTemplates.map((template, index) => (
                <option key={index} value={template.value}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>

          <div className="message-editor mt-3">
            <label className="form-label">Custom Message</label>
            <textarea
              className="form-control message-textarea"
              rows="5"
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Type your custom message here..."
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={onSubmitMessage}
            className="send-whatsapp-btn"
          >
            <WhatsAppIcon /> Open WhatsApp
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Content */}
      <div className="home-content">
        {/* Header Section */}
        <div className="home-header">
          <div className="header-left">
            <h2 className="page-title">
              <ReceiptIcon className="title-icon" />
              Customer Records
            </h2>
            <div className="stats-badge">
              <span className="badge-count">{totalRecords}</span>
              <span className="badge-text">Total Customers</span>
            </div>
          </div>

          <div className="header-right">
            <button
              className="btn-refresh"
              onClick={() => getdata(currentPage)}
              title="Refresh"
            >
              <RefreshIcon />
            </button>

            <div className="search-container">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or mobile..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <NavLink to="/register" className="btn-add-customer">
              <AddIcon />
              Add Customer
            </NavLink>
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-section">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" tip="Loading customers..." />
            </div>
          ) : getusedata.length === 0 ? (
            <div className="no-data-container">
              <div className="no-data-icon">👓</div>
              <h4>No Customers Found</h4>
              <p>Try changing your search or add a new customer</p>
              <NavLink to="/register" className="btn-add-first">
                <AddIcon /> Add First Customer
              </NavLink>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="customers-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Mobile Number</th>
                      <th>Total Amount</th>
                      <th>Advance</th>
                      <th>Balance</th>
                      <th>Payment Mode</th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getusedata.map((element, index) => {
                      const serialNumber = (currentPage - 1) * 10 + index + 1;
                      const total = calculateTotal(element);
                      const balance = calculateBalance(element);

                      return (
                        <tr key={element._id} className="customer-row">
                          <td className="serial-number">{serialNumber}</td>
                          <td className="customer-name">
                            <span className="name-text">{element.name}</span>
                          </td>
                          <td className="mobile-number">
                            <span className="number-text">
                              {element.number}
                            </span>
                          </td>
                          <td className="total-amount">
                            <span className="amount-badge total">
                              {formatCurrency(total)}
                            </span>
                          </td>
                          <td className="advance-amount">
                            <span className="amount-badge advance">
                              {formatCurrency(element.Advance)}
                            </span>
                          </td>
                          <td className="balance-amount">
                            <span
                              className={`amount-badge ${
                                balance > 0 ? "pending" : "paid"
                              }`}
                            >
                              {formatCurrency(balance)}
                            </span>
                          </td>
                          <td className="payment-mode">
                            <span
                              className={`mode-badge ${element.ModeOfPayment?.toLowerCase()}`}
                            >
                              {element.ModeOfPayment || "N/A"}
                            </span>
                          </td>
                          <td className="action-buttons">
                            <div className="btn-group">
                              <NavLink
                                to={`view/${element._id}`}
                                className="btn-action view"
                                title="View Details"
                              >
                                <RemoveRedEyeIcon />
                              </NavLink>

                              <NavLink
                                to={`edit/${element._id}`}
                                className="btn-action edit"
                                title="Edit"
                              >
                                <EditIcon />
                              </NavLink>

                              <NavLink
                                to={`invice1/${element._id}`}
                                className="btn-action local"
                                title="Local Invoice"
                              >
                                <LocalPrintshopIcon />
                              </NavLink>

                              <NavLink
                                to={`invice/${element._id}`}
                                className="btn-action original"
                                title="Original Invoice"
                              >
                                <ReceiptIcon />
                              </NavLink>

                              <button
                                className="btn-action whatsapp"
                                onClick={() =>
                                  sendWhatsappMessage(
                                    element?.number,
                                    element?.name
                                  )
                                }
                                title="Send WhatsApp"
                              >
                                <WhatsAppIcon />
                              </button>

                              <UserDeleteButton
                                userId={element._id}
                                onDelete={(deletedUserId) => {
                                  const updatedData = getusedata.filter(
                                    (user) => user._id !== deletedUserId
                                  );
                                  setuserdata(updatedData);
                                  antMessage.success(
                                    "Customer deleted successfully"
                                  );
                                }}
                                className="btn-action delete"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination-section">
                <div className="pagination-info">
                  Showing {getusedata.length} of {totalRecords} customers
                </div>
                <div className="pagination-controls">
                  <button
                    className="btn-pagination prev"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ArrowBackIosIcon /> Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          className={`page-number ${
                            currentPage === pageNum ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="btn-pagination next"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next <ArrowForwardIosIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx="true">{`
        /* Main Container */
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        /* Birthday Alert Section */
        .birthday-alert-section {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 10px 30px rgba(240, 147, 251, 0.3);
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .birthday-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: white;
        }

        .birthday-icon {
          font-size: 32px;
        }

        .birthday-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
        }

        .birthday-card {
          background: white;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .birthday-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .birthday-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cake-icon {
          color: #ff6b6b;
          font-size: 28px;
        }

        .birthday-info h6 {
          margin: 0;
          color: #333;
          font-size: 16px;
          font-weight: 600;
        }

        .birthday-text {
          color: #ff6b6b;
          font-weight: 500;
          margin: 5px 0;
        }

        .contact-number {
          color: #666;
          font-size: 14px;
        }

        .whatsapp-birthday-btn {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .whatsapp-birthday-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
        }

        /* Main Content */
        .home-content {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        /* Header Section */
        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .page-title {
          margin: 0;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: 600;
        }

        .title-icon {
          color: #667eea;
          font-size: 28px;
        }

        .stats-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .badge-count {
          font-size: 18px;
          font-weight: bold;
        }

        .badge-text {
          font-size: 12px;
          opacity: 0.9;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-refresh {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 10px;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-refresh:hover {
          background: #e9ecef;
          color: #333;
        }

        .search-container {
          position: relative;
          min-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn-add-customer {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-add-customer:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          color: white;
        }

        /* Customers Table */
        .customers-table-section {
          margin-top: 20px;
        }

        .customers-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .customers-table thead {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .customers-table th {
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .customers-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid #f1f3f4;
        }

        .customers-table tbody tr:hover {
          background-color: #f8f9ff;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .customers-table td {
          padding: 14px 12px;
          color: #333;
          font-size: 14px;
        }

        /* Table Cells Styling */
        .customer-name .name-text {
          font-weight: 500;
          color: #333;
        }

        .mobile-number .number-text {
          font-family: monospace;
          font-weight: 500;
          color: #495057;
        }

        .amount-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 13px;
          min-width: 80px;
          text-align: center;
        }

        .amount-badge.total {
          background: #e3f2fd;
          color: #1976d2;
        }

        .amount-badge.advance {
          background: #e8f5e9;
          color: #388e3c;
        }

        .amount-badge.pending {
          background: #ffebee;
          color: #d32f2f;
        }

        .amount-badge.paid {
          background: #e8f5e9;
          color: #388e3c;
        }

        .mode-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mode-badge.cash {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .mode-badge.card {
          background: #e3f2fd;
          color: #1565c0;
        }

        .mode-badge.online {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        /* Action Buttons */
        .action-buttons .btn-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .btn-action {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-action.view {
          background: #e3f2fd;
          color: #1976d2;
        }

        .btn-action.edit {
          background: #e8f5e9;
          color: #388e3c;
        }

        .btn-action.local {
          background: #fff3e0;
          color: #f57c00;
        }

        .btn-action.original {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .btn-action.whatsapp {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
        }

        .btn-action.delete {
          background: #ffebee;
          color: #d32f2f;
        }

        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }

        /* Pagination */
        .pagination-section {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-top: 1px solid #e9ecef;
        }

        .pagination-info {
          color: #6c757d;
          font-size: 14px;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .btn-pagination {
          padding: 10px 20px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          background: white;
          color: #495057;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-pagination:hover:not(:disabled) {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .btn-pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-numbers {
          display: flex;
          gap: 8px;
        }

        .page-number {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
          background: white;
          color: #495057;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-number.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .page-number:hover:not(.active) {
          background: #f8f9fa;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }

        /* No Data State */
        .no-data-container {
          text-align: center;
          padding: 60px 20px;
        }

        .no-data-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .no-data-container h4 {
          color: #333;
          margin-bottom: 10px;
        }

        .no-data-container p {
          color: #6c757d;
          margin-bottom: 30px;
        }

        .btn-add-first {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-add-first:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          color: white;
        }

        /* WhatsApp Modal */
        .whatsapp-modal .modal-header {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
          border-radius: 10px 10px 0 0;
        }

        .modal-whatsapp-icon {
          margin-right: 10px;
        }

        .customer-info-modal {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .template-select {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 10px;
          font-size: 14px;
        }

        .message-textarea {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          resize: vertical;
        }

        .message-textarea:focus {
          border-color: #25d366;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
        }

        .send-whatsapp-btn {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .send-whatsapp-btn:hover {
          background: linear-gradient(135deg, #1da851 0%, #0d6e5a 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .home-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-left,
          .header-right {
            width: 100%;
          }

          .search-container {
            min-width: 100%;
          }

          .birthday-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .home-container {
            padding: 10px;
          }

          .home-content {
            padding: 20px;
          }

          .action-buttons .btn-group {
            gap: 4px;
          }

          .btn-action {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }

          .pagination-section {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .customers-table {
            font-size: 12px;
          }

          .customers-table th,
          .customers-table td {
            padding: 10px 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
