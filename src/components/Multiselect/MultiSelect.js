import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { sortEnum } from '../../store/actions/datasheet';

const options = [
  {
    value: 'Visa',
    label: 'Visa',
  },
  {
    value: 'Mastercard',
    label: 'Mastercard',
  },
  {
    value: 'Maestro',
    label: 'Maestro',
  },
];

const MultiSelect = ({ sort }) => ( //
  <Select
    defaultValue={options}
    isMulti
    name="multiselect"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={sort}
    styles={{
      menu: (provided) => ({ ...provided, zIndex: 9999 }),
      container: () => ({
        minWidth: 250,
        position: 'relative',
      }),
    }}
  />
);

// const mapStateToProps = (state) => ({
//   showActiveUsers: state.showActiveUsers,
//   data: state.data,
// });

const mapDispatchToProps = (dispatch) => ({
  sort: (chosenItems) => dispatch(sortEnum(chosenItems)),
});

export default connect(null, mapDispatchToProps)(MultiSelect);
