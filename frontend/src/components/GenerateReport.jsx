import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/reports/sales-report', {
        params: { startDate, endDate },
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 16);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 23);

    const tableColumn = ['Product Name', 'Total Quantity', 'Total Sales'];
    const tableRows = [];

    report.forEach(item => {
      const reportData = [
        item._id,
        item.totalQuantity,
        item.totalSales
      ];
      tableRows.push(reportData);
    });

    // Add the table to the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    
    // Save the PDF
    doc.save(`sales_report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div className="container mt-4">
      <h3>Generate Sales Report</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Generate Report</button>
      </form>

      {report.length > 0 && (
        <div className="mt-4">
          <h4>Report Results</h4>
          <button className="btn btn-success mb-3" onClick={downloadPDF}>Download PDF</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Quantity</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{item.totalSales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
