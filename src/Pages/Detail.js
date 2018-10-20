import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/DetailComponent.jsx';
import MenuApp from '../Elements/MenuApp'; 

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ruang :"",
          senin :[],
          selasa :[],
          rabu :[],
          kamis :[],
          jumat: []
        };
      }

      componentDidMount(){
        this.state.ruang = this.props.location.ruangan;
      

        fetch("http://localhost:4001/api/getJadwalRuangan/"+this.props.location.ruangan+"/senin" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            senin: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalRuangan/"+ this.props.location.ruangan+"/selasa" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            selasa: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalRuangan/"+this.props.location.ruangan+"/rabu" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            rabu: json.response
          });
        });
           
        fetch("http://localhost:4001/api/getJadwalRuangan/"+ this.props.location.ruangan+"/kamis" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            kamis: json.response
          });
        });

        
        fetch("http://localhost:4001/api/getJadwalRuangan/"+ this.props.location.ruangan+"/jumat" )
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
            kd_ruang = {this.props.location.ruangan}
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
