import React, {Component} from 'react';
import DateControl from '../../components/DateControl/DateControl';
import Spinner from '../../components/UI/Spinner/Spinner';
import PressControl from '../../components/PressControl/PressControl';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-notes';
import { Table } from 'antd';

import classes from './DataEntry.module.css';

class DataEntry extends Component {
    state = {
        fecha_i: "2017-01-01",
        fecha_f: "",
        loading: false,
        jornada: false,
        reforma: false,
        notas: null
    }

    jornadaChangeHandler = (event) => {
        this.setState({jornada:event.target.checked})
    }

    reformaChangeHandler = (event) => {
        this.setState({reforma:event.target.checked})
    }

    submitClickHandler = () => {
        this.setState({loading:true});
        const data = {
            'fecha_i': this.state.fecha_i,
            'fecha_f': this.state.fecha_f,
            'Jornada': this.state.jornada,
            'Reforma': this.state.reforma
        }
        axios.post("/notas",data)
            .then(response => {
                //console.log(response.data);
                const cols = [];
                const rows = [];
                response.data.columns.forEach((col,index)=>{
                    cols.push({
                        title: col,
                        dataIndex:col.toLowerCase(),
                        key:col.toLowerCase()
                    })
                });
                console.log(cols);
                response.data.data.forEach((row,index)=>{
                    let newRow = {key:index+1};
                    row.forEach((elem,index)=> {
                        //console.log(cols[index]);
                        newRow[cols[index].key] = elem;
                    });
                    rows.push(newRow);
                });
                console.log(rows);
                this.setState({
                    loading:false,
                    notas:{
                        columns:cols,
                        dataSource:rows
                    }
                })
                console.log(this.state.notas.dataSource);
            })
            .catch(err => {
                this.setState({loading:false});
                console.log(err);
            });
    }

    dateChangeHandler = (fechas) => {
        console.log(fechas);
        if(fechas !== null) {
            //console.log(`inicio: ${fechas[0].format().split("T")[0]}\n final: ${fechas[1].format().split("T")[0]}`);
            const dateI = fechas[0].format().split("T")[0];
            const dateF = fechas[1].format().split("T")[0];
            this.setState({
                fecha_i: dateI,
                fecha_f: dateF
            })
        }
    }

    render() {
        let form = (
            <div className={classes.Form}>
                <div><DateControl min='2017' change={this.dateChangeHandler}>Fecha</DateControl></div>
                <div><PressControl checked={this.state.jornada} change={this.jornadaChangeHandler}>Jornada</PressControl>
                <PressControl checked={this.state.reforma} change={this.reformaChangeHandler}>Reforma</PressControl></div>
                <div><Button clicked={this.submitClickHandler} disabled={!(this.state.jornada || this.state.reforma)}></Button></div>
            </div>
        );
        if (this.state.loading) form = <Spinner/>

        return (
            <div className={classes.DataEntry}>
                <fieldset>
                    <legend>Selecciona las caracteristicas de tu busqueda</legend>
                    {form}
                </fieldset>
                {this.state.notas===null?null:(
                    <Table dataSource={this.state.notas.dataSource} columns={this.state.notas.columns}/>
                )}
            </div>
        );
    };
};














export default DataEntry;