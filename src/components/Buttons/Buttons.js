import React from 'react';
import styles from './buttons.module.scss';

const Buttons = ({ onAdd, onSub, onRnd }) => {
  return (
    <>
      <button
        className={styles.button}
        type="button"
        id="add"
        onClick={onAdd}
      >
        ADD
      </button>
      <button
        className={styles.button}
        type="button"
        id="sub"
        onClick={onSub}
      >
        SUB
      </button>
      <button
        className={styles.button}
        type="button"
        id="sub"
        onClick={onRnd}
      >
        RND
      </button>
    </>
  )
};

export default Buttons;
