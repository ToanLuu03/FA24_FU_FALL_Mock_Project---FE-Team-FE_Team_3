import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import './ScheduleTrackerPage.css';
import { useOutletContext } from 'react-router-dom';
import Table from './Table'
import { classOptions, deliveryOptions, moduleOptions, options, statusOptions, trainingFormatOptions, trainerOptions, } from '../../../data/Schedule';
import { SearchOutlined } from '@ant-design/icons';
import Date from '../../../components/Admin/SelectDate/Date';
import { SelectBox, SelectOption } from '../../../components/Admin/Selectbox/SelectBox';


function ScheduleTracker() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // New trainer state
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTrainingFormat, setSelectedTrainingFormat] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const clickTable = () => {
    setShowTable(true)
  }

  const handleSelectMethod = (value) => {
    setSelectedMethod(value);
    setSelectedClass(null);
    setSelectedModule(null);
    setSelectedTrainer(null); // Reset trainer when method changes
    setShowTable(null);
  };

  const handleSelectClass = (value) => {
    setSelectedClass(value);
    setSelectedModule(null); setShowTable(null);
  };

  const handleSelectModule = (value) => {
    setSelectedModule(value);
    setShowTable(true);
  };

  const handleSelectTrainer = (value) => {
    setSelectedTrainer(value);
    setShowTable(null);
    setSelectedClass(null);
    setSelectedModule(null);
  };

  const handleSelectDelivery = (value) => handleSelectChange(value, setSelectedDelivery);
  const handleSelectStatus = (value) => handleSelectChange(value, setSelectedStatus);
  const handleSelectTrainingFormat = (value) => handleSelectChange(value, setSelectedTrainingFormat);

  const handleSelectChange = (value, setState) => {
    if (value.includes('Select All')) {
      setState(['Select All']);
    } else {
      setState(value);
    }
  };

  const { selectMenuItem } = useOutletContext();
  useEffect(() => {
    selectMenuItem('4');
  }, [selectMenuItem]);

  return (
    <div>
      <div className='tracker-by'>
        <span className='text'>Track by:</span> <br />
        <Select onChange={handleSelectMethod} options={options} />
      </div>


      {/* For Tracking by Class Name */}
      {selectedMethod === 'Class Name' && (
        <div className="classname">
          <div className='class-module'>
            <span className='text'>Class</span> <br />
            <SelectBox onChange={handleSelectClass} options={classOptions} />
          </div>

          {selectedClass && (
            <div className='class-module'>
              <span className='text'>Module</span> <br />
              <SelectBox onChange={handleSelectModule} options={moduleOptions} />
            </div>
          )}
        </div>
      )}

      {/* For Tracking by Trainer */}
      <div className='d-flex w-100 module-1'>
        {selectedMethod === 'Trainer' && (
          <div className="trainername-1">
            <span className='text'>Trainer</span>
            <br />
            <SelectBox onChange={handleSelectTrainer} options={trainerOptions} />
          </div>
        )}

        {/* For Tracking by Class Name */}
        <div className='w-100'>
          {selectedTrainer && (
            <div className="d-flex module-2 ">
              <div className="trainername-2">
                <span className='text'>Class</span><br />
                <Select onChange={handleSelectClass} options={classOptions} />
              </div>

              {selectedClass && (
                <div className='trainername-3'>
                  <span className='text'>Module</span> <br />
                  <Select onChange={handleSelectModule} options={moduleOptions} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Show additional filters when a module or trainer is selected */}
      {(selectedModule) && (
        <div className="d-flex justify-content-evenly " style={{ width: '300px', gap: 5 }}>
          <div>
            <span className='text'>Status</span> <br />
            <SelectOption
              options={deliveryOptions}
              value={selectedDelivery}
              onChange={handleSelectDelivery}
              placeholder="Please select delivery..."
            />
          </div>

          <div>
            <span className='text'>Status</span>  <br />
            <SelectOption
              options={statusOptions}
              value={selectedStatus}
              onChange={handleSelectStatus}
              placeholder="Please select Status.."
            />
          </div>

          <div>
            <span className='text'>Training Format</span> <br />
            <SelectOption
              options={trainingFormatOptions}
              value={selectedTrainingFormat}
              onChange={handleSelectTrainingFormat}
              placeholder="Please select traning fomat.."
            />
          </div>

          {/* Select Date */}
          <div className='select'>
            <span className='text'>Schedule (Start)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Schedule (End)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Actual (Start)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Actual (End)</span>
            <Date />
          </div>

          {/* Search */}
          <div>
            <span className='text'>Search</span>
            <br />
            <div className='d-flex col-12 search1' >
              <Input
                placeholder='Search...'
                className='search'
              />
              <div className='icon'>
                <a href='#1' onChange={clickTable}><SearchOutlined className='search-icon' /></a>
              </div>
            </div>
          </div>
        </div >
      )
      }

      {
        (showTable) && (
          <Table />
        )
      }
    </div >
  );
}

export default ScheduleTracker;
