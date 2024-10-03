import React, { useState, useEffect } from 'react';
import { fetchTrainers } from '../../../api/Unit_Price_API'; // Đường dẫn có thể thay đổi tùy theo cấu trúc thư mục của bạn
import './TrainerUnitPricePage.css';

function TrainerUnitPrice() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers()
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error('Error in useEffect:', error);
      });
  }, []);

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
          {trainers.map((trainer, index) => (
            <tr className="data-row" key={index}>
              <td className="data-cell">{trainer.No}</td>
              <td className="data-cell">{trainer.Unitcode}</td>
              <td className="data-cell">{trainer.Lastmodifieddate}</td>
              <td className="data-cell">{trainer.Lastmodifiedby}</td>
              <td className="data-cell">{trainer.Price}</td>
              <td className="data-cell note">{trainer.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerUnitPrice;
