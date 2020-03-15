import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

const SearchField = ({ onSearchChange }) => (
  <form noValidate autoComplete="off">
    <TextField
      label="Search"
      variant="outlined"
      color="primary"
      size="small"
      fullWidth
      onChange={(event) => onSearchChange(event.target.value)}
    />
  </form>
);

function mapDispatchToProps(dispatch) {
  return {
    onSearchChange: (search) => dispatch({ type: 'TABLE_SEARCH', payload: search }),
  };
}

export default connect(null, mapDispatchToProps)(SearchField);
