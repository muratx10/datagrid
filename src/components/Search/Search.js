import React from 'react';
import { TextField } from '@material-ui/core';

const SearchField = () => (
  <form noValidate autoComplete="off">
    <TextField
      label="Search"
      variant="outlined"
      color="primary"
      size="small"
      fullWidth
      onChange={(e) => console.log(e.target.value)}
    />
  </form>
);

export default SearchField;
