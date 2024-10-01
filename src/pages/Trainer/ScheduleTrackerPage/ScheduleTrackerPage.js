import React, {useEffect, useState } from 'react';
import { Select } from 'antd';
import './ScheduleTrackerPage.css'
import { useOutletContext } from 'react-router-dom';

const options = [
  {
    label: 'Class Name',
    value: 'Class Name',
  },
  {
    label: 'Trainer',
    value: 'Trainer',
  },
];

const classOptions = [
  {
    label: 'Class 1',
    value: 'Name1',
  },
  {
    label: 'Class 2',
    value: 'Name2',
  },
];

const trainerOptions = [
  {
    label: 'Trainer 1',
    value: 'Trainer1',
  },
  {
    label: 'Trainer 2',
    value: 'Trainer2',
  },
];

const moduleOptions = [
  {
    label: 'Module 1',
    value: 'Module1',
  },
  {
    label: 'Module 2',
    value: 'Module2',
  },
];

function ScheduleTracker() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedClassForTrainer, setSelectedClassForTrainer] = useState(null);

  // Handlers for tracking by Class Name
  const handleSelectMethod = (value) => {
    setSelectedMethod(value);
    setSelectedClass(null); // Reset class selection when method changes
    setSelectedTrainer(null); // Reset trainer selection when method changes
  };

  const handleSelectClass = (value) => {
    setSelectedClass(value);
  };

  // Handlers for tracking by Trainer
  const handleSelectTrainer = (value) => {
    setSelectedTrainer(value);
    setSelectedClassForTrainer(null); // Reset class selection for Trainer when a trainer is selected
  };

  const handleSelectClassForTrainer = (value) => {
    setSelectedClassForTrainer(value);
  };
  const { selectMenuItem } = useOutletContext();
  useEffect(() => {
    selectMenuItem('3');
  }, [selectMenuItem]);
  return (
    <div>
      <span className='text'>Track by:</span>
      <br />
      <Select
        placeholder="Please select your tracking method..."
        onChange={handleSelectMethod}
        style={{
          width: '40%',
          color: '#606060',
        }}
        options={options}
      />

      <br />

      {/* For Tracking by Class Name */}
      <div>
        {selectedMethod === 'Class Name' && (
          <div className="classname">
            <div>
              <span className='text'>Class</span>
              <br />
              <Select
                onChange={handleSelectClass}
                placeholder="Please select a class..."
                style={{
                  width: '400px',
                  color: '#606060',
                }}
                options={classOptions}
              />
            </div>

            {selectedClass && (
              <div>
                <span className='text'>Module</span>
                <br />
                <Select
                  placeholder="Please select a module..."
                  style={{
                    width: '400px',
                    color: '#606060',
                  }}
                  options={moduleOptions}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* For Tracking by Trainer */}
      {selectedMethod === 'Trainer' && (
        <div className='d-flex'>
          <div>
            <span className='text'>Trainer</span>
            <br />
            <Select
              onChange={handleSelectTrainer}
              placeholder="Please select a trainer..."
              style={{
                width: '380px',
                color: '#606060',

              }}
              options={trainerOptions}
            />
          </div>

          <div className='trainer'>
            {selectedTrainer && (
              <div className="trainer-1">
                <div>
                  <span className='text'>Class</span>
                  <br />
                  <Select
                    placeholder="Please select a class..."
                    onChange={handleSelectClassForTrainer}
                    style={{
                      width: '380px',
                      color: '#606060',
                    }}
                    options={classOptions}
                  />
                </div>

                {selectedClassForTrainer && (
                  <div>
                    <span className='text'>Module</span>
                    <br />
                    <Select
                      placeholder="Please select a module..."
                      style={{
                        width: '380px',
                        color: '#606060',
                      }}
                      options={moduleOptions}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleTracker;
