import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeadEye from "../img/invice_logo.jpg";
import Cookies from "js-cookie";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Details() {
  const token = Cookies.get("loginToken");
  const navigator = useNavigate();
  const { id } = useParams("");
  const [getusedata, setUserdata] = useState({});
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  const getdata = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getuser/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUserdata(res.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        navigator("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [id]);

  const printdetails = () => {
    const printContent = printRef.current;
    const printWindow = window.open("", "_blank", "width=900,height=650");

    const printStyles = `
      <style>
        /* Print-specific styles */
        @media print {
          @page {
            margin: 20mm;
            size: A4 portrait;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #000;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print-container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            padding: 0;
          }
          
          .prescription-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #000;
          }
          
          .clinic-logo img {
            max-height: 70px;
            max-width: 150px;
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
          
          .clinic-address, .clinic-contact {
            font-size: 12px;
            color: #333;
            margin: 3px 0;
            line-height: 1.3;
          }
          
          .patient-info {
            display: flex;
            justify-content: space-between;
            margin: 25px 0;
            padding: 15px;
            background-color: #f5f5f5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            border: 1px solid #ddd;
          }
          
          .info-left h3 {
            font-size: 16px;
            margin: 0 0 10px 0;
            color: #000;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          
          .info-item {
            display: flex;
            gap: 5px;
            font-size: 12px;
          }
          
          .info-label {
            font-weight: bold;
            min-width: 70px;
          }
          
          .info-value {
            font-weight: normal;
          }
          
          .info-right {
            text-align: right;
          }
          
          .prescription-id {
            background: #eee;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin: 20px 0 10px 0;
            padding-bottom: 5px;
            border-bottom: 1px solid #000;
          }
          
          .prescription-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
            page-break-inside: avoid;
          }
          
          .prescription-table th {
            background-color: #333 !important;
            color: white !important;
            font-weight: bold;
            padding: 8px 5px;
            border: 1px solid #000;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .prescription-table td {
            padding: 8px 5px;
            border: 1px solid #000;
            text-align: center;
          }
          
          .type-label {
            font-weight: bold;
            background-color: #f0f0f0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .instruction-section {
            margin: 15px 0;
            padding: 10px;
            background-color: #f9f9f9 !important;
            border: 1px solid #ddd;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .instruction-item {
            display: flex;
            gap: 10px;
            font-size: 12px;
          }
          
          .instruction-label {
            font-weight: bold;
            min-width: 80px;
          }
          
          .product-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
          }
          
          .lens-details, .frame-details {
            padding: 15px;
            border: 1px solid #ddd;
            background-color: #fafafa !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .section-subtitle {
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 10px 0;
            color: #000;
          }
          
          .detail-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px dotted #ccc;
            font-size: 12px;
          }
          
          .detail-label {
            font-weight: bold;
          }
          
          .amount-section {
            margin: 25px 0;
            padding: 20px;
            background-color: #f0f0f0 !important;
            border: 1px solid #ddd;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .amount-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
          
          .amount-card {
            padding: 15px;
            text-align: center;
            border: 1px solid #000;
            background-color: white !important;
          }
          
          .amount-card.highlight {
            background-color: #333 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .amount-label {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .amount-value {
            font-size: 20px;
            font-weight: bold;
          }
          
          .prescription-footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #000;
            font-size: 11px;
            color: #666;
            display: flex;
            justify-content: space-between;
          }
          
          .footer-note {
            max-width: 60%;
            line-height: 1.4;
          }
          
          .signature {
            text-align: center;
          }
          
          .signature-line {
            width: 150px;
            height: 1px;
            background: #000;
            margin: 0 auto 5px auto;
          }
          
          .signature-label {
            font-size: 10px;
          }
          
          /* Hide buttons and non-printable elements */
          .no-print {
            display: none !important;
          }
          
          /* Force backgrounds to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
        }
        
        /* Screen styles for print preview */
        body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
          padding: 0;
          background: white;
        }
        
        .print-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }
      </style>
    `;

    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${getusedata.name || "Patient"}</title>
          ${printStyles}
        </head>
        <body>
          <div class="print-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait a bit for styles to load
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const calculateTotal = () => {
    const frameTotal =
      (getusedata.frameQyt || 0) * (getusedata.frameprice || 0);
    const lensTotal = (getusedata.lensqyt || 0) * (getusedata.lensprice || 0);
    return frameTotal + lensTotal;
  };

  const calculateBalance = () => {
    const total = calculateTotal();
    const advance = parseFloat(getusedata.Advance) || 0;
    return total - advance;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading prescription details...</p>
      </div>
    );
  }

  return (
    <div className="details-page">
      {/* Action buttons - will be hidden when printing */}
      <div className="no-print action-buttons">
        <button onClick={() => navigator(-1)} className="btn-back">
          <ArrowBackIcon /> Back
        </button>
        <button onClick={printdetails} className="btn-print">
          <PrintIcon /> Print Customer Details
        </button>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="printable-content">
        {/* Header Section */}
        <div className="prescription-header">
          <div className="clinic-logo">
            <img src={HeadEye} alt="Roshni Opticals Logo" />
          </div>
          <div className="clinic-info">
            <h1 className="clinic-name">Roshni Opticals</h1>
            <p className="clinic-address">
              Near Maharishi University IIM Road
              <br />
              Lucknow opposite Ayushman Hospital 226013
            </p>
            <p className="clinic-contact">
              <strong>Mobile:</strong> 9616917142, 7985798138
            </p>
          </div>
        </div>

        <hr className="header-divider" />

        {/* Patient Information */}
        <div className="patient-info">
          <div className="info-left">
            <h3>Patient Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{getusedata.date || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{getusedata.name || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile:</span>
                <span className="info-value">{getusedata.number || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">{getusedata.age || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">DOB:</span>
                <span className="info-value">{getusedata.dob || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender:</span>
                <span className="info-value">{getusedata.gender || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* <div className="info-right">
            <div className="prescription-id">
              <span className="id-label">Prescription ID:</span>
              <span className="id-value">{id}</span>
            </div>
          </div> */}
        </div>

        {/* Prescription Table */}
        <div className="prescription-table-section">
          <h3 className="section-title">Eye Prescription</h3>
          <table className="prescription-table">
            <thead>
              <tr>
                <th rowSpan="2">Type</th>
                <th colSpan="4" className="eye-title">
                  OD (Right Eye)
                </th>
                <th colSpan="4" className="eye-title">
                  OS (Left Eye)
                </th>
              </tr>
              <tr>
                <th>Sph</th>
                <th>Cyl</th>
                <th>Axis</th>
                <th>VA</th>
                <th>Sph</th>
                <th>Cyl</th>
                <th>Axis</th>
                <th>VA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="type-label">DV</td>
                <td>{getusedata.OdRightSphDv || "-"}</td>
                <td>{getusedata.OdRightcylDv || "-"}</td>
                <td>{getusedata.OdRightAxisDv || "-"}</td>
                <td>{getusedata.OdRightVADV || "-"}</td>
                <td>{getusedata.OsLeftSphDv || "-"}</td>
                <td>{getusedata.OsLeftCylDv || "-"}</td>
                <td>{getusedata.OsLeftAxisDv || "-"}</td>
                <td>{getusedata.OsLeftVaDv || "-"}</td>
              </tr>
              <tr>
                <td className="type-label">NV (Add)</td>
                <td colSpan="3">{getusedata.OdRightNvAdd || "-"}</td>
                <td>{getusedata.OdRightVaNvAdd || "-"}</td>
                <td colSpan="3">{getusedata.OsLeftNvAdd || "-"}</td>
                <td>{getusedata.OsLeftVaNvAdd || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instruction */}
        <div className="instruction-section">
          <div className="instruction-item">
            <span className="instruction-label">Instruction:</span>
            <span className="instruction-value">
              {getusedata.instruction || "N/A"}
            </span>
          </div>
        </div>

        {/* Lens and Frame Details */}
        <div className="product-details">
          <div className="lens-details">
            <h4 className="section-subtitle">Lens Details</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Model:</span>
                <span className="detail-value">
                  {getusedata.LensModelNumber || "N/A"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{getusedata.lens || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">
                  {getusedata.lensqyt || "0"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value">
                  ₹{getusedata.lensprice || "0"}
                </span>
              </div>
            </div>
          </div>

          <div className="frame-details">
            <h4 className="section-subtitle">Frame Details</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Model:</span>
                <span className="detail-value">
                  {getusedata.frameModelNumber || "N/A"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">
                  {getusedata.frame || "N/A"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">
                  {getusedata.frameQyt || "0"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value">
                  ₹{getusedata.frameprice || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="amount-section">
          <h3 className="section-title">Payment Details</h3>
          <div className="amount-grid">
            <div className="amount-card">
              <div className="amount-label">Total Amount</div>
              <div className="amount-value">₹{calculateTotal()}</div>
            </div>
            <div className="amount-card">
              <div className="amount-label">Advance Paid</div>
              <div className="amount-value">₹{getusedata.Advance || "0"}</div>
            </div>
            <div className="amount-card highlight">
              <div className="amount-label">Balance Due</div>
              <div className="amount-value">₹{calculateBalance()}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="prescription-footer">
          <div className="footer-note">
            <p>
              <strong>Note:</strong> This prescription is valid for one year
              from the date of issue.
              <br />
              Please consult your optometrist for any concerns.
            </p>
          </div>
          <div className="signature">
            <div className="signature-line"></div>
            <p className="signature-label">Authorized Signature</p>
          </div>
        </div> */}
      </div>

      <style jsx="true">{`
        /* Screen styles */
        .details-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .no-print {
          display: block;
        }

        @media print {
          .no-print {
            display: none !important;
          }
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 8px;
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
          background: #007bff;
          color: white;
        }

        .btn-back:hover {
          background: #5a6268;
        }

        .btn-print:hover {
          background: #0056b3;
        }

        .printable-content {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        @media print {
          .printable-content {
            box-shadow: none;
            padding: 0;
          }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
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

        /* Print-specific inline styles */
        .printable-content {
          font-family: Arial, sans-serif;
        }

        .prescription-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #000;
        }

        .clinic-logo img {
          max-height: 70px;
          max-width: 150px;
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

        .clinic-address,
        .clinic-contact {
          font-size: 12px;
          color: #333;
          margin: 3px 0;
          line-height: 1.3;
        }

        .header-divider {
          margin: 20px 0;
          border: none;
          border-top: 1px solid #ccc;
        }

        .patient-info {
          display: flex;
          justify-content: space-between;
          margin: 25px 0;
          padding: 15px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .info-left h3 {
          font-size: 16px;
          margin: 0 0 10px 0;
          color: #000;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .info-item {
          display: flex;
          gap: 5px;
          font-size: 13px;
        }

        .info-label {
          font-weight: bold;
          min-width: 70px;
        }

        .info-right {
          text-align: right;
        }

        .prescription-id {
          background: #e9ecef;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #000;
          margin: 20px 0 10px 0;
          padding-bottom: 5px;
          border-bottom: 1px solid #000;
        }

        .prescription-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 13px;
          border: 1px solid #000;
        }

        .prescription-table th {
          background: #343a40;
          color: white;
          font-weight: bold;
          padding: 10px 5px;
          border: 1px solid #000;
          text-align: center;
        }

        .prescription-table td {
          padding: 10px 5px;
          border: 1px solid #000;
          text-align: center;
        }

        .type-label {
          font-weight: bold;
          background: #f8f9fa;
        }

        .instruction-section {
          margin: 15px 0;
          padding: 12px 15px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
        }

        .instruction-item {
          display: flex;
          gap: 10px;
          font-size: 14px;
        }

        .instruction-label {
          font-weight: bold;
          min-width: 90px;
        }

        .product-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 20px 0;
        }

        .lens-details,
        .frame-details {
          padding: 15px;
          border: 1px solid #dee2e6;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .section-subtitle {
          font-size: 15px;
          font-weight: bold;
          margin: 0 0 10px 0;
          color: #000;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #dee2e6;
          font-size: 13px;
        }

        .detail-label {
          font-weight: bold;
        }

        .amount-section {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .amount-card {
          padding: 15px;
          text-align: center;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 4px;
        }

        .amount-card.highlight {
          background: #007bff;
          color: white;
          border-color: #0056b3;
        }

        .amount-label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .amount-value {
          font-size: 22px;
          font-weight: bold;
        }

        .prescription-footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #dee2e6;
          font-size: 12px;
          color: #6c757d;
          display: flex;
          justify-content: space-between;
        }

        .footer-note {
          max-width: 60%;
          line-height: 1.5;
        }

        .signature {
          text-align: center;
        }

        .signature-line {
          width: 200px;
          height: 2px;
          background: #000;
          margin: 0 auto 8px auto;
        }

        .signature-label {
          font-size: 11px;
        }

        @media (max-width: 768px) {
          .product-details {
            grid-template-columns: 1fr;
          }

          .amount-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .patient-info {
            flex-direction: column;
            gap: 15px;
          }

          .info-right {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

export default Details;
