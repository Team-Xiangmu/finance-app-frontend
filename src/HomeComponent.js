import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Select, MenuItem, Button, FormControl, InputLabel,
  Box, Typography, FormHelperText, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';

const ResponseDisplayComponent = ({ responseData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = JSON.parse(responseData.replace('Form submission successful: ', ''));
  const piaArray = Object.entries(data.pia_array);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '70%', m: 'auto', p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom component="div">
        Submission Results
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }} component="div">
        PIA Array
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="pia-array" size="medium" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: '#1976d2', color: '#fff', fontSize: '1rem' } }}>
                <TableCell>Age</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {piaArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(([age, value]) => (
                <TableRow key={age} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f5f5f5' }, '& .MuiTableCell-root': { fontSize: '0.875rem' } }}>
                  <TableCell component="th" scope="row">
                    {age}
                  </TableCell>
                  <TableCell align="right">
                    {parseFloat(value).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={piaArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ '.MuiTablePagination-toolbar': { justifyContent: 'flex-end' }, '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { margin: 0 } }}
        />
      </Paper>
    </Box>
  );
};

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PIA Calculator
        </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {responseMessage && (
        <ResponseDisplayComponent responseData={responseMessage} />
      )}
    </Box>
  );
};

export default HomeComponent;
