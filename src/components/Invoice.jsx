import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadEye from "../img/invice_logo.jpg";
import Stamp from "../img/stamp.jpg";
import Cookies from "js-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";

const Invoice = () => {
  const token = Cookies.get("loginToken");
  const navigator = useNavigate();
  const { id } = useParams("");

  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);

  const getInvoiceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getuser/${id}`
      );
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoiceData();
  }, [id]);

  const printInvoice = () => {
    const printWindow = window.open("", "_blank", "width=900,height=650");

    const printStyles = `
      <style>
        @media print {
          @page {
            margin: 15mm;
            size: A4 portrait;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .invoice-container {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            position: relative;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #000;
          }
          
          .clinic-logo img {
            max-height: 80px;
            max-width: 200px;
          }
          
          .clinic-info {
            text-align: right;
          }
          
          .clinic-name {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin: 0 0 5px 0;
          }
          
          .clinic-details {
            font-size: 12px;
            color: #333;
            line-height: 1.4;
          }
          
          .invoice-number {
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
          }
          
          .customer-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 25px 0;
            padding: 20px;
            background: #f5f5f5 !important;
            -webkit-print-color-adjust: exact !important;
            border: 1px solid #ddd;
          }
          
          .bill-to, .invoice-details {
            font-size: 13px;
          }
          
          .section-title {
            font-weight: bold;
            font-size: 16px;
            margin: 0 0 10px 0;
            color: #000;
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
          }
          
          .info-item {
            margin: 5px 0;
            display: flex;
          }
          
          .info-label {
            font-weight: bold;
            min-width: 120px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 13px;
          }
          
          table thead {
            background-color: #333 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          table th {
            padding: 12px 8px;
            border: 1px solid #000;
            text-align: center;
            font-weight: bold;
          }
          
          table td {
            padding: 10px 8px;
            border: 1px solid #000;
            text-align: center;
          }
          
          .total-row {
            font-weight: bold;
            background-color: #f0f0f0 !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          .status-paid {
            color: #28a745;
            font-weight: bold;
          }
          
          .status-pending {
            color: #dc3545;
            font-weight: bold;
          }
          
          .payment-mode {
            margin-top: 20px;
            font-size: 14px;
          }
          
          .footer-section {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #000;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          
          .thank-you {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
          }
          
          .stamp-section {
            text-align: center;
          }
          
          .stamp-img {
            max-width: 150px;
            max-height: 100px;
          }
          
          .signature-label {
            margin-top: 10px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(0, 0, 0, 0.1);
            z-index: -1;
            font-weight: bold;
          }
          
          .no-print {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      </style>
    `;

    const printContent = document.getElementById("printable-invoice").innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoiceData?.name || "Customer"}</title>
          ${printStyles}
        </head>
        <body>
          <div class="invoice-container">
            ${printContent}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const lensePrice = (invoiceData.lensprice || 0) * (invoiceData.lensqyt || 0);
  const framePrice =
    (invoiceData.frameprice || 0) * (invoiceData.frameQyt || 0);
  const total = lensePrice + framePrice;
  const balance = total - (invoiceData.Advance || 0);
  const isPaid = balance === 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading invoice...</p>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-back" onClick={() => navigator(-1)}>
          <ArrowBackIcon /> Back
        </button>
        <button className="btn-print" onClick={printInvoice}>
          <PrintIcon /> Print Invoice
        </button>
      </div>

      {/* Printable Invoice Content */}
      <div id="printable-invoice" className="printable-invoice">
        {/* Header */}
        <div className="invoice-header">
          <div className="clinic-logo">
            <img src={HeadEye} alt="Roshni Opticals Logo" />
          </div>
          <div className="clinic-info">
            <h1 className="clinic-name">Roshni Opticals</h1>
            <div className="clinic-details">
              <p>Near Maharishi University IIM Road</p>
              <p>Lucknow opposite Ayushman Hospital 226013</p>
              <p>
                <strong>Mobile:</strong> 9616917142, 7985798138
              </p>
            </div>
            <div className="invoice-number">
              Invoice #: {invoiceData?.invoiceNumber || "N/A"}
            </div>
          </div>
        </div>

        {/* Customer and Invoice Details */}
        <div className="customer-info">
          <div className="bill-to">
            <h3 className="section-title">Bill To</h3>
            <div className="info-item">
              <span className="info-label">Customer Name:</span>
              <span className="info-value">{invoiceData.name || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mobile No:</span>
              <span className="info-value">{invoiceData.number || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{invoiceData.Address || "N/A"}</span>
            </div>
          </div>

          <div className="invoice-details">
            <h3 className="section-title">Invoice Details</h3>
            <div className="info-item">
              <span className="info-label">Invoice Date:</span>
              <span className="info-value">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Invoice Number:</span>
              <span className="info-value">
                {invoiceData?.invoiceNumber || "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Due Date:</span>
              <span className="info-value">On Receipt</span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="items-section">
          <h3 className="section-title">Items</h3>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (₹)</th>
                <th>Total Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{invoiceData.lens || "Lens"}</td>
                <td>{invoiceData.LensModelNumber || "N/A"}</td>
                <td>{invoiceData.lensqyt || "0"}</td>
                <td>{invoiceData.lensprice || "0"}</td>
                <td>₹{lensePrice}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{invoiceData.frame || "Frame"}</td>
                <td>{invoiceData.frameModelNumber || "N/A"}</td>
                <td>{invoiceData.frameQyt || "0"}</td>
                <td>{invoiceData.frameprice || "0"}</td>
                <td>₹{framePrice}</td>
              </tr>
              <tr className="total-row">
                <td
                  colSpan="5"
                  style={{ textAlign: "right", paddingRight: "20px" }}
                >
                  <strong>Subtotal:</strong>
                </td>
                <td>
                  <strong>₹{total}</strong>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "right", paddingRight: "20px" }}
                >
                  <strong>Advance Paid:</strong>
                </td>
                <td>₹{invoiceData.Advance || "0"}</td>
              </tr>
              <tr className="total-row">
                <td
                  colSpan="5"
                  style={{ textAlign: "right", paddingRight: "20px" }}
                >
                  <strong>Balance Due:</strong>
                </td>
                <td>
                  <strong className={isPaid ? "status-paid" : "status-pending"}>
                    ₹{balance}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Status */}
        <div className="status-section">
          <div className="payment-status">
            <span className="status-label">Payment Status: </span>
            <span className={isPaid ? "status-paid" : "status-pending"}>
              {isPaid ? "PAID" : "PENDING"}
            </span>
          </div>
          <div className="payment-mode">
            <span className="mode-label">Payment Mode: </span>
            <span className="mode-value">
              {invoiceData.ModeOfPayment || "N/A"}
            </span>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="thank-you">
          <p>Thank You For Visiting Roshni Opticals</p>
          <p>Terms: All sales are final. No returns or exchanges.</p>
        </div>

        {/* Footer with Stamp and Signature */}
        <div className="footer-section">
          <div className="signature-section">
            <div className="signature-line"></div>
            <p className="signature-label">Authorized Signature</p>
          </div>

          <div className="stamp-section">
            <img src={Stamp} alt="Stamp" className="stamp-img" />
            <p className="signature-label">Roshni Opticals</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark">
          <h1>ROSHNI OPTICALS</h1>
        </div>
      </div>

      <style jsx="true">{`
        /* Page Styles */
        .invoice-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .btn-back,
        .btn-print {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-back {
          background: #6c757d;
          color: white;
        }

        .btn-print {
          background: #28a745;
          color: white;
        }

        .btn-back:hover {
          background: #5a6268;
        }

        .btn-print:hover {
          background: #218838;
        }

        /* Invoice Content */
        .printable-invoice {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        /* Header */
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #007bff;
        }

        .clinic-logo img {
          max-height: 80px;
          max-width: 200px;
          object-fit: contain;
        }

        .clinic-info {
          text-align: right;
        }

        .clinic-name {
          color: #007bff;
          font-size: 28px;
          margin: 0 0 10px 0;
          font-weight: bold;
        }

        .clinic-details {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .invoice-number {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          background: #f8f9fa;
          padding: 8px 15px;
          border-radius: 4px;
          display: inline-block;
        }

        /* Customer Info */
        .customer-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin: 30px 0;
          padding: 25px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #343a40;
          margin: 0 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #007bff;
        }

        .info-item {
          display: flex;
          margin: 8px 0;
          font-size: 14px;
        }

        .info-label {
          font-weight: 600;
          color: #495057;
          min-width: 140px;
        }

        .info-value {
          color: #212529;
          font-weight: 500;
        }

        /* Items Table */
        .items-section {
          margin: 30px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        table thead {
          background: linear-gradient(135deg, #343a40 0%, #495057 100%);
          color: white;
        }

        table th {
          padding: 15px 10px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          border: none;
        }

        table td {
          padding: 12px 10px;
          text-align: center;
          font-size: 14px;
          border: 1px solid #dee2e6;
        }

        table tbody tr:hover {
          background-color: #f8f9fa;
        }

        .total-row {
          background-color: #e9ecef !important;
          font-weight: bold;
        }

        /* Status Section */
        .status-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .payment-status,
        .payment-mode {
          font-size: 16px;
          font-weight: 500;
        }

        .status-label,
        .mode-label {
          font-weight: 600;
          color: #495057;
        }

        .status-paid {
          color: #28a745;
          font-weight: bold;
          background: #d4edda;
          padding: 5px 15px;
          border-radius: 20px;
        }

        .status-pending {
          color: #dc3545;
          font-weight: bold;
          background: #f8d7da;
          padding: 5px 15px;
          border-radius: 20px;
        }

        /* Thank You */
        .thank-you {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          color: white;
          border-radius: 8px;
        }

        .thank-you p {
          margin: 5px 0;
          font-size: 16px;
        }

        .thank-you p:first-child {
          font-size: 18px;
          font-weight: bold;
        }

        /* Footer */
        .footer-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #dee2e6;
        }

        .signature-section {
          text-align: left;
        }

        .signature-line {
          width: 200px;
          height: 2px;
          background: #333;
          margin-bottom: 10px;
        }

        .signature-label {
          font-size: 12px;
          color: #666;
          font-weight: 600;
        }

        .stamp-section {
          text-align: center;
        }

        .stamp-img {
          max-width: 150px;
          max-height: 100px;
          object-fit: contain;
          margin-bottom: 10px;
        }

        /* Watermark */
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 70px;
          color: rgba(0, 123, 255, 0.05);
          z-index: 0;
          font-weight: bold;
          white-space: nowrap;
          pointer-events: none;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .customer-info {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .status-section {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .invoice-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .clinic-info {
            text-align: center;
          }

          .footer-section {
            flex-direction: column;
            gap: 30px;
            align-items: center;
          }

          .signature-section {
            text-align: center;
          }

          .watermark {
            font-size: 40px;
          }

          table {
            font-size: 12px;
          }

          table th,
          table td {
            padding: 8px 5px;
          }
        }

        /* Print Styles */
        @media print {
          .action-buttons {
            display: none !important;
          }

          .printable-invoice {
            box-shadow: none;
            padding: 0;
          }

          .watermark {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default Invoice;
