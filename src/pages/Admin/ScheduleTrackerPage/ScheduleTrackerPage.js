import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import './ScheduleTrackerPage.css';
import { DatePicker, Space } from 'antd';
import { useOutletContext } from 'react-router-dom';
import Table from './Table'


import {
  classOptions,
  deliveryOptions,
  moduleOptions,
  options,
  statusOptions,
  trainingFormatOptions,
  trainerOptions,
  // combinedTableData, // Trainer options
} from '../../../data/Schedule';
import { SearchOutlined } from '@ant-design/icons';



const onChange = (date, dateString) => {
  console.log(date, dateString);
};

function ScheduleTracker() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // New trainer state

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTrainingFormat, setSelectedTrainingFormat] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const { Option } = Select;
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
    setShowTable(true); // Show table when module is selected

  };

  const handleSelectTrainer = (value) => {
    setSelectedTrainer(value);
    setShowTable(null);
    setSelectedClass(null);
    setSelectedModule(null);
  };

  const handleSelectDelivery = (value) => {
    console.log("Selected value from Select component:", value);


    if (value.includes('Select All')) {
      setSelectedDelivery(['Select All']);
    } else {

      setSelectedDelivery(value);
    }
  };

  const handleSelectStatus = (value) => {
    console.log("Selected value from Select component:", value);


    if (value.includes('Select All')) {
      setSelectedStatus(['Select All']);
    } else {

      setSelectedStatus(value);
    }
  };

  const handleSelectTrainingFormat = (value) => {
    console.log("Selected value from Select component:", value);


    if (value.includes('Select All')) {
      setSelectedTrainingFormat(['Select All']);
    } else {

      setSelectedTrainingFormat(value);
    }
  };




  const { selectMenuItem } = useOutletContext();
  useEffect(() => {
    selectMenuItem('3');
  }, [selectMenuItem]);

  return (
    <div>
      <div className='tracker-by'>
        <span className='text'>Track by:</span>
        <br />
        <Select
          placeholder="Please select your tracking method..."
          onChange={handleSelectMethod}

          options={options}

        />
      </div>


      {/* For Tracking by Class Name */}
      {selectedMethod === 'Class Name' && (
        <div className="classname">
          <div className='class-module'>
            <span className='text'>Class</span>
            <br />
            <Select
              onChange={handleSelectClass}
              placeholder="Please select a class..."

              options={classOptions}
              className='select-option'
            />
          </div>

          {selectedClass && (
            <div className='class-module'>
              <span className='text'>Module</span>
              <br />
              <Select
                placeholder="Please select a module..."
                onChange={handleSelectModule}
                options={moduleOptions}
                className='select-option'
              />
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
            <Select
              onChange={handleSelectTrainer}
              placeholder="Please select a trainer..."
              options={trainerOptions}

            />
          </div>
        )}

        {/* For Tracking by Class Name */}
        <div className='w-100'>
          {selectedTrainer && (
            <div className="d-flex module-2 ">
              <div className="trainername-2">
                <span className='text'>Class</span>
                <br />
                <Select
                  onChange={handleSelectClass}
                  placeholder="Please select a class..."
                  options={classOptions}

                />
              </div>

              {selectedClass && (
                <div className='trainername-3'>
                  <span className='text'>Module</span>
                  <br />
                  <Select
                    placeholder="Please select a module..."
                    onChange={handleSelectModule}
                    options={moduleOptions}

                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>



      {/* Show additional filters when a module or trainer is selected */}
      {(selectedModule) && (
        <div className="d-flex justify-content-evenly">


          <div className='select'>
            <span className='text'>Delivery Type</span>
            <br />
            <Select
              mode="multiple"
              value={selectedDelivery} //   
              onChange={handleSelectDelivery}
              placeholder="Please select delivery.."
              className='choose-select'

            >
              {deliveryOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className=' select'>
            <span className='text'>Status</span>
            <br />

            <Select
              mode="multiple"
              value={selectedStatus} //   
              onChange={handleSelectStatus}
              placeholder="Please select delivery.."
              className='choose-select'
            >
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>


          </div>


          <div className=' select'>
            <span className='text'>Training Format</span>
            <br />
            <Select
              mode="multiple"
              value={selectedTrainingFormat} //   
              onChange={handleSelectTrainingFormat}
              placeholder="Please select delivery.."
              className='choose-select'
              maxTagTextLength={20}
            >
              {trainingFormatOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>


          </div>



          <div className='select'>
            <Space direction="vertical">
              <span className='text'>Schedule (Start)</span>
              <DatePicker onChange={onChange} className='choose-select' />
            </Space>
          </div>

          <div className='select'>
            <Space direction="vertical">
              <span className='text'>Schedule (End)</span>
              <DatePicker onChange={onChange} className='choose-select' />
            </Space>
          </div>

          <div className='select'>
            <Space direction="vertical">
              <span className='text'>Actual (Start)</span>
              <DatePicker onChange={onChange} className='choose-select' />
            </Space>
          </div>

          <div className='select'>
            <Space direction="vertical">
              <span className='text'>Actual (End)</span>
              <DatePicker onChange={onChange} className='choose-select' />
            </Space>
          </div>



          <div>
            <span className='text'>Search</span>
            <br />
            <div className='d-flex col-12 abc'>
              <Input
                placeholder='Search...'
                style={{ width: '300px' }}
                className='search'
              />
              <div className='icon'>
                <a onChange={clickTable}><SearchOutlined className='search-icon' /></a>
              </div>

            </div>
          </div>


        </div>
      )}



      {
        (showTable) && (
          <Table />
        )
      }





    </div >
  );
}

export default ScheduleTracker;
