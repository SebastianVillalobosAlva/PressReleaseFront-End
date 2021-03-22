import classes from './PressControl.module.css';
import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const pressControl = (props) => (
    <div className={classes.PressControl}>
    <input type="checkbox" defaultChecked={props.checked} id={props.children} onChange={props.change}/>
    <label htmlFor={props.children}> {props.children}</label>
    </div>
  );

  export default pressControl;