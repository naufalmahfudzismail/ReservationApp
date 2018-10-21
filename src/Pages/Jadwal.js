import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/DetailComponent.jsx';
import MenuApp from '../Elements/MenuApp'; 

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          senin :[],
          selasa :[],
          rabu :[],
          kamis :[],
          jumat: []
        };
      }

      componentDidMount(){

        //this.props.match.params = menarik nilai variabel path dari page sebelumnya
      
        fetch("http://localhost:4001/api/getJadwalHari/senin")
        .then(response => response.json())
        .then(json => {
          this.setState({
            senin: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalHari/selasa" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            selasa: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalHari/rabu" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            rabu: json.response
          });
        });
           
        fetch("http://localhost:4001/api/getJadwalhari/kamis" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            kamis: json.response
          });
        });

        
        fetch("http://localhost:4001/api/getJadwalHari/jumat" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            jumat: json.response
          });
        });
        
      }

    render() {
        //console.log(this.props.params.ruangan);
        return (
        <div className="App">
            <MenuApp></MenuApp>
            <MainComponent
            kd_ruang = "Semester Ganjil 2018 - 2019"
            senin = {this.state.senin}
            selasa = {this.state.selasa}
            rabu ={this.state.rabu}
            kamis ={this.state.kamis}
            jumat ={this.state.jumat}
            ></MainComponent>
        </div>
        );
    }
}

export default MainMenu;
