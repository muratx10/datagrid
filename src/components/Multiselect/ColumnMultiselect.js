import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import setInvisibleColumns from '../../store/actions/columnmultiseelect';

const options = [
  {
    value: 'birthDate',
    label: 'Birth Date',
  },
  {
    value: 'bankName',
    label: 'Bank',
  }
];

const Multiselect = ({ hideColumn }) => ( //
  <Select
    defaultValue={null}
    isMulti
    name="multiselect"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={hideColumn}
    styles={{
      menu: (provided) => ({ ...provided, zIndex: 9999 }),
      container: () => ({
        minWidth: 250,
        position: 'relative',
      }),
    }}
  />
);

const mapDispatchToProps = (dispatch) => ({
  hideColumn: (chosenItems) => dispatch(setInvisibleColumns(chosenItems)),
});

export default connect(null, mapDispatchToProps)(Multiselect);
