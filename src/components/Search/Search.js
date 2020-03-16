import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { filterData } from '../../store/selector';


const SearchField = ({ search }) => (
  <form noValidate autoComplete="off">
    <TextField
      label="Search"
      variant="outlined"
      color="primary"
      size="small"
      fullWidth
      onChange={(e) => search(e.target.value)}
    />
  </form>
);

const mapDispatchToProps = (dispatch) => (
  { search: (text) => dispatch(filterData(text)) }
);

export default connect(null, mapDispatchToProps)(SearchField);
