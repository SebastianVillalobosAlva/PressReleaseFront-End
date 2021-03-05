import React from 'react';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons'
 
const button = (props) => (
    <Tooltip title="Search">
    <Button variant="outline-dark" shape="circle" onClick={props.clicked} disabled={props.disabled}> {props.children} 
        <Icon component={SearchOutlined} /><Icon type="SearchOutlined" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
    </Button>
    </Tooltip>
);


export default button;