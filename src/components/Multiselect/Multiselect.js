import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { sortEnum } from '../../store/actions/datasheet';
// import { colourOptions } from './docs/data';
const options = [
  { value: 'Visa', label: 'Visa' },
  { value: 'Mastercard', label: 'Mastercard' },
  { value: 'Maestro', label: 'Maestro' },
];

// function sortEnum(val) {
//   console.log(val);

// }

const Multiselect = ({ sortEnum }) => ( //
  <Select
    defaultValue={options}
    isMulti
    name="multiselect"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={sortEnum}
  />
);

// const mapStateToProps = (state) => ({
//   showActiveUsers: state.showActiveUsers,
//   data: state.data,
// });

const mapDispatchToProps = (dispatch) => ({
  sortEnum: (chosenItems) => dispatch(sortEnum(chosenItems)),
});

export default connect(null, mapDispatchToProps)(Multiselect);
