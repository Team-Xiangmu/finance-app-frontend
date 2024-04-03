import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Typography, FormHelperText } from '@mui/material';

const HomeComponent = () => {
  const [formState, setFormState] = useState({
    currentAge: '',
    lifeExpectancy: '',
    retirementAge: '',
    returnOnInvestment: '',
    marriageStatus: '',
    aime: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (['currentAge', 'lifeExpectancy', 'retirementAge', 'aime'].includes(name)) {
      parsedValue = parseInt(value, 10) || '';
    } else if (name === 'returnOnInvestment') {
      parsedValue = parseFloat(value) || '';
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const submitForm = () => {
    console.log(formState);
    axios.post('https://kmytkxbdd5.execute-api.us-east-2.amazonaws.com/calculate', JSON.stringify(formState))
    .then((response) => {
      setResponseMessage('Form submission successful: ' + JSON.stringify(response.data));
    })
    .catch((error) => {
      setResponseMessage('Form submission failed: ' + error.message);
    });
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
        sx={{ width: '250px' }}
      />

      <FormControl margin="normal" sx={{ width: '250px' }}>
        <TextField
          label="Life Expectancy"
          type="number"
          name="lifeExpectancy"
          value={formState.lifeExpectancy}
          onChange={handleChange}
        />
        <FormHelperText>Should not exceed 3 digits</FormHelperText>
      </FormControl>

      <TextField
        label="Retirement Age"
        type="number"
        name="retirementAge"
        value={formState.retirementAge}
        onChange={handleChange}
        margin="normal"
        sx={{ width: '250px' }}
      />

      <TextField
        label="Return on Investment %"
        type="number"
        name="returnOnInvestment"
        value={formState.returnOnInvestment}
        onChange={handleChange}
        margin="normal"
        inputProps={{ step: '0.01' }}
        sx={{ width: '250px' }}
      />

      <TextField
        label="AIME"
        type="number"
        name="aime"
        value={formState.aime}
        onChange={handleChange}
        margin="normal"
        sx={{ width: '250px' }}
      />

      <FormControl margin="normal" sx={{ width: '250px' }}>
        <InputLabel id="marriage-status-label">Marriage Status</InputLabel>
        <Select
          labelId="marriage-status-label"
          id="marriageStatus"
          name="marriageStatus"
          value={formState.marriageStatus}
          onChange={handleChange}
          label="Marriage Status"
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={submitForm}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      {responseMessage && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
};

export default HomeComponent;
