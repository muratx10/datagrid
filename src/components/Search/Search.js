import React from 'react';
import { TextField } from '@material-ui/core';
// import { connect } from 'react-redux';
// import { searchData } from '../../store/selector';


const SearchField = ({ onSearch }) => (
  <form noValidate autoComplete="off">
    <TextField
      label="Search"
      variant="outlined"
      color="primary"
      size="small"
      fullWidth
      onChange={onSearch}
    />
  </form>
);

export default SearchField;
