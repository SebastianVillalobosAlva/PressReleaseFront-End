import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const pressControl = (props) => (
    <Aux>
    <input type="checkbox" defaultChecked={props.checked} id={props.children} onChange={props.change}/>
    <label htmlFor={props.children}> {props.children}</label>
    </Aux>
  );

  export default pressControl;