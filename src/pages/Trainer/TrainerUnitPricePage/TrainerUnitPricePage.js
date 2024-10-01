import React from 'react';
import './TrainerUnitPricePage.css';

function TrainerUnitPrice() {
  return (
    <div className="trainer-container">
      <table className="trainer-table">
        <thead>
          <tr className="header-row">
            <th className="header-cell">No.</th>
            <th className="header-cell">Unit Code</th>
            <th className="header-cell">Last Modified Date</th>
            <th className="header-cell">Last Modified By</th>
            <th className="header-cell">Price</th>
            <th className="header-cell note">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr className="data-row">
            <td className="data-cell">1</td>
            <td className="data-cell">OT_Interview</td>
            <td className="data-cell">26-Feb-2024</td>
            <td className="data-cell">HoangNX27Test</td>
            <td className="data-cell">10000000</td>
            <td className="data-cell note">Bad Grade score</td>
          </tr>
          <tr className="data-row">
            <td className="data-cell">2</td>
            <td className="data-cell">Support/Guide</td>
            <td className="data-cell">26-Feb-2024</td>
            <td className="data-cell">HoangNX27Test</td>
            <td className="data-cell">1000000</td>
            <td className="data-cell note"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TrainerUnitPrice;
