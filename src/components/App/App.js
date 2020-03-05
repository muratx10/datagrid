import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Buttons from '../Buttons';
import styles from './App.module.scss';


const App = (props) => {
  const {
    counter, onAdd, onSub, onRnd,
  } = props;
  return (
    <>
      <p className={styles.text}>{counter}</p>
      <Buttons
        onAdd={onAdd}
        onSub={onSub}
        onRnd={() => onRnd(5)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch({ type: 'ADD' }),
  onSub: () => dispatch({ type: 'SUB' }),
  onRnd: (n) => dispatch({ type: 'RND', payload: n }),
});

App.propTypes = {
  counter: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onSub: PropTypes.func.isRequired,
  onRnd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
