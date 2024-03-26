import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box } from '@mui/material';

const HomeComponent = () => {
  const [formState, setFormState] = useState({
    currentAge: '',
    lifeExpectancy: '',
    retirementAge: '',
    returnOnInvestment: '',
    marriageStatus: '',
    bendpoint1: '',
    bendpoint2: '',
    aime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    const postData = {
      currentAge: parseInt(formState.currentAge, 10),
      lifeExpectancy: parseInt(formState.lifeExpectancy, 10),
      retirementAge: parseInt(formState.retirementAge, 10),
      returnOnInvestment: parseFloat(formState.returnOnInvestment),
      marriageStatus: parseInt(formState.marriageStatus, 10),
      bendpoint1: parseInt(formState.bendpoint1, 10),
      bendpoint2: parseInt(formState.bendpoint2, 10),
      aime: parseInt(formState.aime, 10)
    };

    try {
      const response = await axios({
        method: 'post',
        url: 'https://kmytkxbdd5.execute-api.us-east-2.amazonaws.com/calculate',
        headers: { 'Content-Type': 'application/json',  'Access-Control-Allow-Origin': '*'  },
        data: JSON.stringify(postData),
        maxBodyLength: Infinity
      });
      
      console.log('Form submission successful:', response.data);
      alert('Form submission successful: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Form submission failed: ' + error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <TextField
        label="Current Age"
        type="number"
        name="currentAge"
        value={formState.currentAge}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        label="Life Expectancy"
        type="number"
        name="lifeExpectancy"
        value={formState.lifeExpectancy}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        label="Retirement Age"
        type="number"
        name="retirementAge"
        value={formState.retirementAge}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        label="Return on Investment"
        type="number"
        name="returnOnInvestment"
        value={formState.returnOnInvestment}
        onChange={handleChange}
        margin="normal"
        inputProps={{ step: "0.01" }}
      />
      

      
      <TextField
        label="Bendpoint1"
        type="number"
        name="bendpoint1"
        value={formState.bendpoint1}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        label="Bendpoint2"
        type="number"
        name="bendpoint2"
        value={formState.bendpoint2}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        label="AIME"
        type="number"
        name="aime"
        value={formState.aime}
        onChange={handleChange}
        margin="normal"
      />

<FormControl margin="normal">
        <InputLabel id="marriage-status-label">Marriage Status</InputLabel>
        <Select
          labelId="marriage-status-label"
          id="marriageStatus"
          name="marriageStatus"
          value={formState.marriageStatus}
          onChange={handleChange}
        >
          <MenuItem value="0">Single</MenuItem>
          <MenuItem value="1">Married</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={submitForm} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default HomeComponent;
