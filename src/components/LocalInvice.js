import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadEye from "../img/invice_logo.jpg";
import Stamp from "../img/stamp.jpg";
import Cookies from "js-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";

const LocalInvoice = () => {
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

  const printLocalInvoice = () => {
    const printWindow = window.open("", "_blank", "width=900,height=650");

    const printStyles = `
      <style>
        @media print {
          @page {
            margin: 10mm;
            size: A4 portrait;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: #000 !important;
          }
          
          .local-invoice-container {
            max-width: 100%;
            margin: 0 auto;
            padding: 15px;
            position: relative;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #000;
          }
          
          .clinic-logo img {
            max-height: 70px;
            max-width: 180px;
          }
          
          .clinic-info {
            text-align: right;
            font-size: 12px;
          }
          
          .clinic-name {
            font-size: 22px;
            font-weight: bold;
            color: #000;
            margin: 0 0 5px 0;
          }
          
          .invoice-number {
            font-size: 13px;
            font-weight: bold;
            margin-top: 5px;
            background: #eee;
            padding: 5px 10px;
            display: inline-block;
          }
          
          .customer-info {
            margin: 15px 0;
            padding: 15px;
            background: #f5f5f5 !important;
            -webkit-print-color-adjust: exact !important;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          
          .customer-details {
            font-size: 12px;
            line-height: 1.4;
          }
          
          .customer-details p {
            margin: 4px 0;
          }
          
          .info-label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
          }
          
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
            border: 1px solid #000;
          }
          
          .invoice-table thead {
            background-color: #333 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          .invoice-table th {
            padding: 10px 6px;
            border: 1px solid #000;
            text-align: center;
            font-weight: bold;
          }
          
          .invoice-table td {
            padding: 8px 6px;
            border: 1px solid #000;
            text-align: center;
          }
          
          .amount-row {
            font-weight: bold;
            background-color: #f0f0f0 !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          .total-section {
            margin-top: 15px;
            padding: 10px;
            background: #f8f9fa;
            border: 1px solid #ddd;
            font-size: 13px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            padding: 3px 0;
          }
          
          .total-label {
            font-weight: bold;
          }
          
          .total-value {
            font-weight: bold;
          }
          
          .payment-mode {
            margin-top: 10px;
            font-size: 12px;
          }
          
          .thank-you {
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
          
          .footer-section {
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #000;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          
          .stamp-section {
            text-align: center;
          }
          
          .stamp-img {
            max-width: 120px;
            max-height: 80px;
          }
          
          .signature-label {
            font-size: 11px;
            font-weight: bold;
            margin-top: 5px;
          }
          
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 50px;
            color: rgba(0, 0, 0, 0.07);
            z-index: -1;
            font-weight: bold;
            white-space: nowrap;
          }
          
          .no-print {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        /* Screen preview styles */
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 0;
          background: white;
        }
        
        .local-invoice-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }
      </style>
    `;

    const printContent = document.getElementById(
      "printable-local-invoice"
    ).innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Local Invoice - ${invoiceData?.name || "Customer"}</title>
          ${printStyles}
        </head>
        <body>
          <div class="local-invoice-container">
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

  const lensPrice = (invoiceData.lensprice || 0) * (invoiceData.lensqyt || 0);
  const framePrice =
    (invoiceData.frameprice || 0) * (invoiceData.frameQyt || 0);
  const total = lensPrice + framePrice;
  const balance = total - (invoiceData.Advance || 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading invoice...</p>
      </div>
    );
  }

  return (
    <div className="local-invoice-page">
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-back" onClick={() => navigator(-1)}>
          <ArrowBackIcon /> Back
        </button>
        <button className="btn-print" onClick={printLocalInvoice}>
          <PrintIcon /> Print Local Invoice
        </button>
      </div>

      {/* Printable Local Invoice Content */}
      <div id="printable-local-invoice" className="printable-local-invoice">
        {/* Header */}
        <div className="invoice-header">
          <div className="clinic-logo">
            <img src={HeadEye} alt="Roshni Opticals Logo" />
          </div>
          <div className="clinic-info">
            <h1 className="clinic-name">Roshni Opticals</h1>
            <p>Near Maharishi University IIM Road</p>
            <p>Lucknow Opposite Ayushman Hospital 226013</p>
            <p>
              <strong>Mobile:</strong> 9616917142, 7985798138
            </p>
            <div className="invoice-number">
              Invoice #: {invoiceData?.invoiceNumber || "N/A"}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="customer-info">
          <div className="customer-details">
            <p>
              <span className="info-label">Date:</span>
              <span className="info-value">{new Date().toLocaleString()}</span>
            </p>
            <p>
              <span className="info-label">Customer Name:</span>
              <span className="info-value">{invoiceData.name || "N/A"}</span>
            </p>
            <p>
              <span className="info-label">Mobile No:</span>
              <span className="info-value">{invoiceData.number || "N/A"}</span>
            </p>
            <p>
              <span className="info-label">Address:</span>
              <span className="info-value">{invoiceData.Address || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="items-section">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Item</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{invoiceData.lens || "Lens"}</td>
                <td>{invoiceData.LensModelNumber || "N/A"}</td>
                <td>{invoiceData.lensqyt || "0"}</td>
                <td>₹{invoiceData.lensprice || "0"}</td>
                <td>₹{lensPrice}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{invoiceData.frame || "Frame"}</td>
                <td>{invoiceData.frameModelNumber || "N/A"}</td>
                <td>{invoiceData.frameQyt || "0"}</td>
                <td>₹{invoiceData.frameprice || "0"}</td>
                <td>₹{framePrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="total-section">
          <div className="total-row">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">₹{total}</span>
          </div>
          <div className="total-row">
            <span className="total-label">Advance Paid:</span>
            <span className="total-value">₹{invoiceData.Advance || "0"}</span>
          </div>
          <div className="total-row">
            <span className="total-label">Balance Due:</span>
            <span className="total-value">₹{balance}</span>
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
          <p style={{ fontSize: "12px", fontWeight: "normal", color: "#666" }}>
            Note: All items are non-returnable and non-exchangeable
          </p>
        </div>

        {/* Footer with Stamp */}
        <div className="footer-section">
          <div className="customer-signature">
            <div className="signature-line"></div>
            <p className="signature-label">Customer Signature</p>
          </div>

          <div className="stamp-section">
            <img src={Stamp} alt="Official Stamp" className="stamp-img" />
            <p className="signature-label">For Roshni Opticals</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark">ROSHNI OPTICALS</div>
      </div>

      <style jsx="true">{`
        /* Page Styles */
        .local-invoice-page {
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
          background: #17a2b8;
          color: white;
        }

        .btn-back:hover {
          background: #5a6268;
        }

        .btn-print:hover {
          background: #138496;
        }

        /* Invoice Content */
        .printable-local-invoice {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        /* Header */
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #17a2b8;
        }

        .clinic-logo img {
          max-height: 70px;
          max-width: 180px;
          object-fit: contain;
        }

        .clinic-info {
          text-align: right;
        }

        .clinic-name {
          color: #17a2b8;
          font-size: 24px;
          margin: 0 0 8px 0;
          font-weight: bold;
        }

        .clinic-info p {
          margin: 2px 0;
          font-size: 13px;
          color: #666;
          line-height: 1.3;
        }

        .invoice-number {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          background: #e9ecef;
          padding: 6px 12px;
          border-radius: 4px;
          display: inline-block;
          margin-top: 8px;
        }

        /* Customer Info */
        .customer-info {
          margin: 20px 0;
          padding: 15px;
          background: linear-gradient(to right, #f8f9fa, #e9ecef);
          border-radius: 6px;
          border: 1px solid #ced4da;
        }

        .customer-details p {
          margin: 6px 0;
          font-size: 14px;
          color: #333;
        }

        .info-label {
          font-weight: 600;
          color: #495057;
          display: inline-block;
          width: 130px;
        }

        .info-value {
          color: #212529;
          font-weight: 500;
        }

        /* Items Table */
        .items-section {
          margin: 25px 0;
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          overflow: hidden;
        }

        .invoice-table thead {
          background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
          color: white;
        }

        .invoice-table th {
          padding: 12px 8px;
          text-align: center;
          font-weight: 600;
          font-size: 13px;
          border: none;
        }

        .invoice-table td {
          padding: 10px 8px;
          text-align: center;
          font-size: 13px;
          border: 1px solid #dee2e6;
        }

        .invoice-table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .invoice-table tbody tr:hover {
          background-color: #e9ecef;
        }

        /* Totals Section */
        .total-section {
          background: linear-gradient(to right, #f8f9fa, #e9ecef);
          padding: 20px;
          border-radius: 6px;
          border: 1px solid #ced4da;
          margin: 20px 0;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          padding: 8px 0;
          border-bottom: 1px dashed #adb5bd;
        }

        .total-row:last-child {
          border-bottom: none;
          font-weight: bold;
        }

        .total-label {
          font-weight: 600;
          color: #495057;
          font-size: 14px;
        }

        .total-value {
          font-weight: 600;
          color: #212529;
          font-size: 14px;
        }

        .payment-mode {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #adb5bd;
          font-size: 13px;
        }

        .mode-label {
          font-weight: 600;
          color: #495057;
        }

        .mode-value {
          color: #212529;
          font-weight: 500;
        }

        /* Thank You */
        .thank-you {
          text-align: center;
          margin: 25px 0;
          padding: 15px;
          background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
          color: white;
          border-radius: 6px;
        }

        .thank-you p {
          margin: 5px 0;
          font-size: 15px;
        }

        /* Footer */
        .footer-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #17a2b8;
        }

        .customer-signature {
          text-align: left;
        }

        .signature-line {
          width: 200px;
          height: 2px;
          background: #333;
          margin-bottom: 8px;
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
          max-width: 130px;
          max-height: 90px;
          object-fit: contain;
          margin-bottom: 8px;
          border: 1px solid #ddd;
          padding: 5px;
          background: white;
        }

        /* Watermark */
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 60px;
          color: rgba(23, 162, 184, 0.08);
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
          border-top: 4px solid #17a2b8;
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
          .invoice-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .clinic-info {
            text-align: center;
          }

          .footer-section {
            flex-direction: column;
            gap: 25px;
            align-items: center;
          }

          .customer-signature {
            text-align: center;
          }

          .watermark {
            font-size: 40px;
          }

          .invoice-table {
            font-size: 12px;
          }

          .invoice-table th,
          .invoice-table td {
            padding: 8px 5px;
          }
        }

        /* Print Styles */
        @media print {
          .action-buttons {
            display: none !important;
          }

          .printable-local-invoice {
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

export default LocalInvoice;
