import React, {Component} from 'react';
import DateControl from '../../components/DateControl/DateControl';
import Spinner from '../../components/UI/Spinner/Spinner';
import PressControl from '../../components/PressControl/PressControl';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-notes';
import { Table } from 'antd';

class DataEntry extends Component {
    state = {
        year: 2017,
        month: 1,
        day: 1,
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
        const fecha = {
            "year":this.state.year,
            "month":this.state.month,
            "day":this.state.day
        }

        axios.post("/notas",fecha)
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

    dateChangeHandler = (event) => {
        const date = event.target.value.split('-');
        this.setState({
            year:date[0],
            month:date[1],
            day:date[2]
        });
    }

    render(){
        const currVal = [this.state.year,this.state.month,this.state.day].join('-');
        let form = (
            <div>
                <DateControl min='2017' val={currVal} change={this.dateChangeHandler}>Fecha</DateControl>
                <br></br>
                <PressControl checked={this.state.jornada} change={this.jornadaChangeHandler}>Jornada</PressControl>
                <PressControl checked={this.state.reforma} change={this.reformaChangeHandler}>Reforma</PressControl>
                <Button clicked={this.submitClickHandler} disabled={!(this.state.jornada || this.state.reforma)}></Button>
            </div>
        );
        if (this.state.loading) form = <Spinner/>

        return (
            <div>
                <h2>Selecciona las caracteristicas de tu busqueda</h2>
                {form}
                <p>{this.state.year}</p>
                <p>{this.state.month}</p>
                <p>{this.state.day}</p>
                {this.state.notas===null?null:(
                    <Table dataSource={this.state.notas.dataSource} columns={this.state.notas.columns}/>
                )}
            </div>
        );
    };
};














export default DataEntry;