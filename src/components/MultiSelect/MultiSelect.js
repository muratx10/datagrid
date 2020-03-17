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

const MultiSelect = ({ sort, invisibleCards }) => ( //
  <Select
    placeholder="Hide enum items"
    defaultValue={invisibleCards}
    isMulti
    name="multiselect"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={sort}
    styles={{
      menu: (provided) => ({ ...provided, zIndex: 99999 }),
      container: () => ({
        minWidth: 250,
        position: 'absolute',
        right: '10%',
      }),
    }}
  />
);

const mapStateToProps = (state) => ({
  invisibleCards: state.invisibleCards,
});

const mapDispatchToProps = (dispatch) => ({
  sort: (chosenItems) => dispatch(sortEnum(chosenItems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);
