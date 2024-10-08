import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AddTrainerPage() {
  const [trainer, setTrainer] = useState({
    name: '',
    account: '',
    employeeId: '',
    type: 'Internal',
    site: 'HN',
    jobRank: '',
    trainCert: '',
    professionalLevel: '',
    competencyIndex: '',
    status: 'Available',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrainer({
      ...trainer,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Trainer data submitted:', trainer);
  };

  return (
    <div>
      <h2>Add Trainer Profile</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Full Name"
          value={trainer.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="account"
          label="Account"
          value={trainer.account}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="employeeId"
          label="Employee ID"
          value={trainer.employeeId}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Trainer Type</InputLabel>
          <Select
            name="type"
            value={trainer.type}
            onChange={handleChange}
          >
            <MenuItem value="Internal">Internal</MenuItem>
            <MenuItem value="External">External</MenuItem>
          </Select>
        </FormControl>
        {/* Thêm các trường khác tương tự */}

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default AddTrainerPage;
