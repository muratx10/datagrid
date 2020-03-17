import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import setSearch from '../../store/actions/search';

const SearchField = ({ onSearchChange, search }) => (
  <form noValidate autoComplete="off">
    <TextField
      defaultValue={search}
      label="Search"
      variant="outlined"
      color="primary"
      size="small"
      fullWidth
      onChange={(event) => onSearchChange(event.target.value)}
    />
  </form>
);

function mapStateToProps(state) {
  return {
    search: state.search,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchChange: (search) => dispatch(setSearch(search)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
