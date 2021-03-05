import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const dateControl = (props) => {
    const minDate = [props.min, '01', '01'].join('-');
    const currDate = new Date();
    const maxDate = [currDate.getFullYear(),(currDate.getMonth()+1).toLocaleString('es-MX',{minimumIntegerDigits:2,useGrouping:false}),
                     currDate.getDate().toLocaleString('es-MX',{minimumIntegerDigits:2,useGrouping:false})].join('-');
    // console.log(maxDate);

    function disabledDate(current) {
        // Can not select days before today and today
        return current && !(current >= moment(minDate).startOf("day") && current < moment().endOf("day"));
      }

    return (
    // <div>
    //     <label>{props.children}</label>
    //     <input type='date' min={minDate} max={maxDate} value={props.val} onChange={props.change}/>
    // </div>
    // 
    <RangePicker
      defaultValue={[moment(minDate, dateFormat), moment(maxDate, dateFormat)]}
      format={dateFormat}  ranges={{
        Today: [moment(), moment()],
        'Fecha': [moment().startOf(minDate), moment().endOf(maxDate)],
      }}
      disabledDate={disabledDate} onChange={val => props.change(val)}
    />
    );
};

export default dateControl;